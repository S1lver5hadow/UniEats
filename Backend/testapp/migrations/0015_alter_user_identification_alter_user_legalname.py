# Generated by Django 5.0.6 on 2024-06-13 23:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0014_order_extrainfo_order_room'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='identification',
            field=models.ImageField(blank=True, null=True, upload_to='images'),
        ),
        migrations.AlterField(
            model_name='user',
            name='legalName',
            field=models.TextField(blank=True, null=True),
        ),
    ]
