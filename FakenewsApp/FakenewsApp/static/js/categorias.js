function Obtener_categorias()
{  

  
    // Preparacion del query
    xml = new XMLHttpRequest();
  
      
    // Definir la función que manejará la respuesta de la solicitud
    xml.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

          var data=JSON.parse(this.responseText);

          console.log(data)
          Create_slider(data);
      }
    };
  
    // Abrir la solicitud POST hacia la URL especificada
    xml.open("POST", "http://127.0.0.1:8000/api/get_category");
  
    // Enviar los datos al servidor
    xml.send();
  
  
  }


function Create_slider(response)
{
    var container = document.getElementById("carousel-container")
    var select_slider = document.getElementById("botones_carousel")
    
    // Cargar categorias 
    response.forEach((element,index) => {

        // boton para seleccionar el slider
        var slider_button = document.createElement('div')
        slider_button.innerHTML = `<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" class="active" aria-current="true" aria-label="Slide ${index}"></button>`
        // Crear slider
        var slider = document.createElement('div')
        slider.className ='carousel-inner'
        var url = element.img_url;
        var nuevaUrl = url.replace("FakenewsApp/", "/");
         slider.innerHTML = `<div class="carousel-item active">
             <img src="${nuevaUrl}" class="d-block w-100" alt="..." width="500" height="500">
             <div class="carousel-caption d-none d-md-block">
               <h5>${element.categoria}</h5>
               <p>${element.descripcion}</p>
             </div>
           </div>`

        // Guardar slider
        container.appendChild(slider)

        // Guardar selector
        select_slider.appendChild(slider_button)
        //Siguente slider
           
    });
    next_button=document.getElementsByClassName("carousel-control-next")[0];
    var intervalo = 999; // 1000 milisegundos (1 segundo) entre clics
    
    response.forEach((element, index) => {
      setTimeout(function() {
        next_button.click();
      }, intervalo * index);
    });
  


}