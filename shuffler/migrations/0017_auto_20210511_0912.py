# Generated by Django 3.1.5 on 2021-05-11 09:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shuffler', '0016_auto_20210503_1649'),
    ]

    operations = [
        migrations.RenameField(
            model_name='collection',
            old_name='image_height',
            new_name='height',
        ),
        migrations.RemoveField(
            model_name='collection',
            name='image_url',
        ),
    ]
