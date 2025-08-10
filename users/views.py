from django.shortcuts import render
from rest_framework import status 
from rest_framework.response import Response 
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.decorators import api_view,permission_classes
from rest_framework.authtoken.models import Token
from .serializers import RegisterSerializer,LoginSerializer,UserSerializer

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