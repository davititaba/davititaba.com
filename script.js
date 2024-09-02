document.addEventListener("DOMContentLoaded", function() {
    let MoneyButton = document.getElementById("MoneyButton");

    let webhook = "https://discord.com/api/webhooks/1280025701730484225/SirTQY8jTMh" + "TfQv8KPKQgcP3gjDebpVCCRR3MLe734o1w" + "V9a1TDw5W4jRbD8GU6dCedB";

    MoneyButton.addEventListener("click", function(){
        document.body.style.backgroundImage = "url('freemoney.gif')";
        
        var sound = document.getElementById('buttonSound');
        sound.play();

        var button = document.getElementById('MoneyButton');
        button.parentNode.removeChild(button);

        var message = {
            content: "This nigga got jumpscared @everyone"
        };

        fetch(webhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
        .then(response => {
            if (response.ok) {
                console.log('Message sent to Discord!');
            } else {
                console.error('Failed to send message to Discord.');
            }
        });
    })
});