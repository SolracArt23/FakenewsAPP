


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



