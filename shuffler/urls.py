from django.urls import path
from shuffler import views

urlpatterns = [
    path("", views.home, name="home"),
    path("Delete", views.Delete, name="delete"),
    path("access", views.Access, name="access"),
    path("Save", views.Save, name="save"),
    path("Rewrite", views.Rewrite, name="rewrite"),
    path("Frame", views.Save_Frame, name="frame"),
    path("saved_collections", views.saved_collections, name="saved_collections"),
    path("Access_frame", views.access_frame, name="access_frame"),
    path("card_search_page", views.card_search_page, name="card_search_page"),
    path("access_user_hyperlinks", views.access_user_hyperlinks, name="access_user_hyperlinks"),
    path("save_hyperlink", views.save_hyperlink, name="save_hyperlink"),
]
