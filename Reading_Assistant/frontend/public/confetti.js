class ConfettiGenerator {
  constructor(settings) {
      this.target = document.getElementById(settings.target);
      this.context = this.target.getContext("2d");
      this.confetti = [];
      this.init();
  }

  init() {
      for (let i = 0; i < 100; i++) {
          this.confetti.push({
              x: Math.random() * this.target.width,
              y: Math.random() * this.target.height,
              radius: Math.random() * 5 + 1,
              color: `hsl(${Math.random() * 360}, 100%, 50%)`,
              speed: Math.random() * 5 + 2,
          });
      }
  }

  render() {
      this.context.clearRect(0, 0, this.target.width, this.target.height);
      this.confetti.forEach((c) => {
          this.context.beginPath();
          this.context.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
          this.context.fillStyle = c.color;
          this.context.fill();
          c.y += c.speed;
          if (c.y > this.target.height) c.y = 0;
      });
      requestAnimationFrame(this.render.bind(this));
  }

  clear() {
      this.context.clearRect(0, 0, this.target.width, this.target.height);
  }
}
window.ConfettiGenerator = ConfettiGenerator;

  