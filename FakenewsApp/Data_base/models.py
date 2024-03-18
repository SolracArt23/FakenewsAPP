from django.db import models




def custom_upload_to(instance, filename):
    """Función para personalizar la ruta de almacenamiento de las imágenes."""
    return 'FakenewsApp/static/img/{1}'.format(instance.pk, filename)

# Modelo de imagenes
class Imagene (models.Model):
    id_img = models.AutoField(primary_key=True)
    img = models.ImageField(upload_to=custom_upload_to, blank=True, null=True)
    nombre= models.CharField(max_length=100)


# Tabla de categorias y subcategorias
class Categoria (models.Model):
    #Slects 
    opcion_img = [(str(img_.img),img_.nombre) for img_ in Imagene.objects.all()]
    #Columnas
    id_grupo_noticia = models.AutoField(primary_key=True)
    categoria = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=100)
    img_url = models.CharField(max_length=255,choices=opcion_img)

# Modelo de usuarios
class Usuario (models.Model):
    #Selects
    opcion_categorias= [(cat.id_grupo_noticia,cat.categoria) for cat in Categoria.objects.all()]
    #Columnas
    id_user = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    imagen = models.CharField(max_length=100)
    correo = models.CharField(max_length=100)
    rol = models.IntegerField(choices=opcion_categorias)

# Tabla de credenciales 
class Credenciale(models.Model):
    id_credencial = models.AutoField(primary_key=True)
    key = models.CharField(max_length=255)
    nombre = models.CharField(max_length=100)

# modelo de noticias 
class Noticia(models.Model):
    #Seleccionador
    opcion_usaurios = [(user.id_user,user.nombre) for user in Usuario.objects.all()]
    opcion_categorias= [(cat.id_grupo_noticia,cat.categoria) for cat in Categoria.objects.all()]
    opcion_img = [(str(img_.img),img_.nombre) for img_ in Imagene.objects.all()]
    # Columnas
    id_noticia = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=100)
    titular = models.CharField(max_length=100)
    contenido = models.TextField()
    id_user = models.IntegerField(choices=opcion_usaurios)
    num_view = models.IntegerField()
    id_categoria =models.IntegerField(choices=opcion_categorias)
    grupo_img_ref = models.CharField(max_length=200,choices=opcion_img)
    fecha_creacion = models.DateField()

