
import openai

# Configura tu clave de API de OpenAI

def obtener_respuesta_chatgpt(texto,api,categoria):
    try:
        openai.api_key = api
        # Realizar la solicitud a la API de ChatGPT
        respuesta = openai.Completion.create(
            engine="gpt-3.5-turbo-instruct",  # Modelo de ChatGPT a utilizar
            prompt= f"eres un preiodista que sabe de {categoria},respondeme:"+texto,  # Mensaje del usuario
            max_tokens=50  # Longitud máxima de la respuesta
        )

        # Obtener la primera respuesta generada por ChatGPT
        primera_respuesta = respuesta.choices[0].text.strip()
        return primera_respuesta
    except Exception as e:
        print("Error al obtener respuesta de ChatGPT:", e)
        return None


