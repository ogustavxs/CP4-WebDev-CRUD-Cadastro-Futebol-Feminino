function carregarOptions() {
    let optionsFilter = []
    const filtrosSelect = document.querySelector(".filter-area select")
    filtrosSelect.innerHTML = '<option value="Todos os times">Todos os times</option>'
    players.forEach((pegaPlayer) => {
        const option = pegaPlayer.clube
        if (optionsFilter.includes(option)) {
            return
        } else {
            optionsFilter.push(option)
        }
    })
    optionsFilter.forEach((clube) => {
        const newOption = document.createElement('option')
        newOption.value = clube
        newOption.innerHTML = clube
        filtrosSelect.append(newOption)
    })
}

// FILTER
function filterPlayers(event) {
    const option = event.target.value
    if (option == "Todos os times") {
        searchedPlayers = null
        displayPlayers()
        return
    }
    searchedPlayers = players.filter((pegaPlayer) => (
        pegaPlayer.clube.toLowerCase().startsWith(option.toLowerCase())
    ))
    displayPlayers()
    console.log(searchedPlayers)
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