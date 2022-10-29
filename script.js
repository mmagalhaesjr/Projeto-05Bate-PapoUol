
let nome

function login(){
  nome = prompt('Digite seu nome');

}
login();





//--------------------------------------------------------------------------------Array que armazena os objetos
let listaDados = [];


//------------------------------------------------------------------------------- Solicitação ao servidor


function buscarDados(){
    const pedido = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    pedido.then(pedidoChegou);
}
buscarDados()


function pedidoChegou(resposta){
    listaDados = resposta.data;
    exibir()
    console.log(listaDados)
}

console.log()
setInterval(buscarDados, 3000);



// -------------------------------------------------Mensagens vindas do servidor
function exibir(){
    let chat = document.querySelector('.chat');
    chat.innerHTML='';

    for(let i = 0; i < listaDados.length; i++){
        if(listaDados[i].type === 'message' ){
            chat.innerHTML+= `
            <div class="notificacoes msgNormal">
                <p class="hora"> (${listaDados[i].time})</p>
                <p class="msg"> <b> ${listaDados[i].from}</b> para <b> ${listaDados[i].to}</b>: ${listaDados[i].text}</p>
            </div> ` 
     
        }else if(listaDados[i].type === 'status'){
            chat.innerHTML+=  `
            <div class="notificacoes msgStatus">
                <p class="hora"> (${listaDados[i].time})</p>
                <p><b>${listaDados[i].from}</b> ${listaDados[i].text}</p>
            </div>
            `
        }else {
        
            if(nome === listaDados[i].to ){
        
                chat.innerHTML+=`
                <div class="notificacoes msgReservada">
                    <p class="hora"> (${listaDados[i].time})</p>
                    <p><b>${listaDados[i].from}</b> reservadamente para <b>${listaDados[i].to}</b>:${listaDados[i].text}</p>
                </div>
                `
            }
            
            
        }
       

    }
    
}


// function scrollar() {
//     let ultimaMsg = document.querySelector(".chat").lastChild;
//     ultimaMsg.scrollIntoView();
// }



// scrollar();







        
     

      
    