const ipcRenderer = require('electron').ipcRenderer;

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
        divPedidos.appendChild(divCard);
    }
});