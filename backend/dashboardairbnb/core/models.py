from django.db import models


class Host(models.Model):
    host_id = models.PositiveBigIntegerField(primary_key=True)
    host_name = models.TextField()
    listings_count = models.PositiveIntegerField()

    def __str__(self):
        return self.host_name + " -- " + str(self.listings_count)


class Listing(models.Model):
    name = models.CharField(max_length=255)
    host_id = models.ForeignKey(Host, on_delete=models.CASCADE)
    neighbourhood_group = models.CharField(max_length=100)
    neighbourhood = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    room_type = models.CharField(max_length=50)
    price = models.FloatField()
    minimum_nights = models.IntegerField()
    number_of_reviews = models.IntegerField()
    last_review = models.DateField(null=True, blank=True) 
    reviews_per_month = models.FloatField(null=True, blank=True) 
    availability_365 = models.IntegerField()
    number_of_reviews_ltm = models.IntegerField()
    license = models.CharField(max_length=255, null=True, blank=True) 
    rating = models.FloatField(null=True, blank=True) 
    bedrooms = models.FloatField(null=True, blank=True) 
    beds = models.IntegerField(null=True, blank=True) 
    baths = models.FloatField(max_length=50, null=True, blank=True) 

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Listing"
        verbose_name_plural = "Listings"

