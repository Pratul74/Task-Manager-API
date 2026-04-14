from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['id', 'email', 'name', 'role', 'is_staff', 'is_active']
    search_fields = ['email', 'name']
    list_filter = ['role', 'is_staff', 'is_active']
    
    list_per_page = 20
    date_hierarchy = 'created_at'

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('role', 'is_staff', 'is_active', 'is_superuser')}),
        ('Important Dates', {'fields': ('last_login', 'created_at')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'role', 'is_staff', 'is_active'),
        }),
    )

    readonly_fields = ['last_login', 'created_at']


admin.site.register(User, UserAdmin)
