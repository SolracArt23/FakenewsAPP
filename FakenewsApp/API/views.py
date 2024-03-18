from django.views.decorators.csrf import csrf_exempt
import requests
from django.http import JsonResponse
# Bases de datos
from Data_base.models import Usuario
from Data_base.models import Categoria
from Data_base.models import Noticia
from Data_base.models import Credenciale
import numpy as np
# import tak=lkni de chatgpt
from API.Chatgpt import obtener_respuesta_chatgpt


#Funcion POST para la creacion de FAKE USER
@csrf_exempt
def Extract_user(request):
    if request.method == 'POST':
        cantidad = request.POST.get("cant",'')  # Obtener el parámetro 'cant' de la solicitud POST
        # Preparamos peticion
        url = f"https://randomuser.me/api/?results={cantidad}"

        # respuesta = requests.get(url,params=parametros)    
        respuesta = requests.get(url)   

        #Extraer todas las categorias disponibles

        if respuesta.status_code == 200:
            datos = respuesta.json()
            Save_user(datos)

            return JsonResponse(datos)  # Devolver los datos como una respuesta JSON
        else:
            return JsonResponse({"error": "Error en la conexión"}, status=500)  # Devolver un error con código 500
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)  # Devolver un error con código 405 si no es una solicitud POST

def Save_user(datos):
    categorias_exist = Categoria.objects.values_list("id_grupo_noticia",flat=True)
    categorias_exist=list(categorias_exist)

    for dato in datos['results']:
        # llamamos al modelo
        usuario = Usuario()
        # Extraer nombre y apellido
        usuario.nombre = dato['name']['title'] + " " + dato['name']['first']
        usuario.apellido = dato['name']['last']
        usuario.imagen = dato['picture']['medium']
        usuario.correo = dato['email']
        usuario.rol = np.random.choice(categorias_exist)

        # Guardar los cambios en la base de datos
        usuario.save()
@csrf_exempt
def Show_users(request):
    usuarios = Usuario.objects.values()
    json_response = []
    for user in list(usuarios):
        try:
            cat = Categoria.objects.get(id_grupo_noticia=user['rol'])
            user['rol']= cat.categoria if cat != None else ""
        except:pass
        json_response.append(user)

    return JsonResponse(json_response,safe=False)

#= ========================================================================================
# Creacion de funcio para  mostrar las noticias

@csrf_exempt
def Show_news(request):
    if request.method == 'POST':
        num_noticias = request.POST.get('cant_news',"") # obtener el numero de noticias solicitados
        nombre_noticia = request.POST.get("searching_column","") # ACtivar el buscador
        print(request.POST)
        if nombre_noticia != "":
            try:
                resultado = Noticia.objects.filter(titulo=nombre_noticia).values()
                print(list(resultado)[0])
                return JsonResponse(list(resultado),safe=False)
            except:
                resultado = Noticia.objects.filter(id_noticia=nombre_noticia).values()
                return JsonResponse(list(resultado),safe=False)              
            

        # Extraccion de las noticias 
        noticias = Noticia.objects.values()
        noticias = list(noticias)

        # Extraccion de usuario

        if num_noticias == "":
            num_noticias = len(noticias)

        #Extraer la cantidad de datos necesaria
        resultado =[]
        num_noticias = int(num_noticias)  # Convertir a entero

        for x in range(num_noticias):
            noticia=dict(noticias[x])
            usuario = Usuario.objects.get(id_user=noticia['id_user'])
            categoria = Categoria.objects.get(id_grupo_noticia=noticia["id_categoria"])

            # Extraer todo lo de usuario
            noticia.setdefault('nombre',usuario.nombre)
            noticia.setdefault('apellido',usuario.apellido)
            noticia.setdefault('correo',usuario.correo)
            noticia.setdefault('imagen',usuario.imagen)

            #Extraer la cateogir a necesaria
            noticia.setdefault('categoria',categoria.categoria)



            resultado.append(noticia)  # Acceder a los elementos de la lista correctamente

        return JsonResponse(resultado, safe=False)  # Devolver respuesta JSON

    else:
        return JsonResponse({'error': 'Error en conexión'}, status=400)  # Devolver un JSON de error con código de estado 400

#======================================================
@csrf_exempt # funcion para la extracion de categorias
def Extract_categorias(request):
    if request.method == "POST":
 
        categoria_busqueda= request.POST.get('categoria_buscar','')
        json_response = []

        # Buscador por categoria
        if categoria_busqueda !='':
            response = Categoria.objects.filter(id_grupo_noticia=categoria_busqueda).values()


        else:
            # Devolver todas las categorias
            response =Categoria.objects.values()

        for dato in list(response):
            json_response.append(dato)


        return JsonResponse(json_response,safe=False)

# =================================================================
# funcion de chating con chatgpt
@csrf_exempt
def Chating_with_chatgpt(request):
    
    if request.method == 'POST':
        mensaje = request.POST.get("mensaje",'')
        # Sacar categoria 
        categoria = request.POST.get("categoria",'')
        credencial = Credenciale.objects.filter(nombre='Chatgpt').values()
        # enviar a chatgpt
        respuesta = obtener_respuesta_chatgpt(mensaje,credencial[0]['key'],categoria)
        json_respuesta = {"respuesta":respuesta}

        # Retornar la respusta 
        return JsonResponse([json_respuesta],safe=False)
