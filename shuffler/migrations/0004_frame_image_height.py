# Generated by Django 3.1.5 on 2021-04-13 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shuffler', '0003_auto_20210413_0649'),
    ]

    operations = [
        migrations.AddField(
            model_name='frame',
            name='image_height',
            field=models.CharField(default=0, max_length=10000),
        ),
    ]
