/*Realiza pesquisa a partir da rua*/
const $ruaPesq = document.getElementsByClassName('ruapesq');
const $cidadePesq = document.getElementById('cidadepesq');
const $ufPesq = document.getElementById('ufpesq');
const form = document.querySelector('#form');
const msg = { "zipcode_notfound": "Não foi possível localizar o CEP." };
const apresentaCepRua = document.getElementById('apresentaCepRua');

form.addEventListener('submit', procuraCepRua);

function procuraCepRua(e) {
    e.preventDefault();

    fetch(`https://viacep.com.br/ws/${$ufPesq}/${$cidadePesq}/${$ruaPesq}/json`)
        .then(response => {

            if (response.status != 200) {
                apresentaCepRua.innerHTML = `
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <img src="..." class="rounded mr-2" alt="...">
            <strong class="mr-auto"></strong>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${msg.zipcode_erro}
        </div>
    </div>
    `;
    $cidadePesq.focus();
                throw Error(response.status);
            }

            else {
                return response.json()
            }
        })


        .then(data => {
            if (data.erro) {
                apresentaCepRua.innerHTML = `
                <div class="alert alert-warning">
                    <a href="#" class="close" data-dismiss="alert">×</a>
                    <strong>Erro!</strong> ${msg.zipcode_notfound}
                </div>
                `;
                $cidadePesq.focus();
            }
            
            else {
                apresentaCepRua.innerHTML = `
                <div class="alert alert-success">
                    <a href="#" class="close" data-dismiss="alert">×</a>
                    <div class="message-body">
                    <ul>
                      <li><strong>Cep: </strong>${data.cep}</li>
                    </ul>
                  </div>
                </div> 
                `;
                $cidadePesq.focus();
            }
        })
        .catch(err => console.warn(err));


};

