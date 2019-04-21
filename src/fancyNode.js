(function(global) {
  class fancyNode extends NIN.ShaderNode {
    constructor(id, options) {
      super(id, options);
    }

    update(frame) {
      this.uniforms.frame.value = frame;
    }
  }

  global.fancyNode = fancyNode;
})(this);
