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


# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token,created = Token.objects.get_or_create(user=user)
        return Response({'token':token.key,'user':UserSerializer(user).data,'message':'Registration Successful'},status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data
        token,created = Token.objects.get_or_create(user=user)
        return Response({'token':token.key,'user':UserSerializer(user).data,'message':'Login Successful'},status=status.HTTP_200_OK)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    request.user.auth_token.delete()
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

class ApplicantProfileCreateView(generics.CreateAPIView):
    queryset = ApplicantProfile.objects.all()
    serializer_class = ApplicantProfileSerializer 
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    

    def perform_create(self, serializer):
        if ApplicantProfile.objects.filter(user=self.request.user).exists():
            raise ValidationError("Profile already exists for this user.")
        serializer.save(user=self.request.user)

class ApplicantProfileRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = ApplicantProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return ApplicantProfile.objects.get(user=self.request.user)

class EmployerProfileCreateView(generics.CreateAPIView):
    queryset = EmployerProfile.objects.all()
    serializer_class = EmployerProfileSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser,FormParser]

    def perform_create(self, serializer):
        if EmployerProfile.objects.filter(user=self.request.user).exists():
            raise ValidationError('Profile already exists for this user.')
        serializer.save(user=self.request.user)

class EmployerProfileRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = EmployerProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return EmployerProfile.objects.get(user=self.request.user)
