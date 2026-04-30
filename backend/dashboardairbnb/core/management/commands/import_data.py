from django.core.management.base import BaseCommand
import pandas as pd
from core.models import Host, Listing
import os

class Import():
    filepath = "core/csv/"

    @staticmethod
    def import_hosts():
        host_file = "host_df.csv"
        df = pd.read_csv(Import.filepath + host_file)

        instances = [
                Host(
                    host_id = row['host_id'],
                    host_name = row['host_name'],
                    calculated_host_listings_count = row['calculated_host_listings_count']
                    )
                for _, row in df.iterrows()
            ]
        Host.objects.all().delete()
        Host.objects.bulk_create(instances)
    
    @staticmethod
    def import_listings():
        listing_file = "listings.csv"
        df = pd.read_csv(Import.filepath + listing_file)
        instances = [
                Listing(
                    id=row['id'],
                    name=row['name'],
                    host_id=row['host_id'],
                    neighbourhood_group=row['neighbourhood_group'],
                    neighbourhood=row['neighbourhood'],
                    latitude=row['latitude'],
                    longitude=row['longitude'],
                    room_type=row['room_type'],
                    price=row['price'],
                    minimum_nights=row['minimum_nights'],
                    number_of_reviews=row['number_of_reviews'],
                    last_review=row['last_review'],
                    reviews_per_month=row['reviews_per_month'],
                    availability_365=row['availability_365'],
                    number_of_reviews_ltm=row['number_of_reviews_ltm'],
                    license=row['license'],
                    rating=row['rating'],
                    bedrooms=row['bedrooms'],
                    beds=row['beds'],
                    baths=row['baths']
                    )
                for _, row in df.iterrows()
                ]
        Listing.objects.all().delete()
        Listing.objects.bulk_create(instances)

class Command(BaseCommand):
    help = "Import csv data"
    
    def handle(self, *args, **kwargs):
        Import.import_hosts()
        self.stdout.write(self.style.SUCCESS("Hosts imported with success"))

        Import.import_listings() 
        self.stdout.write(self.style.SUCCESS("Listings imported with successs"))
