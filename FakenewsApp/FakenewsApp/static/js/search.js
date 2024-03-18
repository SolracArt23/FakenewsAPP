function Searching(titular)
{ 

    // Creacion del fromdata
    data = new FormData();
    data.append('searching_column',titular);
  
    // Preparacion del query
    xml = new XMLHttpRequest();
  
      
    // Definir la función que manejará la respuesta de la solicitud
    xml.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

          var data=JSON.parse(this.responseText);

          console.log(data)
          //eliminar cartas ya creadas
          var contenedor = document.getElementById("container_card")
          contenedor.innerHTML ="";

          Create_card(data);
      }
    };
  
    // Abrir la solicitud POST hacia la URL especificada
    xml.open("POST", "http://127.0.0.1:8000/api/get_news");
  
    // Enviar los datos al servidor
    xml.send(data);
   
  }

  function pre_serching()
  {
    buscador=document.getElementById("buscador").value
    Searching(buscador)
  }