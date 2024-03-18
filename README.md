# Cómo correr la aplicación

Para ejecutar la aplicación, primero necesitas tener un servidor MongoDB con el host de nombre `fake_news`. Puedes lograr esto utilizando Docker con el siguiente comando:

```bash
docker run --name my-mongodb \
  -e MONGO_INITDB_HOST=fake_news \
  -p 27017:27017 \
  -d \
  mongo
```

Una vez que tengas el servidor MongoDB en funcionamiento, puedes iniciar la aplicación con el siguiente comando:

```bash
python Fakenews/manage.py runserver
```

Este comando iniciará el servidor en el puerto `8000`.

Finalmente, para preparar la base de datos y cargar los datos de prueba, ejecuta los siguientes comandos:

```bash
python FakenewsApp/manage.py migrate
python FakenewsApp/manage.py loaddata FakenewsApp/fixtures/superuser.json
python FakenewsApp/manage.py loaddata FakenewsApp/fixtures/Categoria.json
python FakenewsApp/manage.py loaddata FakenewsApp/fixtures/Noticia.json
```

Con estos pasos, habrás configurado y ejecutado la aplicación correctamente.
y con ello ya tendrias todo listo


# funcionalidad 1: Documentación de la API - Chating_with_chatgpt

## Descripción
La API **Chating_with_chatgpt** permite comunicarse con un modelo de lenguaje natural llamado ChatGPT. Esto permite a los usuarios enviar mensajes y recibir respuestas generadas por el modelo.

## URL Base
```
http://example.com/api/chating_with_chatgpt/
```

## Métodos Soportados
- **POST:** Envía un mensaje al modelo ChatGPT y recibe una respuesta.

## Parámetros

### Mensaje
- **Nombre:** mensaje
- **Tipo:** String
- **Descripción:** El mensaje enviado al modelo ChatGPT.
- **Ejemplo:** "Hola, ¿cómo estás?"

### Categoría
- **Nombre:** categoria
- **Tipo:** String
- **Descripción:** La categoría de conocimiento asociada al mensaje del usuario.
- **Ejemplo:** "Deportes"

## Ejemplo de Solicitud
```json
POST /api/chating_with_chatgpt/ HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "mensaje": "Hola, ¿cómo estás?",
  "categoria": "Deportes"
}
```

## Respuesta Exitosa
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "respuesta": "¡Hola! Estoy bien, ¿y tú?"
}
```

## Respuesta de Error
En caso de error, se devolverá un mensaje de error con el código de estado correspondiente.



