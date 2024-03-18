from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.




#landing page
def main(request):
    return render(request,'index.html')

# Seccion de noticias

def News(request):
    return render(request,'noticia.html')

# sub seccion de noticia
def Sub_news(request,id):
    return render(request,'noticia_seleccionada.html',{'id':id})

# Hablemos 
def Tlaking(request):
    return render(request  ,'talk.html')

#landing page
def test_ad(request):
    return render(request,'admin/fakeUser.html')



