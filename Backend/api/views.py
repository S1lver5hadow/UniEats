from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, generics
from rest_framework.response import Response
from testapp.models import Food, Restaurant, Order, User, Building
from .serializers import *


class FoodFinder(viewsets.ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'name', 'restaurant']

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class BuildingViewSet(viewsets.ModelViewSet):
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer

class FoodAdd(generics.CreateAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrdersSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status']

    def list(self, request):
      listqueryset = Order.objects.all()
      if request.GET.get("status","") != "":
        listqueryset = listqueryset.filter(status__exact=request.GET.get("status",""))
      if request.GET.get("orderedby","") != "":
        listqueryset = listqueryset.filter(orderedBy__exact=request.GET.get("orderedby",""))
      if request.GET.get("deliveredby","") != "":
        listqueryset = listqueryset.filter(deliveredBy__exact=request.GET.get("deliveredby",""))
      if request.GET.get("deliveredby_ne","") != "":
        listqueryset = listqueryset.exclude(deliveredBy__exact=request.GET.get("deliveredby_ne",""))
      if request.GET.get("orderedby_ne","") != "":
        listqueryset = listqueryset.exclude(orderedBy__exact=request.GET.get("orderedby_ne",""))

      listserializer = OrdersSerializer(listqueryset, many=True)
      return Response(listserializer.data)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
