from django.db import models

# Create your models here.
class Plan(models.Model):
    title = models.CharField(max_length=500)
    description = models.TextField(null=True, blank=True)
