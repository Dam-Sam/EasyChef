from accounts.models import ChefUser
from rest_framework import serializers
from rest_framework.validators import ValidationError
from django.contrib.auth import authenticate


class SignUpSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=100, required=False)
    last_name = serializers.CharField(max_length=100, required=False)
    avatar = serializers.ImageField(required=False)
    phone_number = serializers.CharField(max_length=15, required=False)
    email = serializers.CharField(max_length=100)
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(min_length=7, write_only=True)
    password1 = serializers.CharField(min_length=7, write_only=True)

    class Meta:
        model = ChefUser
        fields = ['first_name',
                  'last_name',
                  'avatar',
                  'phone_number',
                  'email',
                  'username',
                  'password',
                  'password1'
                  ]

    def validate(self, data):
        # Check if user exists
        dupe_user = ChefUser.objects.filter(username=data['username']).exists()
        if dupe_user:
            raise ValidationError("That username has already been taken")

        dupe_user = ChefUser.objects.filter(email=data['email']).exists()
        if dupe_user:
            raise ValidationError("That email has already been taken")

        # Check if Password matches
        if data['password'] != data['password1']:
            raise ValidationError("Passwords do not match")

        return super().validate(data)

    def create(self, data):
        data['password1'] = None

        user = super().create(data)
        user.set_password(data['password'])
        user.save()

        return user


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(min_length=7, write_only=True)

    class Meta:
        model = ChefUser
        fields = ['username',
                  'password'
                  ]

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])

        if user is None:
            raise ValidationError("Invalid username or password")

        return super().validate(data)


class EditSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=100, required=False)
    last_name = serializers.CharField(max_length=100, required=False)
    avatar = serializers.ImageField(required=False)
    phone_number = serializers.CharField(max_length=15, required=False)
    email = serializers.CharField(max_length=100, required=False)
    username = serializers.CharField(max_length=100, required=False)
    password = serializers.CharField(min_length=7, write_only=True, required=False)
    password1 = serializers.CharField(min_length=7, write_only=True, required=False)

    class Meta:
        model = ChefUser
        fields = ['first_name',
                  'last_name',
                  'avatar',
                  'phone_number',
                  'email',
                  'username',
                  'password',
                  'password1'
                  ]

    def validate(self, data):
        # Check if user exists
        if 'username' in data:
            instance = getattr(self, 'instance', None)
            # check if user is same as current user
            if instance and instance.username == data['username']:
                pass
            else:
                dupe_user = ChefUser.objects.filter(username=data['username']).exists()
                if dupe_user:
                    raise ValidationError("That username has already been taken")

        # Check if Password matches
        if 'password' in data and 'password1' in data:
            if data['password'] != data['password1']:
                raise ValidationError("Passwords do not match")
        elif 'password' in data and 'password1' not in data:
            raise ValidationError("Passwords do not match")
        elif 'password' not in data and 'password1'in data:
            raise ValidationError("Passwords do not match")
        return super().validate(data)

    def create(self, data):
        if 'password' in data:
            data['password1'] = None

        user = super().create(data)
        if 'password' in data:
            user.set_password(data['password'])
        user.save()

        return user
