//FAVORITAR 
function favoritarPlayer(index) {
    players[index].favorita = !players[index].favorita
    salvarPlayers()
    displayPlayers()
}