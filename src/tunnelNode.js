(function(global) {
  class tunnelNode extends NIN.ShaderNode {
    constructor(id, options) {
      super(id, options);
    }

    update(frame) {
      this.uniforms.frame.value = frame;
    }
  }

  global.tunnelNode = tunnelNode;
})(this);
