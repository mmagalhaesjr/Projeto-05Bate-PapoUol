let listaDados = []; //---------Array que armazena os objetos do servidor
let  nome = prompt('Digite seu nome');
const chat = document.querySelector('.chat');
let ultimaMsg;


function logarUsuario(){
  const pedidoLogin = axios({method: 'post', url: 'https://mock-api.driven.com.br/api/v6/uol/participants', data: {name: `${nome}`}});
    pedidoLogin.then(tratarSucessoLogin);
    pedidoLogin.catch(tratarErroLogin);
}
logarUsuario();

function tratarErroLogin(erro){
    console.log(`Erro ao logar: ${erro.response.status} ${erro.response.data}`);
    nome = prompt('Usuario já logado. Digite um nome válido:');
    logarUsuario();
}

function tratarSucessoLogin(){
    console.log(`Usuário logado com sucesso!`);
    setInterval(buscarDados, 3000);
    setInterval(verificarPermanencia, 5000);
    }

    //------------------------------------------------------------------------------- desloga caso não haja inreração no chat 
function verificarPermanencia(){
    const permanencia = axios({ method: 'post', url: 'https://mock-api.driven.com.br/api/v6/uol/status', data: { name: `${nome}`}});
    permanencia.then(tratarSucesso);
    permanencia.catch(tratarErro)
}

function tratarErro(){
    console.log('Erro ao Conectar')
    window.location.reload()
}

function tratarSucesso(){
    return;
}

//------------------------------------------------------------------------------- Solicitação ao servidor
function buscarDados(){
    const pedidoDados = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    pedidoDados.then(pegarDadosMensagens);
    pedidoDados.catch(tratarErroRecebimento);
    
}
 
function pegarDadosMensagens(resposta){
    listaDados = resposta.data;
    renderizarMensagens();
}

function tratarErroRecebimento(erro){
    console.log(`Erro ao receber mensagens do servidor: ${erro.response.status} ${erro.response.data}`);
    window.location.reload();
}

// -------------------------------------------------Mensagens vindas do servidor
function renderizarMensagens(){
    chat.innerHTML='';

    for(let i = 0; i < listaDados.length; i++){
        if(listaDados[i].type === 'message' ){
            chat.innerHTML+= `
            <div class="notificacoes msgNormal">
                <p class="hora"> (${listaDados[i].time})</p>
                <p class="msg"> <b> ${listaDados[i].from}</b> para <b> ${listaDados[i].to}</b>: ${listaDados[i].text}</p>
            </div>` 
     
        }else if(listaDados[i].type === 'status'){
            chat.innerHTML+=  `
            <div class="notificacoes msgStatus">
                <p class="hora"> (${listaDados[i].time})</p>
                <p class="msg"><b>${listaDados[i].from}</b> ${listaDados[i].text}</p>
            </div>`
        }else {
        
            if(nome === listaDados[i].to ){ 
                chat.innerHTML+=`
                <div class="notificacoes msgReservada">
                    <p class="hora"> (${listaDados[i].time})</p>
                    <p class="msg"><b>${listaDados[i].from}</b> reservadamente para <b>${listaDados[i].to}</b>:${listaDados[i].text}</p>
                </div>`
            }
        } 
    }
        scrollar();
}

function scrollar() {
    ultimaMsg = document.querySelector(".chat").lastChild;
    ultimaMsg.scrollIntoView();
  }

function enviarMensagem(){
    let input = document.querySelector('#mensagemDigitada');
    let msg = input.value;
    const enviarMsg = axios({method: 'post', url: 'https://mock-api.driven.com.br/api/v6/uol/messages', data: {from: `${nome}`, to: 'Todos',
    text: `${msg}`, type: 'message'}});
    input = "";
    enviarMsg.then(buscarDados);
    enviarMsg.catch(erroEnvioMsgm);
}

function erroEnvioMsgm(erro) {
    console.log(`Erro ao enviar mensagem: ${erro.response.status} ${erro.response.data}`);
    window.location.reload();
  }