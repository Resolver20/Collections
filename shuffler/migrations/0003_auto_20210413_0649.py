# Generated by Django 3.1.5 on 2021-04-13 06:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shuffler', '0002_frame'),
    ]

    operations = [
        migrations.AddField(
            model_name='collection',
            name='image_height',
            field=models.CharField(default=0, max_length=10000),
        ),
        migrations.AddField(
            model_name='collection',
            name='image_width',
            field=models.CharField(default=0, max_length=10000),
        ),
    ]