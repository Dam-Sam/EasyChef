from django.shortcuts import render
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import get_object_or_404
from .serializers import SignUpSerializer, LoginSerializer, EditSerializer
from .models import ChefUser
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, UpdateAPIView
from rest_framework_simplejwt.tokens import RefreshToken


class SignUpView(generics.GenericAPIView):
    serializer_class=SignUpSerializer
    permission_classes=[AllowAny]

    def post(self, request:Request):
        data = request.data
        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    serializer_class=LoginSerializer
    permission_classes=[AllowAny]

    def post(self, request:Request):
        data = request.data
        serializer = self.serializer_class(data=data)

        print(serializer)
        if serializer.is_valid():
            user = authenticate(username=data['username'], password=data['password'])
            ##user = ChefUser.objects.get(username=data['username'])
            login(request, user=user)
            refresh=RefreshToken.for_user(user)
            data={
                'Status':'Login Successful',
                'token':str(refresh.access_token)
            }
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogOutView(APIView):
    def get(self, request:Request):
        logout(request)
        print(request.user)
        return Response(data={'Status':'Logged Out'})
    

class EditProfileView(RetrieveAPIView, UpdateAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class=EditSerializer

    def get_object(self):
        
        print(self.request.user)
        return get_object_or_404(ChefUser, username=self.request.user)


