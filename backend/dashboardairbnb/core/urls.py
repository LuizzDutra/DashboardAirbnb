from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from . import views

urlpatterns = [
    path('schema/', SpectacularAPIView.as_view(), name="schema"),
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('', views.RootView.as_view()),
    path('neigh_group_ratings/', views.NeighbouthoodGroupRatingsView.as_view()),
    path('neigh_group_prices/', views.NeighbourHoodPricesView.as_view()),
    path('neigh_group_listings/', views.NeighbourhoodListings.as_view()),
    path('neigh_ratings/', views.NeighbourhoodRatingsView.as_view()),
    path('neigh_ratings/<int:offset>', views.NeighbourhoodRatingsView.as_view()),
    path('biggest_hosts/', views.BiggestListingHostsView.as_view()),
    path('biggest_hosts/<int:offset>', views.BiggestListingHostsView.as_view()),
    path('top_hosts/', views.TopHostsView.as_view()),
    path('top_hosts/<int:offset>', views.TopHostsView.as_view())
]

