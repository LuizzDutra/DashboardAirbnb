from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    #path('', include(views.router.urls)),
    path('ratings/', views.RatingsView.as_view()),
    path('biggest_hosts/', views.BiggestListingHostsView.as_view()),
    path('biggest_hosts/<int:offset>', views.BiggestListingHostsView.as_view()),
    path('top_hosts/', views.TopHostsView.as_view())
]
