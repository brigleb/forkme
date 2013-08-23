var particleNum = 30,
  particleWidth = 8,
  canvas = document.getElementById('title-canvas'),
  context = canvas.getContext('2d'),
  title = 'JENNY LOUTHAN',
  fontName = 'Days One',
  //lower density = more centers; counterintuitive I know
  density = 10,
  centers = [],
  frontColors = ['#000000', '#000000', '#444444', '#444444', '#444444'],
  backColors = ['#CF2128', '#15827A'];
mouse = {
  x: 0,
  y: 0
},
isDrawing = false;

(function() {

  var Particle = function(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = backColors[Math.floor(Math.random() * backColors.length)];

    this.update = function(vx, vy) {
      vx = vx || 0,
      vy = vy || 0;

      this.x += this.vx + vx;
      this.y += this.vy + vy;
    };
  };

  var ParticleSystem = function(container, center, count) {
    var i = 0,

      count = count;

    this.particles = [];

    this.center = {
      x: center.x,
      y: center.y
    };

    // Initialization
    for (; i < count; ++i) {
      var x = this.center.x,
        y = this.center.y,
        vx = Math.random() * 3 - 1.5,
        vy = Math.random() * 3 - 1.5;

      this.particles.push(new Particle(x, y, vx, vy));
    }

    this.update = function() {
      for (i = 0; i < count; ++i) {

        // We don't want to process particles that
        // we can't see anymore
        if (this.particles[i].x > 0 &&
          this.particles[i].x < container.width &&
          this.particles[i].y > 0 &&
          this.particles[i].y < container.height) {

          this.particles[i].update();
          context.fillStyle = this.particles[i].color;
          context.globalAlpha = 0.5;
          context.fillRect(this.particles[i].x, this.particles[i].y, particleWidth, particleWidth);
          context.globalAlpha = 1.0;
        } else {
          this.particles[i].x = mouse.x;
          this.particles[i].y = mouse.y;
        }
      }
    };
  };


  // shim layer with setTimeout fallback by Paul Irish
  // we want to use requestAnimationFrame if we can
  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
  })();

  // Call the init() function on load
  init();

  function init() {
    p = null;
    canvas.addEventListener('mousemove', MouseMove, false);
    canvas.addEventListener("mouseout", MouseOut, false);

    p = new ParticleSystem(canvas, {
      x: canvas.width / 4,
      y: canvas.height / 2
    }, particleNum);

    google.load('webfont', '1');
    google.setOnLoadCallback(function() {
      WebFont.load({
        google: {
          families: [fontName]
        },
        active: function() {

          //commented out in favor of requestAnimationFrame

          // setTimeout(function() {
          drawText(true);
          getCenters();
          render();

          // }, 100);
        },
        inactive: function() {

          // google font not loaded, we will use the default font Arial
          drawText(false);
          getCenters();
          render();

        }
      });
    });

    function render() {
      var dx, dy,
        squareDist,
        scale = 1,
        length = centers.length;

      context.clearRect(0, 0, canvas.width, canvas.height);

      p.update();

      for (var i = 0; i < length; ++i) {
        var point = centers[i];
        //locate distance from mouse
        dx = point.x - mouse.x;
        dy = point.y - mouse.y;
        squareDist = Math.sqrt(dx * dx + dy * dy);
        scale = (isDrawing) ? Math.max(2.5 * Math.min(10 - (squareDist / 10), 10), 8) : 8;
        if (scale == 8) {
          context.globalAlpha = 1.0;
          context.fillStyle = point.frontColor;
        } else {
          context.globalAlpha = 0.5
          context.fillStyle = point.backColor;
        }
        context.beginPath();
        context.lineTo(point.x + scale / 2, point.y);
        context.lineTo(point.x + scale / 2, point.y - scale / 2);
        context.lineTo(point.x - scale / 2, point.y - scale / 2);
        context.lineTo(point.x - scale / 2, point.y + scale / 2);
        context.lineTo(point.x + scale / 2, point.y + scale / 2);
        context.closePath();
        context.fill();
      }


      // Call render() again, recursively
      requestAnimFrame(render);
    }
  }
})();

function drawText(fontLoaded) {
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = fontLoaded ? "bold 100px " + fontName : "120px 'Arial'";
  context.fillText(title, canvas.width / 2, canvas.height / 2);
};

function getCenters() {
  //reset the array for recalculations
  centers = [];
  var imageData, data, pixel;
  imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  //put the pixel color and alpha data in data
  data = imageData.data;
  //iterate over the pixel data
  for (var j = 0; j < canvas.width; j += density) {
    for (var i = 0; i < canvas.height; i += density) {
      //get color for the pixel at spot i,j
      pixel = data[((j + (i * canvas.width)) * 4) - 1];
      //check if it's in our text area
      if (pixel == 255) {
        //add the pixel info as object to our array of centers for cool visual rendering
        centers.push({
          frontColor: frontColors[Math.floor(Math.random() * frontColors.length)],
          backColor: backColors[Math.floor(Math.random() * backColors.length)],
          x: j,
          y: i
        });
      }
    }
  }


}

function MouseMove(e) {

  mouse.x = e.offsetX || (e.layerX - canvas.offsetLeft);
  mouse.y = e.offsetY || (e.layerY - canvas.offsetTop);
  if (!isDrawing) {

    isDrawing = true;
    drawTimeout = setTimeout(function() {
      render();
      isDrawing = false;
    }, 70);

  }

}


function MouseOut() {
  mouse.x = 0;
  mouse.y = 0;
  isDrawing = false;
  clearTimeout(drawTimeout);
  render();

}