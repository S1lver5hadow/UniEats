# Generated by Django 5.0.6 on 2024-06-11 07:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0006_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='deliveredBy',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='delivering_orders', to='testapp.user'),
        ),
        migrations.AddField(
            model_name='order',
            name='orderedBy',
            field=models.ForeignKey(default="testUser", on_delete=django.db.models.deletion.CASCADE, related_name='placed_orders', to='testapp.user'),
        ),
    ]
