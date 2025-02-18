# Generated by Django 5.0.6 on 2024-06-13 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0012_user_identification_user_legalname'),
    ]

    operations = [
        migrations.CreateModel(
            name='Building',
            fields=[
                ('name', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('latitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('longitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('departments', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
