from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from users.serializers import  UserSerializer


# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home(request):
    user = request.user 
    data = {
        "message": f"welcome to jobhire, {user.username}",
        'user': UserSerializer(user).data
    }
    return Response(data,status=status.HTTP_200_OK)