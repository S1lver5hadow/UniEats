from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static


from . import views
from .views import RestaurantViewSet, FoodFinder, OrderViewSet, UserViewSet, BuildingViewSet

router = DefaultRouter()
router.register(r'restaurants', RestaurantViewSet, basename='restaurant')
router.register(r'buildings', BuildingViewSet, basename='building')

food_list = FoodFinder.as_view({
    'get': 'list',
    'post': 'create'
})

food_detail = FoodFinder.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

food_filter = FoodFinder.as_view({
    'get': 'list',
})

order_list = OrderViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

order_detail = OrderViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})

user_list = UserViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

user_detail = UserViewSet.as_view({
    'get': 'retrieve',
    'delete': 'destroy',
    'patch': 'partial_update',
})



urlpatterns = [
    path('food/', food_list, name='food-list'),
    path('food/<int:pk>', food_detail, name='food-detail'),
    path('food/find/', food_filter, name='food-filter'),
    path('food/add/', views.FoodAdd.as_view(), name='food-create'),
    path('orders/', order_list, name='order-list'),
    path('orders/<int:pk>', order_detail, name='order-detail'),
    path('users/', user_list, name='user-list'),
    path('users/<str:pk>', user_detail, name='user-detail'),
    path('', include(router.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
