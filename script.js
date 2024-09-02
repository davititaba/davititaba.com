document.addEventListener("DOMContentLoaded", function() {
    let MoneyButton = document.getElementById("MoneyButton");

    MoneyButton.addEventListener("click", function(){
        document.body.style.backgroundImage = "url('freemoney.gif')";
        
        var sound = document.getElementById('buttonSound');
        sound.play();

        var button = document.getElementById('MoneyButton');
        button.parentNode.removeChild(button);
    })
});