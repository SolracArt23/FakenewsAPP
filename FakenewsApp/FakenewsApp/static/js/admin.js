function Crear_usuarios()
{
  cantidad = document.getElementById("cant").value;

  // Creacion del fromdata
  data = new FormData();
  data.append('cant',cantidad);

  // Preparacion del query
  xml = new XMLHttpRequest();

    
  // Definir la función que manejará la respuesta de la solicitud
  xml.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // La solicitud se completó y el estado es OK (200)
        // Mostrar el contenido de la respuesta en un alert
        alert(this.responseText);
    }
  };

  // Abrir la solicitud POST hacia la URL especificada
  xml.open("POST", "http://127.0.0.1:8000/api/main");

  // Enviar los datos al servidor
  xml.send(data);


}