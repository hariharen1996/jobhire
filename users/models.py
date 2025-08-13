from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self,username,email,password=None,role='applicant'):
        if not email:
            raise ValueError('Users must have an email address')
        
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError('Enter a valid email address')
        
        user = self.model(username=username,email=self.normalize_email(email),role=role)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,username,email,password=None):
        user = self.create_user(username,email,password=password,role='admin')
        user.is_admin = True
        user.save(using=self._db)
        return user 
    
class CustomUser(AbstractBaseUser):
    ROLE_CHOICES = [
        ('applicant', 'Applicant'),
        ('employer', 'Employer'),
    ]
    
    username = models.CharField(max_length=30,unique=True)
    email = models.EmailField(max_length=255,unique=True)
    role = models.CharField(max_length=10,choices=ROLE_CHOICES,default='applicant')
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email 

    def has_perm(self,perm,obj=None):
        return True
    
    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

class ApplicantProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    user_image = models.ImageField(upload_to='user_profile',default='user_default.png')
    user_bio = models.TextField(default='A passionate and result-driven software developer with...')
    user_education = models.CharField(max_length=200,blank=False,null=False,default='ABC Institute Of Technology')
    user_cgpa = models.DecimalField(max_digits=4,decimal_places=2,blank=False,null=False,default=7.65)
    work_experience = models.CharField(max_length=200,default='1 year of experience in software development')
    user_resume = models.FileField(upload_to='user_resume',default='default_resume.pdf')
    user_location = models.CharField(max_length=200,default='State/City')
    user_skills = models.CharField(max_length=500,blank=True,default='python,java,react')

    def check_fields(self):
        all_fields =  [self.user_image,self.user_bio,self.user_education,self.user_cgpa,self.work_experience,self.user_resume,self.user_location,self.user_skills]
        return not any(fields is None or (isinstance(fields,str) and fields.strip() == '') or (isinstance(fields,list) and len(fields) == 0) for fields in all_fields)

    def get_user_skills(self):
        return [skill.strip() for skill in self.user_skills.split(",") if skill]
    
    def __str__(self):
        return f"{self.user.username} Profile"