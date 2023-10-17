from django.contrib import admin
from mptt.admin import MPTTModelAdmin
from .models import *


class EmployeeAdmin(MPTTModelAdmin):
    list_display = ['name', 'surname', 'patronymic', 'parent', 'position']
    search_fields = ('name',)
    mptt_level_indent = 15


admin.site.register(Position)
admin.site.register(Employee, EmployeeAdmin)
