//  mostrar usuarios
function Load_user()
{

            // Preparacion del query
            xml = new XMLHttpRequest();
        
              
            // Definir la función que manejará la respuesta de la solicitud
            xml.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
        
                  var data=JSON.parse(this.responseText);
        
                  console.log(data)
                  localStorage.setItem('jsonData', JSON.stringify(data));
                  Save_selection(data)

                    
              }
            };
          
            // Abrir la solicitud POST hacia la URL especificada
            xml.open("POST", "http://127.0.0.1:8000/api/user_extract");
          
            // Enviar los datos al servidor
            xml.send(); 
}
function Save_selection(res)
{
    var selec = document.getElementById("selector")
    res.forEach((element,index) => {
        var opcion = document.createElement('option')
        opcion.value = index
        opcion.textContent = element.nombre

        opcion.addEventListener('click',function(){
            alert(element.nombre)
        })

        selec.appendChild(opcion)

    });
    selec.addEventListener('change',function()
    {
        // Recurperar los datos del json
        var jsonstorage = JSON.parse(localStorage.jsonData);

        nombre = document.getElementById("nombre")
        nombre.textContent= jsonstorage[selec.value].nombre +"/"+jsonstorage[selec.value].rol 

        // Cambiar la imagen
        img = document.getElementById('imagen')
        img.src = jsonstorage[selec.value].imagen
        
        //Guardar categoria del presentador
        localStorage.setItem('categoria_select',jsonstorage[selec.value].rol)
    })
}


//  ======================= funcion para hablar
function sendMessage() {
    // Extraer la categoria del hablante
    categoria = localStorage.categoria_select;
    nombre = document.getElementById("nombre").textContent;


    var messageInput = document.getElementById('message-input');
    var messageText = messageInput.value.trim();
    
    // Funcion de mostrar el mensaje
    if (messageText !== '') {
      var chatMessages = document.getElementById('chat-messages');
      var messageDiv = document.createElement('div');
      messageDiv.classList.add('message', 'me');
      var userSpan = document.createElement('span');
      userSpan.classList.add('user');
      userSpan.textContent = 'Yo:';
      var textSpan = document.createElement('span');
      textSpan.classList.add('text');
      textSpan.textContent = messageText;
      messageDiv.appendChild(userSpan);
      messageDiv.appendChild(textSpan);
      chatMessages.appendChild(messageDiv);
  
      // Limpiar el campo de entrada después de enviar el mensaje
      messageInput.value = '';
  
      // Desplazar el scroll hacia abajo para mostrar el mensaje más reciente
      chatMessages.scrollTop = chatMessages.scrollHeight;
  
      // Simular respuesta del amigo después de un breve retraso
      setTimeout(function() {
        send_to(messageText,categoria);
      }, 1000);
    }
  }

  function send_to(mensaje,categoria)
  {
        // Creacion del fromdata
        data = new FormData();
        data.append('mensaje',mensaje);
        data.append('categoria',categoria);

      
        // Preparacion del query
        xml = new XMLHttpRequest();
    
          
        // Definir la función que manejará la respuesta de la solicitud
        xml.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
    
              var data=JSON.parse(this.responseText);
    
              console.log(data)
              receiveMessage(data[0]['respuesta']);
          }
        };
      
        // Abrir la solicitud POST hacia la URL especificada
        xml.open("POST", "http://127.0.0.1:8000/api/chating");
      
        // Enviar los datos al servidor
        xml.send(data);
      
      
}
  
  
  function receiveMessage(message="hola") {
    var chatMessages = document.getElementById('chat-messages');
    var messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'other');
    var userSpan = document.createElement('span');
    userSpan.classList.add('user');
    userSpan.textContent = 'Amigo:\n';
    var textSpan = document.createElement('span');
    textSpan.classList.add('text');
    textSpan.textContent = message;
    messageDiv.appendChild(userSpan);
    messageDiv.appendChild(textSpan);
    chatMessages.appendChild(messageDiv);
  
    // Desplazar el scroll hacia abajo para mostrar el mensaje más reciente
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }