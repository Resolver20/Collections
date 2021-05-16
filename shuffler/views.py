from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import  Collection,Counter
from django.contrib.auth.models import User
from django.contrib.postgres.search import TrigramSimilarity
import json



@login_required
def home(request):
    return(render(request,'shuffler/home.html'))


@login_required
def saved_collections(request):
    return(render(request, 'shuffler/saved_collections.html'))


@login_required
def card_search_page(request):
    return(render(request, "shuffler/card_search_page.html"))


def convert_to_json(query_set):
    temporary = []
    for i in query_set:
        val = {
            "id": i.id,
            "image": i.image_url,
            "name": i.Name,
            "url": i.web_url,
            "height": i.image_height,
        }
        temporary.append(val)
    return(temporary)

#hyper_linked_page
@login_required
def access_user_hyperlinks(request):
    data = json.load(request)
    if(data["type"]=="user"):
      input_value=User.objects.filter(username=data["search_value"])[0].id
      query_set=Collection.objects.filter(user_id=input_value)
    else:
      input_value=data["search_value"]
      query_set = Collection.objects.annotate(similarity=TrigramSimilarity('Name', input_value)).filter( similarity__gt=0.3).order_by('-similarity')[:100]
      query_set=sorted(query_set,key=lambda x:x.save_count,reverse=True)
    Json_data=convert_to_json(query_set)
    if(len(Json_data)>0):
        return(JsonResponse({"data": Json_data}))
    return(JsonResponse({"data": "No data"}))


@login_required
def save_hyperlink(request):
    data = json.load(request)
    row_id = int(data["id"])
    dummy = Collection.objects.get(id=row_id)
    val=list(Counter.objects.filter(current_user_id=request.user.id).filter(other_id=row_id))
    if(len(val)==0):
        new_one=Counter(current_user_id=request.user.id,other_id=row_id)
        new_one.save()
        count=dummy.save_count
        Collection.objects.filter(id=row_id).update(save_count=count+1)
    instance = Collection(image_url=dummy.image_url, web_url=dummy.web_url, Name=dummy.Name, image_height=round(float(dummy.image_height),2), user_id=request.user.id, content_type=1)
    instance.save()
    return(JsonResponse({"response": "saved"}))
#hyper_linked_page




@login_required
def Save(request):
    data = json.load(request)
    for i in data:
        val=str(data[i])
        if(len(val) == 0):
           return(JsonResponse({"response": "failed"}))
    instance = Collection(image_url=data['image_addr'], web_url=data['web_src'], Name=data['name'],  image_height=round(float(data["height"]),2), user_id=request.user.id,content_type=1)
    instance.save()
    last_id=Collection.objects.all()
    last_id=last_id.last().id
    return(JsonResponse({"response": "saved","id":last_id,"height":round(float(data["height"]),2)}))


@login_required
def Delete(request):
    data=json.load(request)
    dummy=Collection.objects.filter(id=int(data["id"]),user_id=int(request.user.id))[0].delete()
    return(JsonResponse({"response":"deleted"}))


@login_required
def Access(request):
    Json_data=[]
    query_set=Collection.objects.filter(user_id=request.user.id,content_type=1)
    Json_data=convert_to_json(query_set)
    return(JsonResponse({"data":Json_data}))


@login_required
def Rewrite(request):
    data=json.load(request)
    for i in data:
        val=str(data[i])
        if(len(val) == 0):
           return(JsonResponse({"response": "failed"}))
    
    Collection.objects.filter(id=data["id"],user_id=request.user.id).update( image_url=data['image_addr'], web_url=data['web_src'], Name=data['name'],image_height=round(float(data["height"]),2))
    return(JsonResponse({"response": "rewritten"}))


@login_required
def Save_Frame(request):
    data = json.load(request)
    for i in data:
        if(len(data[i]) == 0):
           return(JsonResponse({"response": "failed"}))
    Collection.objects.filter(id=int(data["id"]),user_id=request.user.id).update(content_type=2)
    return(JsonResponse({"response": "saved"}))


@login_required
def access_frame(request):
    query_set=Collection.objects.filter(user_id=request.user.id,content_type=2)
    Json_data=convert_to_json(query_set)
    return(JsonResponse({"data": Json_data}))
