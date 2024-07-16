from django.db import models
from django.utils.translation import gettext_lazy as _

class Restaurant(models.Model):
    name = models.CharField(max_length=255, primary_key=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)

class Food(models.Model):
    name = models.CharField(max_length=255)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    additionalInfo = models.TextField(blank=True)

class Order(models.Model):
    totalFoodPrice = models.DecimalField(max_digits=6, decimal_places=2)
    deliveryCost = models.DecimalField(max_digits=6, decimal_places=2)

    class OrderStatus(models.TextChoices):
        ORDER_PLACED = 'OP', _('Order Placed')
        ORDER_ACCEPTED = "OA", _("Order Accepted")
        DELIVERED = "D", _("Delivered")

    status = models.CharField(max_length=2, choices = OrderStatus.choices, 
                              default=OrderStatus.ORDER_PLACED)
    items = models.TextField()
    orderedBy = models.ForeignKey("User", default="testUser", related_name = "placed_orders", 
                                  on_delete=models.CASCADE)
    deliveredBy = models.ForeignKey("User", blank=True, null=True, related_name = "delivering_orders", 
                                    on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    room = models.CharField(max_length=127, blank=True, null=True)
    extraInfo = models.CharField(max_length=255, blank=True, null=True)
    restaurants = models.TextField()

class User(models.Model):
    name = models.CharField(max_length=255, primary_key=True)

    legalName = models.TextField(null=True, blank=True)
    identification = models.ImageField(null=True, blank=True, upload_to="images")

class Building(models.Model):
    name = models.CharField(max_length=255, primary_key=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    departments = models.TextField(blank=True, null=True)
