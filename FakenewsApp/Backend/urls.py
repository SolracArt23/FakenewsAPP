from django.urls import path
from . import views

urlpatterns=[
    path('',views.main,name="main"), # Seccion del lading page 
    path('news/',views.News,name='news'), #Seccion principal de la noticia
    path('noticia/<int:id>',views.Sub_news,name='subnews'),# seccion para ver noticia completa
    path('talk/',views.Tlaking,name='talk'), # aplicaicon de hablemos 
    path('FakeUser/',views.test_ad,name='Fakeuser'), # url de la  creadora de usuarios fake

]