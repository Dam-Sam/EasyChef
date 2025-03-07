"""EasyChef URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
#from drf_yasg.views import get_schema_view
#from drf_yasg import openapi
from rest_framework import permissions
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
"""
schema_view = get_schema_view(
    # API 信息
    openapi.Info(
        title='P2 API',
        default_version='V1',
        description='P2 swagger',
        terms_of_service='https://test.com',
        contact=openapi.Contact(email='axbros@sina.com',url='https://test.com'),
        license=openapi.License(name='Test License'),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,)

)
"""
urlpatterns = [
    path('admin/', admin.site.urls),
    #path('swagger/',schema_view.with_ui('swagger',cache_timeout=0),name='schema-swagger-ui'),
    #path('redoc/',schema_view.with_ui('redoc',cache_timeout=0),name='schema-redoc'),
    path('accounts/', include('accounts.urls')),
    path('recipes/', include('recipes.urls')),
    path('search/',include('search.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('swagger-ui/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='swagger-ui'),
    path('openapi/', get_schema_view(
        title="EasChef",
        description="EasyChef API",
        version="1.0.0",
        public=True,
        permission_classes=(permissions.AllowAny,)
    ), name='openapi-schema'),
]
