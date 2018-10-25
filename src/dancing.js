(function(global) {
  class dancing extends NIN.THREENode {
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
    }

    update(frame) {
      super.update(frame);
      this.ctx.save();
      this.ctx.scale(GU, GU);
      this.ctx.restore();
    }

    resize() {
      this.canvas.width = 16 * GU;
      this.canvas.height = 9 * GU;
    }

    frontLeft(X1, Y1) {
      this.ctx.beginPath();
      this.ctx.moveTo(X1, Y1);
      this.ctx.lineTo(X1, Y1 + 10);
      this.ctx.lineTo(X1 - 25, Y1 + 12);
      this.ctx.lineTo(X1 - 100, Y1 + 100);
      this.ctx.lineTo(X1 - 92, Y1 + 108);
      this.ctx.lineTo(X1 - 25, Y1 + 30);
      this.ctx.lineTo(X1 - 22, Y1 + 74);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(X1 - 21, Y1 + 91); 
      this.ctx.lineTo(X1 - 20, Y1 + 130); 
      this.ctx.lineTo(X1 - 25, Y1 + 215);
      this.ctx.lineTo(X1 - 10, Y1 + 215);
      this.ctx.lineTo(X1 - 5, Y1 + 132);
      this.ctx.lineTo(X1 + 20, Y1 + 132);
      this.ctx.lineTo(X1 + 15, Y1 + 215);
      this.ctx.lineTo(X1 + 30, Y1 + 215);
      this.ctx.lineTo(X1 + 35, Y1 + 130);
      this.ctx.lineTo(X1 + 30, Y1 + 30);
      this.ctx.lineTo(X1 - 37, Y1 + 108);
      this.ctx.lineTo(X1 - 45, Y1 + 100);
      this.ctx.lineTo(X1 + 30, Y1 + 12);
      this.ctx.lineTo(X1 + 10, Y1 + 10);
      this.ctx.lineTo(X1 + 10, Y1);
      this.ctx.stroke();
    }

    backLeft(X1, Y1) {
      this.ctx.beginPath();
      this.ctx.moveTo(X1, Y1);
      this.ctx.lineTo(X1, Y1 + 10);
      this.ctx.lineTo(X1 + 25, Y1 + 12);
      this.ctx.lineTo(X1 + 100, Y1 + 100);
      this.ctx.lineTo(X1 + 92, Y1 + 108);
      this.ctx.lineTo(X1 + 25, Y1 + 30);
      this.ctx.lineTo(X1 + 20, Y1 + 130);
      this.ctx.lineTo(X1 + 25, Y1 + 215);
      this.ctx.lineTo(X1 + 10, Y1 + 215);
      this.ctx.lineTo(X1 + 5, Y1 + 132);
      this.ctx.lineTo(X1 - 20, Y1 + 132);
      this.ctx.lineTo(X1 - 15, Y1 + 215);
      this.ctx.lineTo(X1 - 30, Y1 + 215);
      this.ctx.lineTo(X1 - 35, Y1 + 130);
      this.ctx.lineTo(X1 - 30, Y1 + 30);
      this.ctx.lineTo(X1 - 30, Y1 + 12);
      this.ctx.lineTo(X1 - 10, Y1 + 10);
      this.ctx.lineTo(X1 - 10, Y1);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(X1 + 22, Y1 + 91);
      this.ctx.lineTo(X1 + 37, Y1 + 108);
      this.ctx.lineTo(X1 + 45, Y1 + 100);
      this.ctx.lineTo(X1 + 22, Y1 + 73);
      this.ctx.stroke();
    }

    backRight(X1, Y1) {
      this.ctx.beginPath();
      this.ctx.moveTo(X1, Y1);
      this.ctx.lineTo(X1, Y1 + 10);
      this.ctx.lineTo(X1 - 25, Y1 + 12);
      this.ctx.lineTo(X1 - 100, Y1 + 100);
      this.ctx.lineTo(X1 - 92, Y1 + 108);
      this.ctx.lineTo(X1 - 25, Y1 + 30);
      this.ctx.lineTo(X1 - 20, Y1 + 130);
      this.ctx.lineTo(X1 - 25, Y1 + 215);
      this.ctx.lineTo(X1 - 10, Y1 + 215);
      this.ctx.lineTo(X1 - 5, Y1 + 132);
      this.ctx.lineTo(X1 + 20, Y1 + 132);
      this.ctx.lineTo(X1 + 15, Y1 + 215);
      this.ctx.lineTo(X1 + 30, Y1 + 215);
      this.ctx.lineTo(X1 + 35, Y1 + 130);
      this.ctx.lineTo(X1 + 30, Y1 + 30);
      this.ctx.lineTo(X1 + 30, Y1 + 12);
      this.ctx.lineTo(X1 + 10, Y1 + 10);
      this.ctx.lineTo(X1 + 10, Y1);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(X1 - 22, Y1 + 91);
      this.ctx.lineTo(X1 - 37, Y1 + 108);
      this.ctx.lineTo(X1 - 45, Y1 + 100);
      this.ctx.lineTo(X1 - 22, Y1 + 73);
      this.ctx.stroke();
    }

    frontRight(X1, Y1) {
      this.ctx.beginPath();
      this.ctx.moveTo(X1, Y1);
      this.ctx.lineTo(X1, Y1 + 10);
      this.ctx.lineTo(X1 + 25, Y1 + 12);
      this.ctx.lineTo(X1 + 100, Y1 + 100);
      this.ctx.lineTo(X1 + 92, Y1 + 108);
      this.ctx.lineTo(X1 + 25, Y1 + 30);
      this.ctx.lineTo(X1 + 22, Y1 + 74);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(X1 + 21, Y1 + 91); 
      this.ctx.lineTo(X1 + 20, Y1 + 130);
      this.ctx.lineTo(X1 + 25, Y1 + 215);
      this.ctx.lineTo(X1 + 10, Y1 + 215);
      this.ctx.lineTo(X1 + 5, Y1 + 132);
      this.ctx.lineTo(X1 - 20, Y1 + 132);
      this.ctx.lineTo(X1 - 15, Y1 + 215);
      this.ctx.lineTo(X1 - 30, Y1 + 215);
      this.ctx.lineTo(X1 - 35, Y1 + 130);
      this.ctx.lineTo(X1 - 30, Y1 + 30);
      this.ctx.lineTo(X1 + 37, Y1 + 108);
      this.ctx.lineTo(X1 + 45, Y1 + 100);
      this.ctx.lineTo(X1 - 30, Y1 + 12);
      this.ctx.lineTo(X1 - 10, Y1 + 10);
      this.ctx.lineTo(X1 - 10, Y1);
      this.ctx.stroke();
    }

    render() {
      this.output.needsUpdate = true;
      this.outputs.render.setValue(this.output);

      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(0, 0, GU * 16, GU * 9);

      const shadow = 'rgba(255, 255, 255, 0)';
      const X1 = 300;
      const Y1 = 100;

      this.ctx.strokeStyle = '#ff80df';

      this.ctx.lineWidth = 5;
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = '#ff80df';
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
      this.ctx.beginPath();
      this.ctx.arc(300,60,40,0,2*Math.PI);
      this.ctx.stroke();

      if (BEAN % 24 < 4) {
        this.frontLeft(X1, Y1);
      } else if (BEAN % 24 >= 4 && BEAN % 24 < 8) {
        this.backLeft(X1, Y1);
      } else if (BEAN % 24 >= 8 && BEAN % 24 < 12) {
        this.frontLeft(X1, Y1);
      } else if (BEAN % 24 >= 12 && BEAN % 24 < 16) {
        this.frontRight(X1, Y1);
      } else if (BEAN % 24 >= 16 && BEAN % 24 < 20) {
        this.backRight(X1, Y1);
      } else {
        this.frontRight(X1, Y1);
      }

      this.ctx.strokeStyle = '#ffffff';

      this.ctx.lineWidth = 2;
      this.shadowBlur = 0;
      this.ctx.beginPath();
      this.ctx.arc(300,60,40,0,2*Math.PI);
      this.ctx.stroke();

      if (BEAN % 24 < 4) {
        this.frontLeft(X1, Y1);
      } else if (BEAN % 24 >= 4 && BEAN % 24 < 8) {
        this.backLeft(X1, Y1);
      } else if (BEAN % 24 >= 8 && BEAN % 24 < 12) {
        this.frontLeft(X1, Y1);
      } else if (BEAN % 24 >= 12 && BEAN % 24 < 16) {
        this.frontRight(X1, Y1);
      } else if (BEAN % 24 >= 16 && BEAN % 24 < 20) {
        this.backRight(X1, Y1);
      } else {
        this.frontRight(X1, Y1);
      }
    }
  }

  global.dancing = dancing;
})(this);
