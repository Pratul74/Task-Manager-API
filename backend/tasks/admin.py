from django.contrib import admin
from .models import Task


class TaskAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'user', 'status', 'created_at']
    search_fields = ['title', 'description', 'user__email']
    list_filter = ['status', 'created_at']
    ordering = ['-created_at']

    list_per_page = 20
    date_hierarchy = 'created_at'

    readonly_fields = ['created_at', 'updated_at']


admin.site.register(Task, TaskAdmin)
