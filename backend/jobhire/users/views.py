from django.shortcuts import render
from rest_framework import status,generics 
from rest_framework.response import Response 
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.decorators import api_view,permission_classes
from rest_framework.authtoken.models import Token
from .serializers import RegisterSerializer,LoginSerializer,UserSerializer,ApplicantProfileSerializer,EmployerProfileSerializer
from .models import ApplicantProfile,EmployerProfile
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.exceptions import ValidationError
from rest_framework.exceptions import NotFound

# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        if user.role == 'applicant':
            profile, created = ApplicantProfile.objects.get_or_create(user=user)
            profile_data = ApplicantProfileSerializer(profile).data 
        elif user.role == 'employer':
            profile, created = EmployerProfile.objects.get_or_create(user=user)
            profile_data = EmployerProfileSerializer(profile).data
        else:
            return Response({'message': 'Invalid user role'}, status=status.HTTP_400_BAD_REQUEST)

        token,created = Token.objects.get_or_create(user=user)
        return Response({'token':token.key,'user':UserSerializer(user).data,'profile':profile_data,'message':'Registration Successful'},status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data
        token,created = Token.objects.get_or_create(user=user)

        profile_data = None 
        if user.role == 'applicant':
            try:
                profile = user.applicantprofile
                profile_data = ApplicantProfileSerializer(profile).data
            except ApplicantProfile.DoesNotExist:
                profile_data = None
        elif user.role == 'employer':
            try:
                profile = user.employerprofile
                profile_data = EmployerProfileSerializer(profile).data
            except EmployerProfile.DoesNotExist:
                profile_data = None

        return Response({'token':token.key,'user':UserSerializer(user).data,'profile':profile_data,'message':'Login Successful'},status=status.HTTP_200_OK)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    request.user.auth_token.delete()
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

class ApplicantProfileCreateView(generics.CreateAPIView):
    serializer_class = ApplicantProfileSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        if hasattr(self.request.user, 'applicantprofile'):
            raise ValidationError("Profile already exists for this user.")
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        response.data = {'profile': response.data,'message': 'Applicant profile created successfully'}
        return response


class ApplicantProfileRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = ApplicantProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_object(self):
        try:
            return self.request.user.applicantprofile
        except ApplicantProfile.DoesNotExist:
            raise NotFound("Applicant profile does not exist for this user.")

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'profile': serializer.data,'message': 'Applicant profile retrieved successfully'})
   
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        
        if 'user_image' in request.FILES:
            instance.user_image = request.FILES['user_image']
        if 'user_resume' in request.FILES:
            instance.user_resume = request.FILES['user_resume']
        
        serializer.save()
        return Response({'profile': serializer.data,'message': 'Profile updated successfully'})


class EmployerProfileCreateView(generics.CreateAPIView):
    serializer_class = EmployerProfileSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        if hasattr(self.request.user, 'employerprofile'):
            raise ValidationError("Profile already exists for this user.")
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        response.data = {'profile': response.data,'message': 'Employer profile created successfully'}
        return response

class EmployerProfileRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = EmployerProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            return self.request.user.employerprofile
        except EmployerProfile.DoesNotExist:
            raise NotFound("Employer profile does not exist for this user.")

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'profile': serializer.data,'message': 'Employer profile retrieved successfully'})

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'profile': serializer.data,'message': 'Employer profile updated successfully'})

