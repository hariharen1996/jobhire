from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser,ApplicantProfile
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.core.validators import RegexValidator

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id','username','email','role')

class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True,min_length=3,max_length=30,validators=[UniqueValidator(queryset=CustomUser.objects.all()),RegexValidator(regex=r'^[a-zA-Z0-9_]+$',message='Username should be alphanumeric with letters, digits, underscores only.')])
    email = serializers.EmailField(required=True,validators=[UniqueValidator(queryset=CustomUser.objects.all())])
    password = serializers.CharField(write_only=True,required=True,validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True,required=True)
    
    class Meta:
        model = CustomUser
        fields = ('username','email','password','confirm_password','role')
    
    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({'password':'passwords must match'})
        return attrs
    
    def create(self,validated_data):
        validated_data.pop('confirm_password')
        user = CustomUser.objects.create_user(
            username = validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data.get('role', 'applicant')
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(username=attrs['email'],password=attrs['password'])
        if user and user.is_active:
            return user 
        raise serializers.ValidationError("Incorrect Credentials")
    
    
class ApplicantProfileSerializer(serializers.ModelSerializer):
    user_skills_list = serializers.SerializerMethodField()
    user_skills = serializers.CharField(write_only=True,required=False)

    class Meta:
        model = ApplicantProfile
        fields = ['user_image','user_bio','user_education','user_cgpa','work_experience','user_resume','user_location','user_skills_list','user_skills']
        read_only_fields = ['user']

    def get_user_skills_list(self,obj):
        return obj.get_user_skills()    