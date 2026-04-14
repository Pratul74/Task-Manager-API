from django.urls import path
from .views import TaskListCreateView, TaskDetailView, AdminTaskListView

urlpatterns = [
    path('admin/', AdminTaskListView.as_view(), name='admin-task-list'),
    path('', TaskListCreateView.as_view(), name='task-list-create'),
    path('<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
]