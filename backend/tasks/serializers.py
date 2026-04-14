from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.email')  # show user email

    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'description',
            'status',
            'user',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'description', 'status']

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user

        return Task.objects.create(user=user, **validated_data)