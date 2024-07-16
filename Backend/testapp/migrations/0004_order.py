# Generated by Django 5.0.6 on 2024-06-06 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0003_food_additionalinfo'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('totalFoodPrice', models.DecimalField(decimal_places=2, max_digits=6)),
                ('deliveryCost', models.DecimalField(decimal_places=2, max_digits=6)),
                ('status', models.CharField(choices=[('OP', 'Order Placed'), ('OA', 'Order Accepted'), ('D', 'Delivered')], default='OP', max_length=2)),
                ('items', models.ManyToManyField(to='testapp.food')),
            ],
        ),
    ]
