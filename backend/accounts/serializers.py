from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from rest_framework import serializers

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id', 'email', 'name']

class UserRegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True, min_length=6)
    class Meta:
        model=User
        fields=['id', 'email', 'name', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            return serializers.ValidationError("Email already Exists")
        return value

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])

        if not user:
            raise serializers.ValidationError("Invalid credentials")

        if not user.is_active:
            raise serializers.ValidationError("User is inactive")

        refresh = RefreshToken.for_user(user)

        return {
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.name,
                'role': user.role,
            },
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }
    
