# Generated by Django 5.0.6 on 2024-06-13 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0013_building'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='extraInfo',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='room',
            field=models.CharField(blank=True, max_length=127, null=True),
        ),
    ]
