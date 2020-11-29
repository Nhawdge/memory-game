document.getElementById("sets").addEventListener("input", (x, ev) => {
    document.getElementById("count").innerText = x.target.value;
})

document.querySelector('[data-game="start"]').addEventListener("click", StartGame)

function StartGame() {

    var numberOfSets = parseInt(document.getElementById("sets").value);
    //var setlist = new Array(numberOfSets + 1).join("x").split("").map(x => MakeSet());

    var setlist = ["images/hammerhead/capybara.jpg", "images/hammerhead/duck.jpg", "images/hammerhead/giraffe.jpg", "images/hammerhead/lion.jpg", "images/hammerhead/seacucumber.jpg"]
    setlist = RandomizeList([...setlist, ...setlist]);

    var game = document.getElementById("game");
    game.innerText = "";
    for (card of setlist) {
        var tile = document.createElement("div");
        tile.classList.add("hidden", "card");
        tile.dataset.value = card;
        tile.innerHTML = `<img src="${card}">`;
        tile.addEventListener("click", CheckCard)
        game.appendChild(tile)
    }


}
var canMove = true;
var score = 0;

function CheckCard(event) {
    if (!canMove) {
        return;
    }
    var cardsVisible = document.querySelectorAll("#game>div:not(.hidden)")
    var card = event.target;
    console.log(cardsVisible);
    if (cardsVisible.length >= 1) {
        canMove = false;
        card.classList.toggle("hidden");

        setTimeout(() => {
            cardsVisible.forEach(x => x.classList.toggle("hidden"));
            card.classList.toggle("hidden");
            if (cardsVisible[0].dataset.value == card.dataset.value) {
                card.remove();
                cardsVisible[0].remove();
                score += 1;
            }
            canMove = true;
        }, 2000);
    } else {
        card.classList.toggle("hidden");

    }
}

function MakeSet() {
    return String.fromCharCode((Math.floor(Math.random() * 2000) % 2000) + 9000);
}

function RandomizeList(list) {
    var outList = [];
    while (list.length) {
        outList.push(list.splice(Math.floor(Math.random() * list.length), 1)[0]);
    }
    return outList;
}