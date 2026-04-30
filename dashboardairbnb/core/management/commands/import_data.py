from django.core.management.base import BaseCommand
import pandas as pd
from core.models import Host
import os


class Command(BaseCommand):
    help = "Import csv data"
    
    def handle(self, *args, **kwargs):
        filepath = "core/csv/host_df.csv"
        df = pd.read_csv(filepath)
        
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
        self.stdout.write(self.style.SUCCESS("Data imported with success"))
        
