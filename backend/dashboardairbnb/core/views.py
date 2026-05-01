from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from rest_framework import routers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from . import data



class RatingsView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request: HttpRequest):
        return Response(data.neighbourhood_group_rating_mean())


class BiggestListingHostsView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request: HttpRequest, offset: int = 0):
        result = data.descending_hosts_by_listing(offset)
        return Response(result)

class TopHostsView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request: HttpRequest, offset: int = 0):
        result = data.descending_hosts_by_score()
        return Response(result)


router = routers.DefaultRouter()

