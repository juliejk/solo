(function(global) {
  class tunnelcanvas extends NIN.THREENode {
    constructor(id) {
      super(id, {
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      this.output = new THREE.VideoTexture(this.canvas);
      this.output.minFilter = THREE.LinearFilter;
      this.output.magFilter = THREE.LinearFilter;

      this.colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
      this.circles = [];
      for (var i=0;i<100;i+=4) {
        this.circles[i] = i;
      }
    }

    update(frame) {
      super.update(frame);
      this.canvas.width += 0;

      this.ctx.save();
      // this.ctx.globalCompositeOperation = "lighter";
      this.ctx.scale(GU, GU);
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, 16, 9);
      for (var i=0;i<100;i+=4) {
        var x = 16/2;
        var y = 9/2;
        var r = (this.circles[i] + 1)%6 * (frame % 48)/60; 
        var grd = this.ctx.createRadialGradient(x, y, r, x, y, r+2);
        grd.addColorStop(0, "white");
        grd.addColorStop(0.9, "#FF69B4");
        grd.addColorStop(1, "black");
        this.ctx.beginPath();
        this.ctx.arc(x, y, r+2, 0, 2 * Math.PI);
        this.ctx.fillStyle = grd;
        this.ctx.fill();
        this.circles[i] = r;
      }
      this.ctx.restore();

      this.ctx.save();
      this.ctx.translate(1, 4.5);
      this.ctx.rotate(Math.PI / 2);
      this.ctx.font = '0.95pt schmalibre';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'alphabetic';
      this.ctx.fillStyle = '#000000';
      this.ctx.fillText('THIS TIME', 0., -0.51);
      this.ctx.restore();
    }

    resize() {
      this.canvas.width = 16 * GU;
      this.canvas.height = 9 * GU;
    }

    render() {
      this.output.needsUpdate = true;
      this.outputs.render.setValue(this.output);
    }

    insert(){
      this.text.add = true;
      this.text = "show bobs and vagene";
      this.text.color = "#224488";
    }
  }
  global.tunnelcanvas = tunnelcanvas;
})(this);
