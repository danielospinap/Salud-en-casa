const ipcRenderer = require('electron').ipcRenderer;

function obtenerProductos() {
    var divProductos = document.getElementById("productos");
    ipcRenderer.send('obtener-productos', divProductos);
}






ipcRenderer.on('listar-productos', function(event, productos){

    var divProductos = document.getElementById("productos");
    divProductos.innerHTML=("");
    for (var i = 0; i < productos.length; i++) {

        var divCard = document.createElement("div");
        divCard.classList.add("card");
        divCard.classList.add("my-1");
        divProductos.appendChild(divCard);

        var divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body");
        divCardBody.classList.add("pb-1");
        divCard.appendChild(divCardBody);

        var divMedia = document.createElement("div");
        divMedia.classList.add("media");
        divCardBody.appendChild(divMedia);

        var img = document.createElement("img");
        img.classList.add("align-self-center");
        img.classList.add("mr-3");
        img.setAttribute('src','http://www.adbazar.pk/frontend/images/default-image.jpg');
        img.setAttribute('width', '64');
        divMedia.appendChild(img);

        var divMediaBody = document.createElement("div");
        divMediaBody.classList.add("media-body");
        divMedia.appendChild(divMediaBody);

        var nombre = document.createElement("h5");
        nombre.classList.add("mt-0");
        nombre.innerHTML = productos[i].nombre;
        divMediaBody.appendChild(nombre);

        var volumen = document.createElement("p");
        volumen.innerHTML = productos[i].volumen;
        divMediaBody.appendChild(volumen);

        var divCategorias = document.createElement("div");
        divCategorias.classList.add("m-0");
        divMediaBody.appendChild(divCategorias);

        for (var j = 0; j < productos[i].categorias.length; j++) {
            var categoria = document.createElement("p");
            categoria.classList.add("btn");
            categoria.classList.add("btn-outline-dark");
            categoria.classList.add("btn-sm");
            categoria.classList.add("mx-1");
            categoria.innerHTML = productos[i].categorias[j]
            divCategorias.appendChild(categoria);
        }

    }
});

ipcRenderer.on('error-server', function(event){

    const responseParagraph = document.getElementById('response');

    responseParagraph.innerHTML = "Error en el servidor."
});








function sendForm(event) {
    event.preventDefault() // stop the form from submitting
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    ipcRenderer.send('login-submission', user, pass)
}

ipcRenderer.on('login-successful', function(event, file){

    window.location.replace(file);
});

ipcRenderer.on('error-datos', function(event){

    const responseParagraph = document.getElementById('response');

    responseParagraph.innerHTML = "Datos incorrectos."
});



function obtenerPedidos() {
    ipcRenderer.send('obtener-pedidos');
}


ipcRenderer.on('listar-pedidos', function(event, pedidos){

    var divPedidos = document.getElementById("pedidos");
    divPedidos.innerHTML=("");
    for (var i = 0; i < pedidos.length; i++) {
        var divCard = document.createElement("div");
        divCard.classList.add("card");
        divCard.classList.add("my-1");
        divCard.setAttribute("onclick","mostrarMapa(5);");
        // divCard.setAttribute("onclick","mostrarMapa(" + pedidos[i]._id + ");");
        divPedidos.appendChild(divCard);

        var divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body");
        divCardBody.classList.add("pb-1");
        divCard.appendChild(divCardBody);

        var nombre = document.createElement("h5");
        nombre.classList.add("mt-0");
        numPedido = i+1;
        nombre.innerHTML = 'Pedido #' + numPedido;
        divCardBody.appendChild(nombre);
    }
});


//TODO: mover
function initMap() {
    
    var divPedidos = document.getElementById("pedidos");
    divPedidos.innerHTML=("");

    divMap = document.createElement("div");
    divMap.classList.add("map");
    divPedidos.appendChild(divMap);

    var map;
    var map = new google.maps.Map(divMap, {
        zoom: 3,
        center: {lat: 0, lng: -180},
        mapTypeId: 'terrain'
    });

    var flightPlanCoordinates = [
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 153.027}
    ];
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    flightPath.setMap(map);
    
}

function mostrarMapa(id) {
    ipcRenderer.send('mostrar-mapa', id);
}