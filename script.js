document.addEventListener("DOMContentLoaded", function () {
    let MoneyButton = document.getElementById("MoneyButton");
    let visitsText = document.getElementById("visitscounter");
    let playingText = document.getElementById("playingcounter");

    MoneyButton.addEventListener("click", function () {
        document.body.style.backgroundImage = "url('freemoney.gif')";

        var sound = document.getElementById('buttonSound');
        sound.play();

        var button = document.getElementById('MoneyButton');
        button.parentNode.removeChild(button);

        fetch("https://davititaba.com/.netlify/functions/api", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    })

    fetch("https://davititaba.com/.netlify/functions/api", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            let formattedVisits = Number(data.message).toLocaleString();

            visitsText.textContent = `xoda kide chem tamashebi ertad aris natamashebi sadgac ${formattedVisits}-jer`
        })

    setInterval(() => {
        fetch("https://davititaba.com/.netlify/functions/api", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                let formattedVisits = Number(data.message.visits).toLocaleString();
                let formattedPlayers = Number(data.message.playing).toLocaleString();

                visitsText.textContent = `xoda kide chem tamashebi ertad aris natamashebi sadgac ${formattedVisits}-jer`
                playingText.textContent = `da tamashobs amwams ${formattedPlayers}-adamiani`
            })
    }, 3000);
});