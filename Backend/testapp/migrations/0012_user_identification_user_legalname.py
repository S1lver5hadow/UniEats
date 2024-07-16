# Generated by Django 5.0.6 on 2024-06-13 12:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0011_order_latitude_order_longitude'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='identification',
            field=models.ImageField(default='', upload_to='images'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='legalName',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
