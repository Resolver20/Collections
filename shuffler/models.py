from django.db import models

class Collection(models.Model):
       user_id = models.IntegerField(default=0)
       image_url = models.CharField(max_length=100000)
       web_url=models.CharField(max_length=100000)
       Name = models.CharField(max_length=10000)
       image_height= models.FloatField(default=0)
       content_type=models.IntegerField(default=0)
       save_count=models.IntegerField(default=0)
class Counter(models.Model):
       current_user_id=models.IntegerField(default=0)
       other_id=models.IntegerField(default=0)

       

