from django.urls import path
from .views import home,DashboardApiView,CreateJobView

urlpatterns = [
    path('', home, name='home'),
    path('dashboard-api/',DashboardApiView.as_view(),name='dashboard-api'),
    path('create/', CreateJobView.as_view(), name='create-job-api'),
]   
