# Generated by Django 3.1.5 on 2021-04-17 05:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shuffler', '0008_auto_20210415_1320'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Binging',
        ),
        migrations.AddField(
            model_name='collection',
            name='content_type',
            field=models.IntegerField(default=0),
        ),
    ]
