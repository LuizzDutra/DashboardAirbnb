from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from . import models
from django.db.models import Avg

# Create your views here.

def hello(request: HttpResponse):
    return HttpResponse("Hello, world")

def ratings(request: HttpRequest):
    query = models.Listing.objects.values('neighbourhood_group')
    results = query.annotate(average_rating = Avg('rating')).order_by('average_rating')
    return HttpResponse(results)
