/*Variáveis*/
const $cep = document.getElementById('cep');
var formulario = document.getElementById('formulario');
var pesquisaCep = document.getElementById('pesquisaCep');
const apresentaCep = document.querySelector('#apresentaCep');
const mensagem = {
    "zipcode_invalido": "O CEP informado é invalido.",
    "zipcode_naoEncontrado": "O CEP informado não existe!",
    "zipcode_erro": "Ocorreu um erro ao realizar a consulta do CEP, tente novamente.",
};


/*Evita o envio do formulário*/
formulario.addEventListener('submit', procuraCep);
document.querySelector("body").addEventListener("click", fechaCep);

/*Pesquisando dados no WebService*/
function procuraCep(e) {


    if (!validaCep($cep.value)) {
        apresentaCep.innerHTML = `
            <div class="alert alert-danger">
                <a href="#" class="close" data-dismiss="alert">×</a>
                <strong>Erro!</strong> ${mensagem.zipcode_invalido}
            </div>
        `;
        $cep.focus();
        throw Error(mensagem.zipcode_invalido);
    }

    fetch(`https://viacep.com.br/ws/${$cep.value}/json/`)
        .then(response => {

            if (response.status != 200) {
                apresentaCep.innerHTML = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <img src="..." class="rounded mr-2" alt="...">
                <strong class="mr-auto">Bootstrap</strong>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${mensagem.zipcode_erro}
            </div>
      </div>
      `;

                $cep.focus();
                throw Error(response.status);
            }

            else {
                return response.json()
            }
        })

        .then(data => {
            if (data.erro) {
                apresentaCep.innerHTML = `
                <div class="alert alert-warning">
                    <a href="#" class="close" data-dismiss="alert">×</a>
                    <strong>Erro!</strong> ${mensagem.zipcode_naoEncontrado}
                </div>
                `;
                $cep.focus();
            }
            else {
                apresentaCep.innerHTML = `
                
                <div class="alert alert-success">
                    <a href="#" class="close" data-dismiss="alert">×</a>
                    <div class="message-body">
                    <ul>
                      <li><strong>Endereço: </strong>${data.logradouro}</li>
                      <li><strong>Bairro: </strong>${data.bairro}</li>
                      <li><strong>Cidade: </strong>${data.localidade}</li>
                      <li><strong>Estado: </strong>${data.uf}</li>
                    </ul>
                  </div>
                </div> 
                `;
            }
        })
        .catch(err => console.warn(err));
    e.preventDefault();
};

/*Valida a informação digitada*/
function validaCep(value) {
    return /(^[0-9]{5}-[0-9]{3}$|^[0-9]{8}$)/.test(value) ? true : false;
};

function fechaCep(event) {
    if (event.target.className == 'close') {
        apresentaCep.innerHTML = '';
        $cep.value = '';
        $cep.focus();
    }
};


