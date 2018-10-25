(function(global) {
  class spinningCube extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.list = [];
      for(var i=0;i<10;i++){
        var r = Math.floor((Math.random() * 20) + 5);
        var geo = new THREE.SphereGeometry(r, 32, 32);
        var mat = new THREE.MeshBasicMaterial({color: 0xffffff});
        var sphere = new THREE.Mesh(geo, mat);
        sphere.position.set(Math.floor((Math.random() * 20) + 1), Math.floor((Math.random() * 20) + 1), Math.floor((Math.random() * 10)));
        this.scene.add(sphere);
      }
        /*
      for(s in list) {
        this.scene.add(s);
      }
      */
      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(50, 50, 50);
      this.scene.add(light);

      this.camera.position.z = 100;
    }

    update(frame) {
      super.update(frame);
    }
  }

  global.spinningCube = spinningCube;
})(this);
