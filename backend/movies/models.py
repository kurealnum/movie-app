from django.db import models


class Movie(models.Model):
    title = models.TextField()
