# Generated by Django 3.1.5 on 2021-04-21 07:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shuffler', '0009_auto_20210417_0529'),
    ]

    operations = [
        migrations.CreateModel(
            name='Content_names',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=10000)),
                ('name_id', models.IntegerField(default=0)),
            ],
        ),
    ]
