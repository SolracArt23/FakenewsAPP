from django.urls import path
from . import views

urlpatterns=[
    path('main',views.Extract_user,name="extract_user"), # Seccion de extraccion de datos 
    path('get_news',views.Show_news,name='get_news'), #funcion para la extraccion de las noticias
    path('get_category',views.Extract_categorias,name='get_category'),# obtener la categoria
    path('user_extract',views.Show_users,name='user_extract'),
    path('chating',views.Chating_with_chatgpt,name='chating')
]