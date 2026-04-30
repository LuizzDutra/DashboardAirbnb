from django.db import models

# Create your models here.

class Listing(models.Model):
    pass


class Host(models.Model):
    host_id = models.PositiveBigIntegerField(primary_key=True)
    host_name = models.TextField()
    calculated_host_listings_count = models.PositiveIntegerField()
