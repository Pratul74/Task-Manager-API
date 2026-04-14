from django.urls import path
from .views import UserRegisterView, LoginView, UserListView

urlpatterns = [
    path('register/', UserRegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('users/', UserListView.as_view()),
]