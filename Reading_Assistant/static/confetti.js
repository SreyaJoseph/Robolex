const confetti = {
    start: function() {
        let duration = 3 * 1000;
        let end = Date.now() + duration;
        let interval = setInterval(() => {
            if (Date.now() > end) return clearInterval(interval);
            confettiEffect();
        }, 100);
    },
    stop: function() {
        document.getElementById("confetti").remove();
    }
};

function confettiEffect() {
    let confettiElement = document.createElement("div");
    confettiElement.id = "confetti";
    confettiElement.style.position = "fixed";
    confettiElement.style.width = "10px";
    confettiElement.style.height = "10px";
    confettiElement.style.backgroundColor = "randomColor()";
    confettiElement.style.top = `${Math.random() * window.innerHeight}px`;
    confettiElement.style.left = `${Math.random() * window.innerWidth}px`;
    document.body.appendChild(confettiElement);
}
