(function(global) {
  class ballshaderNode extends NIN.ShaderNode {
    constructor(id, options) {
      super(id, options);
    }

    update(frame) {
      this.uniforms.frame.value = frame;
    }
  }

  global.ballshaderNode = ballshaderNode;
})(this);
