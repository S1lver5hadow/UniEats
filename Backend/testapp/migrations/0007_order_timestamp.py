# Generated by Django 5.0.6 on 2024-06-11 00:19

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0006_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
