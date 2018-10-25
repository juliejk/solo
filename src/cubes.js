(function(global) {
  class cubes extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput(),
        },
        inputs: {
          globeTextures: new NIN.TextureInput(),
          bg: new NIN.TextureInput(),
        }
      });

      this.background = new THREE.Mesh(
        new THREE.PlaneGeometry(12000, 12000, 1),
        new THREE.MeshBasicMaterial()
      );
      this.background.position.z = -8000;
      this.scene.add(this.background);

      this.colors = [0xE8638E, 0xAFFF6B, 0x5CD6E8, 0xFFE765];
      this.hexas = [];
 
      for (let i=0;i<30;i++) {
        let r = Math.floor((Math.random() * 5) + 1);
        let c = Math.floor(Math.random() * 4)
        var geo = new THREE.OctahedronGeometry(4, 2);
        var mesh = new THREE.MeshStandardMaterial({ color: this.colors[c]});
        var hexa = new THREE.Mesh(geo, mesh);
        hexa.position.x = Math.floor((Math.random() * 40) - 20);
        hexa.position.y = Math.floor((Math.random() * 40) - 20);
        this.scene.add(hexa);
        this.hexas.push(hexa);
      }

      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(0, 0, 100);
      this.scene.add(light);

      this.camera.position.z = 100;
    }

    update(frame) {
      super.update(frame);

      this.background.material.map = this.inputs.bg.getValue();
      if (this.background.material.map) {
        this.background.material.map.needsUpdate = true;
        this.background.material.needsUpdate = true;
      }

      for (let i of this.hexas) {
        var sx = i.position.x;
        var sy = i.position.y;
        if (frame % 8 == 0) {
          i.position.x = Math.floor((Math.random() * 30) - 15);
          i.position.y = Math.floor((Math.random() * 30) - 15);
        }
      }
    }
  }

  global.cubes = cubes;
})(this);
