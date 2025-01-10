from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import  Collection,Counter
from django.contrib.auth.models import User
from django.contrib.postgres.search import TrigramSimilarity
import json
# import pandas as pd 
# from sklearn.neighbors import NearestNeighbors
# from sklearn import preprocessing

@login_required
def home(request):
    return(render(request,'shuffler/home.html'))


@login_required
def saved_collections(request):
    return(render(request, 'shuffler/saved_collections.html'))


@login_required
def card_search_page(request):
    return(render(request, "shuffler/card_search_page.html"))

@login_required
def recommendations(request):
    return(render(request,"shuffler/recommendations.html"))


def convert_to_json(query_set):
    temporary = []
    for i in query_set:
        val = {
            "id": i.id,
            "name": i.Name,
            "url": i.web_url,
            "height": i.height,
            "domain":i.domain
        }
        temporary.append(val)
    return(temporary)

#hyper_linked_page
@login_required
def access_user_hyperlinks(request):
    data = json.load(request)
    if(data["type"]=="user"):
      input_value=User.objects.filter(username=data["search_value"])[0].id
      query_set=Collection.objects.filter(user_id=input_value,domain=0)
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
    instance = Collection( web_url=dummy.web_url, Name=dummy.Name, height=dummy.height, user_id=request.user.id, content_type=1,domain=0)
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
    instance = Collection( web_url=data['web_src'], Name=data['name'],  height=data["height"], user_id=request.user.id,content_type=1,domain=data["domain"])
    instance.save()
    last_id=Collection.objects.all()
    last_id=last_id.last().id
    return(JsonResponse({"response": "saved","id":last_id,"height":data["height"]}))


@login_required
def Delete(request):
    data=json.load(request)
    dummy=Collection.objects.filter(id=int(data["id"]),user_id=int(request.user.id))[0].delete()
    return(JsonResponse({"response":"deleted"}))

def remove_spaces(word):
     val = ""
     for k in word:
            if(k != ' '):
                val += k
     return (val.lower())


@login_required
def get_recommendations(request):

    # current_id=request.user.id-1
    # data = Collection.objects.all()
    # df=pd.DataFrame(list(data.values()))
    # df=df[["id","Name","user_id","content_type"]]
    # df["Name"]=list(map(lambda x :remove_spaces(x) ,df["Name"]))
    # df.rename(columns={"id":"content_id","Name":"content_name","content_type":"rating"},inplace=True)
    # df["rating"]=list(map(lambda x : 5 if x==2 else 3, df["rating"].values.tolist()))
    # le=preprocessing.LabelEncoder()
    # df["encoded_content_name"]=le.fit_transform(df["content_name"])
    # print("df",df)
    # pivoted_df=df.pivot_table(
    #     columns="content_name",
    #     index="user_id",
    #     values="rating",
    #     aggfunc= lambda x : max(x)
    # ).fillna(0)
    # print("pivoted_df\n",pivoted_df)
    # # print(df_matrix)
    # model_knn=NearestNeighbors(metric="cosine",algorithm="brute")
    # # model_knn.fit(df_matrix)
    # model_knn.fit(pivoted_df)
    # query_index=current_id
    # test_df=pivoted_df.iloc[query_index,:].values.reshape(1,-1)
    # distances, indices = model_knn.kneighbors(test_df, n_neighbors=pivoted_df.shape[0])
    # # distances,indices=model_knn.kneighbors(df.iloc[query_index:].values.reshape(1,-1),n_neighbors=4)
    # print("indices",indices)
    # print("distances",distances)
    # print("current_id",current_id)
    # users=list()
    # secondary=[]
    # primary=[]
    # for i in range(0,len(distances.flatten())):
    #     if(i==0):
    #         print("recoomentations for {0}\n".format(pivoted_df.index[indices.flatten()[i]]))
    #         primary.append(pivoted_df.iloc[indices.flatten()[i],:].values.tolist())
    #     elif(distances.flatten()[i]<=0.7):
    #         print(" {0}\n".format(pivoted_df.index[indices.flatten()[i]]))
    #         secondary.append(pivoted_df.iloc[indices.flatten()[i],:].values.tolist())
    #     else:
    #         break
    # primary=primary[0]
    # # print(primary)
    # # print(secondary)
    # values=list()
    # for i in secondary:
    #     index=0
    #     while(index!=len(i)):
    #         if(primary[index]!=i[index] and primary[index]==0.0):
    #             if(pivoted_df.columns[index] not in values):
    #                 values.append(pivoted_df.columns[index])
    #         index+=1
    # recommended_id=[]
    # for i in values:
    #     if(len(recommended_id)<100):
    #         recommended_id.append(df[df["content_name"]==i].values[0][0])
    #     else:
    #         break
    # query_set=Collection.objects.filter(id__in=recommended_id)
    # Json_data=convert_to_json(query_set)
    # for i in Json_data:
    #     print(i)
    # if(len(Json_data)>0):
    #     return(JsonResponse({"data": Json_data}))
    print("NO data");
    return(JsonResponse({"data": "No data"}))

@login_required
def Access(request):
    Json_data=[]
    query_set=Collection.objects.filter(user_id=request.user.id,content_type=1)
    # print(query_set)
    Json_data=convert_to_json(query_set)
    return(JsonResponse({"data":Json_data}))


@login_required
def Rewrite(request):
    data=json.load(request)
    for i in data:
        val=str(data[i])
        if(len(val) == 0):
           return(JsonResponse({"response": "failed"}))
    # print(data)
    Collection.objects.filter(id=data["id"],user_id=request.user.id).update(  web_url=data['web_src'], Name=data['name'],height=data["height"],domain=data["domain"])
    return(JsonResponse({"response": "rewritten"}))


@login_required
def domainChange(request):
    data = json.load(request)
    # print(data)
    for i in data:
        val = str(data[i])
        if(len(val) == 0):
           return(JsonResponse({"response": "failed"}))
    # print(data)
    Collection.objects.filter(id=data["id"], user_id=request.user.id).update(domain=data["domain"])
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
    # print(Json_data)
    return(JsonResponse({"data": Json_data}))
