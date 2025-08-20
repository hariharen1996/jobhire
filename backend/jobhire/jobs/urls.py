from django.urls import path
from .views import home,DashboardApiView,CreateJobView,UpdateJobView,DeleteJobView

urlpatterns = [
    path('', home, name='home'),
    path('dashboard-api/',DashboardApiView.as_view(),name='dashboard-api'),
    path('create/',CreateJobView.as_view(),name='create-job-api'),
    path('update/<int:id>/',UpdateJobView.as_view(),name='update-job-api'),
    path('delete/<int:id>/',DeleteJobView.as_view(),name='delete-job-api'),
]   
