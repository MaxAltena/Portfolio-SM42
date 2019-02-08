export default function sketch(p) {
  const p5 = p.constructor;
  let outerElement = document.getElementsByClassName("Splash")[0];
  let width = outerElement.clientWidth;
  let height = outerElement.clientHeight;

  let circle = [];
  let square = [];
  let morph = [];
  let state = false;

  p.setup = function() {
    p.createCanvas(width, height, p.P2D);
    p.frameCount = 60;

    for (let angle = 0; angle < 360; angle += 9) {
      let v = p5.Vector.fromAngle(p.radians(angle - 135));
      v.mult(200);
      circle.push(v);
      morph.push(p.createVector());
    }

    for (let x = -250; x < 250; x += 50) {
      square.push(p.createVector(x, -250));
    }
    for (let y = -250; y < 250; y += 50) {
      square.push(p.createVector(250, y));
    }
    for (let x = 250; x > -250; x -= 50) {
      square.push(p.createVector(x, 250));
    }
    for (let y = 250; y > -250; y -= 50) {
      square.push(p.createVector(-250, y));
    }
  };

  p.windowResized = function() {
    width = outerElement.clientWidth;
    height = outerElement.clientHeight;
    p.resizeCanvas(width, height);
  };

  p.draw = function() {
    p.background(34, 45, 50);
    p.textSize(50);
    p.textFont("Comic Sans MS");
    p.textAlign("center");
    p.text("Welkom op Max Altena's Smart Mobile Portfolio", width / 2, 100);

    let totalDistance = 0;
    for (let i = 0; i < circle.length; i++) {
      var v1;
      if (state) {
        v1 = circle[i];
      } else {
        v1 = square[i];
      }
      var v2 = morph[i];
      v2.lerp(v1, 0.1);
      totalDistance += p5.Vector.dist(v1, v2);
    }

    if (totalDistance < 0.1) {
      state = !state;
    }

    p.translate(width / 2, height / 2);
    p.strokeWeight(4);
    p.beginShape();
    p.noFill();
    p.stroke(255);

    morph.forEach(v => {
      p.vertex(v.x, v.y);
    });
    p.endShape(p.CLOSE);
  };
}
