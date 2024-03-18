function Obtener_noticias(cantidad)
{  
    // Creacion del fromdata
    data = new FormData();
    data.append('cant_news',cantidad);
  
    // Preparacion del query
    xml = new XMLHttpRequest();
  
      
    // Definir la función que manejará la respuesta de la solicitud
    xml.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

          var data=JSON.parse(this.responseText);

          console.log(data)
          Create_card(data);
      }
    };
  
    // Abrir la solicitud POST hacia la URL especificada
    xml.open("POST", "http://127.0.0.1:8000/api/get_news");
  
    // Enviar los datos al servidor
    xml.send(data);
  
  
  }

function Create_card(res)
{
  var contenedor = document.getElementById("container_card")

      res.forEach(element => {
        var card = document.createElement('div');
        var url = element.grupo_img_ref;
        var nuevaUrl = url.replace("FakenewsApp/", "/");
        card.innerHTML += `
          <div class="blog-card alt">
            <div class="meta">
            
              <div class="photo" style="background-image: url(../${nuevaUrl})"></div> 
              <ul class="details">
                <img src= "${element.imagen}" style="border-radius:50%;width:50px;height:50px"/>
                <li class="author"><a href="#">${element.nombre} ${element.apellido}</a></li>
                <li class="author"><a href="#">${element.categoria}</a></li>

                <li class="date">${element.fecha_creacion}</li>
              </ul>
            </div>
            <div class="description">
              <h1>${element.titulo}</h1>
              <h2>${element.titular}</h2>
              <p>${element.contenido}</p>
              <p class="read-more">
                <a href="http://127.0.0.1:8000/noticia/${element.id_noticia}">Leer mas</a>
              </p>
            </div>
          </div>`;
        contenedor.appendChild(card);
      });     
}

function Mostrar_noticia_pre()
{
      //Extraer la noticia seleccionada
      var h1=document.getElementById("identificador")
      h1.hidden = false
      var cantidad = parseInt(h1.textContent)
      h1.hidden = true

     // Creacion del fromdata
     data = new FormData();
     data.append('searching_column',cantidad);
   
     // Preparacion del query
     xml = new XMLHttpRequest();
   
       
     // Definir la función que manejará la respuesta de la solicitud
     xml.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
 
           var data=JSON.parse(this.responseText);
 
           console.log(data)
           Mostrar_noticia(data)
       }
     };
   
     // Abrir la solicitud POST hacia la URL especificada
     xml.open("POST", "http://127.0.0.1:8000/api/get_news");
   
     // Enviar los datos al servidor
     xml.send(data);

}

function Mostrar_noticia(res)
{
  // Cambiar titulo
  var titulo = document.getElementById('titulo')
  titulo.textContent= res[0].titulo

  // subtitulo
  var subtitulo =document.getElementById('subtitulo')
  subtitulo.textContent = res[0].titular

  // Contenido
  var content = document.getElementById("contenido")
  content.textContent = res[0].contenido;
}