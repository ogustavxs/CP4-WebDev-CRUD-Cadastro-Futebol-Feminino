let players = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://static.corinthians.com.br/uploads/175094512556786bbe51b83ae53c89e68efb23425a.png",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://static.corinthians.com.br/uploads/1750945261a0833c8a1817526ac555f8d67727caf6.png",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://static.corinthians.com.br/uploads/1750946630c7b03782920d35145eb4c97556d194a3.png",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://static.corinthians.com.br/uploads/17509469717a68443f5c80d181c42967cd71612af1.png",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://static.corinthians.com.br/uploads/1750946369cdcb2f5c7b071143529ef7f2705dfbc4.png",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
];

let searchedPlayers = null


// Inicialização
window.onload = function() {
    carregarPlayers();
    displayPlayers();
    carregarOptions();
    

    document.querySelector(".nav-list").addEventListener('click', handleClick)
    document.getElementById('playerForm').addEventListener('submit', addPlayer);
    document.querySelector('#playerList').addEventListener('click', handleClick);
    document.getElementById('playerFind').addEventListener("submit", searchPlayer)
    document.querySelector(".filter-area select").addEventListener("change", filterPlayers);
    document.querySelector(".crescente").addEventListener("click", ()=>{
        players.sort((a, b) => a.nome.localeCompare(b.nome));
        displayPlayers()
    })
    document.querySelector(".decrescente").addEventListener("click", ()=>{
        players.sort((a, b) => b.nome.localeCompare(a.nome));
        displayPlayers()
    })
};

function checarVazio(str, len) {
    if (str === "" || str.length < len) {
        return true
    } else {
        return false
    }
}

function handleClick(infosDoEvento){
    const action = infosDoEvento.target.dataset.action;
    const index = infosDoEvento.target.dataset.index;

    
    if(action === "edit"){
        editarPlayer(index);
    }
    else if (action == "delete"){
        apagarPlayer(index);
    } else if (action == "star") {
        favoritarPlayer(index)
    } else if (action == "cadastrar") {
        showCadastrar()
    }
}

// Função para exibir os players
function displayPlayers() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';
    const arr = searchedPlayers !== null ? searchedPlayers : players;
    arr.forEach((pegaPlayer) => {
            const realIndex = players.findIndex(p => p.nome === pegaPlayer.nome && p.clube === pegaPlayer.clube);
            const playerElement = document.createElement('div');
            playerElement.classList.add('card-player');
  
            playerElement.innerHTML = `
                <img src="${pegaPlayer.foto}" alt="">
                <div class="name">
                    <h2>${pegaPlayer.nome}</h2>
                    <h3>${pegaPlayer.posicao}<h3>
                    <p>${pegaPlayer.clube}</p>
                </div>
                <div class="infos">
                    <div class="infos-text">
                        <h4>${pegaPlayer.gols}</h4>
                        <p>Gols</p>
                    </div>
                    <div class="infos-text">
                        <h4>${pegaPlayer.assistencias}</h4>
                        <p>Assist</p>
                    </div>
                    <div class="infos-text">
                        <h4>${pegaPlayer.jogos}</h4>
                        <p>Jogos</p>
                    </div>
                </div>
                <div class="actionButtons">
                    <i data-action="star" data-index="${realIndex}" class="fa-solid fa-star" 
                    style="color: ${pegaPlayer.favorita ? 'yellow' : 'white'}; font-size: 24px; cursor: pointer;">
                    </i>

                    <i data-action="edit" data-index="${realIndex}" class="fa-solid fa-edit" 
                    style="color:white; font-size: 24px; cursor: pointer;">
                    </i>

                    <i data-action="delete" data-index="${realIndex}" class="fa-solid fa-remove" 
                    style="color:white; font-size: 24px; cursor: pointer;">
                    </i>
                </div>
`;
            playerList.append(playerElement);
        });
}

// SHOW CADASTRAR
function showCadastrar() {
    console.log("botao")
    const form = document.querySelector("#playerForm")
    const displayValue = window.getComputedStyle(form, null).display
    console.log(displayValue)
    if (displayValue === "none") {
        form.style.display = "grid"
    } else {
        form.style.display = "none"
    }
}

