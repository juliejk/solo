(function(global) {
  class sky extends NIN.THREENode {
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
      this.colors2 = ["#F2784B", "#F5AB35", "#F7CA18", "#D35400", "#FABE58", "#F9BF3B"];

      this.stars = [];
      for (var i=0;i<700;i++) {
        var x = Math.random() * 16;
        var y = Math.random() * 9;
        var r = (Math.random() * 9 + 1) * 0.02;
        this.stars.push([x, y, r]);
      }
    }

    update(frame) {
      super.update(frame);

      // This clears the canvas
      this.canvas.width += 0;

      this.ctx.save();
      this.ctx.globalCompositeOperation = "lighter";
      this.ctx.scale(GU, GU);
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, 16, 9);
      for (var i=0;i<700;i++) {
        var x = this.stars[i][0] + 0.01*Math.sin(i + frame/60);
        var y = this.stars[i][1] + 0.01*Math.cos(i + frame/60);
        var r = this.stars[i][2];
        var grd = this.ctx.createRadialGradient(x, y, r, x, y, r*2);
        var c1 = i%3 == 0 ? "#b300b3" : i%3 == 1 ? "#29a3a3" : "#208000";
        //grd.addColorStop(0, this.colors2[i%6]);
        grd.addColorStop(0, "#FF69B4");
        grd.addColorStop(1, "#000000");
        this.ctx.beginPath();
        this.ctx.arc(x, y, r*2, 0, 2 * Math.PI);
        this.ctx.fillStyle = grd;
        this.ctx.fill();
        this.stars[i][0] = x;
        this.stars[i][1] = y;
      }

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
  }

  global.sky = sky;
})(this);
