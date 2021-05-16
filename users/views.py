from django.shortcuts import render,redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
def register(request):
    form = UserCreationForm(request.POST)
    if(request.method=="POST"):
          if(form.is_valid()):
              messages.success( request, f'Successfully Registered {form.cleaned_data.get("username")}!')
              form.save()
              return(redirect('login'))
    return(render(request,'users/register_page.html',{"form":form}))
