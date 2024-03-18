from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Usuario)
class UsuarioRegister(admin.ModelAdmin):
    list_display=('id_user','nombre','correo','rol')

@admin.register(Imagene)
class ImageneRegister(admin.ModelAdmin):
    list_display=('id_img','img')

@admin.register(Categoria)
class CategoriaRegister(admin.ModelAdmin):
    list_display=("id_grupo_noticia",'categoria')




@admin.register(Credenciale)
class CredencialREgister(admin.ModelAdmin):
    list_display=('id_credencial','key')

@admin.register(Noticia)
class NoticiaAdmin(admin.ModelAdmin):
    list_display=('id_noticia','titular','contenido')
