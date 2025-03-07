from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager


class ChefUserManager(BaseUserManager):
    def create_user(self, email, password, password1, **kargs):
        password1 = ''
        email = self.normalize_email(email)
        user = self.model(email=email, **kargs)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password, **kargs):
        kargs.setdefault("is_staff", True)
        kargs.setdefault("is_superuser", True)

        if kargs.get("is_staff") is not True:
            raise ValueError("is_staff needs to be True")

        if kargs.get("is_superuser") is not True:
            raise ValueError("is_superuser needs to be True")

        return self.create_user(email=email, password=password, password1='', **kargs)


class ChefUser(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    avatar = models.ImageField(default='default.png', upload_to='user_avatars/', null=True, blank=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=13, blank=True)
    email = models.EmailField(max_length=100, unique=True)
    password1 = models.CharField(max_length=100, blank=True, null=True)


    objects = ChefUserManager()
    # USERNAME_FIELD = "email"
    # REQUIRED_FIELDS = ["username"]
