from django.contrib import admin
from django.urls import path, include

from hierarchy.views import EmployeeViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'employee', EmployeeViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/v1/', include(router.urls))
    # path("api/v1/drf-auth/", include('rest_framework.urls')),
    # path("api/v1/employee_list/", EmployeeViewSet.as_view({'get': 'list'})),
    # path("api/v1/employee_list/<int:pk>/", EmployeeViewSet.as_view({'put': 'update'})),
    # path("api/v1/employee_delete/<int:pk>/", EmployeeViewSet.as_view({'delete': 'delete'})),
]
