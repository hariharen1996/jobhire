from rest_framework import serializers
from users.models import EmployerProfile
from .models import Jobs

class JobSerializer(serializers.ModelSerializer):
    posted_time = serializers.DateTimeField(format='%Y-%m-%d %H-%M-%S', read_only=True)
    application_deadline = serializers.DateField(format='%Y-%m-%d')
    company_name = serializers.CharField(source='employer.company_name', read_only=True)
    company_logo = serializers.ImageField(source='employer.company_logo', read_only=True)

    class Meta:
        model = Jobs
        fields = ['id', 'title', 'description', 'location','min_salary', 'max_salary', 'salary_range','work_mode', 'role', 'experience', 'time_range','created_at', 'posted_time', 'application_deadline','number_of_openings', 'job_skills', 'status','company_name', 'company_logo']
        read_only_fields = ['min_salary', 'max_salary']
