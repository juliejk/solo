(function(global) {
  class planet extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.cube = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5),
                                 new THREE.MeshStandardMaterial());
      this.scene.add(this.cube);

      var starMap = Loader.loadTexture('res/stars3.jpeg');
      var starGeo = new THREE.SphereGeometry(50, 32, 32);
      var starMat = new THREE.MeshBasicMaterial({ map: starMap, side: THREE.BackSide });
      this.stars = new THREE.Mesh(starGeo, starMat);
      this.scene.add(this.stars);

      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(50, 50, 50);
      this.scene.add(light);

      this.camera.position.z = 49;
    }

    update(frame) {
      super.update(frame);

      this.cube.rotation.x = Math.sin(frame / 50);
      this.cube.rotation.y = Math.cos(frame / 50);
    }
  }

  global.planet = planet;
})(this);
