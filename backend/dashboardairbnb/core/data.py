from . import models
from django.db.models import Avg, Count, F, FloatField, ExpressionWrapper
import pandas as pd


def neighbourhood_group_rating_mean():
    query = models.Listing.objects.values('neighbourhood_group')
    results = query.annotate(average_rating = Avg('rating')).order_by('average_rating')
    return results


def descending_hosts_by_listing(offset=0):
    LIMIT = 5
    start = offset*LIMIT
    query = models.Host.objects.order_by("listings_count").reverse()[start:start+LIMIT]
    results = query.values("host_id", "host_name", "listings_count")
    return results



def descending_hosts_by_score():
    LIMIT = 5
    query = models.Listing.objects.select_related('host_id')
    query = query.annotate(
            host_name=F('host_id__host_name'), 
            listings_count=F('host_id__listings_count')
            ).values('host_id', 'host_name', 'listings_count')
    results = query.annotate(average_rating = Avg('rating'))
    #Some hosts have a huge amount of listings but with no rating
    results = results.annotate(rated_count = Count('rating'))

    C = 30

    m = results.aggregate(avg_rating=Avg('average_rating'))['avg_rating']

    results = results.annotate(
            # Bayesian Score Calculation
            # (R * v + C * m) / (v + C)
            score=ExpressionWrapper(
                (F('average_rating') * F('rated_count') + (C * m)) / 
                (F('rated_count') + C),
                output_field=FloatField()
            )
        )
    results = results.order_by('score').reverse()
    results = results[0:LIMIT]
    return results

