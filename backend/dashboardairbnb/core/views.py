from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from rest_framework import routers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from . import data

class RootView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        return Response("Hello world")


class NeighbouthoodGroupRatingsView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request: HttpRequest):
        return Response(data.neighbourhood_group_rating_mean())

class NeighbourhoodListings(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request: HttpRequest):
        return Response(data.neighbourhood_group_by_listing())

class NeighbourhoodRatingsView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, offset: int = 0):
        return Response(data.neighbourhood_rating_mean(offset))

class NeighbourHoodPricesView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        return Response(data.neighbourhood_group_price_avg())

class BiggestListingHostsView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request: HttpRequest, offset: int = 0):
        result = data.descending_hosts_by_listing(offset)
        return Response(result)

class TopHostsView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request: HttpRequest, offset: int = 0):
        result = data.descending_hosts_by_score(offset)
        return Response(result)

class HostCount(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request: HttpRequest):
        result = data.host_count()
        return Response(result)


router = routers.DefaultRouter()