// SEARCH
function searchPlayer(event) {
    event.preventDefault()
    const filtrosSelect = document.querySelector(".filter-area select")
    if (filtrosSelect.value !== "Todos os times") {
        alert("Só é possível pesquisar quando o filtro está em 'Todos os times'.");
        return;
    }
    const searchArea = document.querySelector(".search-area")
    const playerInfo = document.querySelector("#playerFindArea").value.toLowerCase()
    if (checarVazio(playerInfo, 0)) {
        return
    } else if (searchArea.childElementCount > 2) {
        alert("Você ja tem uma pesquisa em andamento")
        return
    }
    const deleteButton = document.createElement("a")
    filtrosSelect.style.display = "none"
    deleteButton.innerHTML = '<i class="fa-solid fa-remove"></i>'
    deleteButton.addEventListener("click", function() {
        this.remove()
        filtrosSelect.style.display = "inline-block"
        searchedPlayers = null
        displayPlayers()
    })
    searchedPlayers = players.filter((pegaPlayer) => (
        pegaPlayer.nome.toLowerCase().startsWith(playerInfo) || pegaPlayer.posicao.toLowerCase().startsWith(playerInfo)
    ))
    searchArea.append(deleteButton)
    displayPlayers()
    
    document.querySelector('#playerFind').reset();
}

// CREATE
function addPlayer(event) {
    event.preventDefault();
    
    const playerNome = document.querySelector("#playerNome").value;
    const playerClube = document.querySelector("#playerClube").value;
    const playerPosicao = document.querySelector("#playerPosicao").value;
    const playerImage = document.querySelector("#playerImage").value;
    const playerGols = document.querySelector("#playerGols").value;
    const playerAssistencias = document.querySelector("#playerAssistencias").value;
    const playerJogos = document.querySelector("#playerJogos").value;

    if (playerNome === "") {
        alert("Digite o nome")
        return
    } else if (playerClube === "") {
        alert("Digite o clube")
        return
    } else if (playerImage === "") {
        alert("Coloque um URL de uma imagem")
        return
    }

    const player = { 
        nome: playerNome, 
        posicao: playerPosicao, 
        clube: playerClube, 
        foto: playerImage,
        gols: playerGols ? playerGols : 0,
        assistencias: playerAssistencias ? playerAssistencias : 0,
        jogos: playerJogos ? playerJogos : 0,
        favorita: false
    };
    
    players.unshift(player);
    salvarPlayers();
    alert("Jogadora adicionada com sucesso!")
    carregarOptions()
    document.querySelector('#playerForm').reset();
    
    displayPlayers();
}

//UPDATE
function editarPlayer(index){
    let posicaoList = ["centroavante", "ponta direta", "ponta esquerda", "meio-campo", "volante", "zagueira", "lateral esquerdo", "lateral direito", "goleiro", "outros"]
    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    const novoNome = prompt('Edite o nome do player:',players[index].nome);
    if (novoNome !== null && !checarVazio(novoNome, 2)) {players[index].nome = novoNome};

    const novaPosicao = prompt('Edite a posicao do player: ', players[index].posicao);
    if (novaPosicao !== null) {
        const posicaoLower = novaPosicao.toLowerCase();
        if (posicaoList.includes(posicaoLower)) {
            players[index].posicao = capitalizeFirstLetter(posicaoLower);
        }
    }


    const novoClube = prompt('Edite o clube do player:',players[index].clube);
    if (novoClube !== null && !checarVazio(novoClube, 2)) {players[index].clube = novoClube};
    const novaFoto = prompt('Edite a imagem do player (insira o link da imagem):',players[index].foto);
    if (novaFoto !== null && !checarVazio(novoClube, 2)) {players[index].foto = novaFoto};
    
    const novoGol = prompt('Edite os gols do player:',players[index].gols);
    if (novoGol !== null) {
        const valor = parseInt(novoGol);
        players[index].gols = isNaN(valor) ? 0 : valor;
    }
    
    const novaAssistencia = prompt('Edite as assistencias do player:',players[index].assistencias);
    if (novaAssistencia !== null) {
        const valor = parseInt(novaAssistencia)
        players[index].assistencias = isNaN(valor) ? 0 : valor;
    };
    
    const novoJogo = prompt('Edite os jogos do playes:',players[index].jogos);
    if (novoJogo !== null) {
        const valor = parseInt(novoJogo)
        players[index].jogos = isNaN(valor) ? 0 : valor
    };


    
    salvarPlayers();
    alert("Jogadora editada com sucesso")
    carregarOptions()

    displayPlayers();
}
//DELETE
function apagarPlayer(index){
    const confirmar = confirm("Você deseja realmente excluir este player?")

    if(confirmar){
        players.splice(index,1);
        salvarPlayers()  
        alert("Jogadora removida com sucesso")
        carregarOptions()
    }

    displayPlayers();
}

function salvarPlayers(){
    localStorage.setItem("players", JSON.stringify(players));
}

function carregarPlayers(){
    const playersGuardados = localStorage.getItem("players");
    if(playersGuardados){
        players = JSON.parse(playersGuardados)
    }
}