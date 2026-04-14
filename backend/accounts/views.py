from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAdminUser, AllowAny
from .serializers import UserListSerializer, UserRegisterSerializer, LoginSerializer
from .models import User

class UserListView(APIView):
    permission_classes=[IsAdminUser]
    def get(self, request):
        users=User.objects.all()
        serializer=UserListSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserRegisterView(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        serializer=UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.save()
            return Response(UserListSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

