from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

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