(function(global) {
  class SceneSwitcherNode extends NIN.Node {
    constructor(id) {
      super(id, {
        inputs: {
          A: new NIN.TextureInput(),
          B: new NIN.TextureInput(),
          C: new NIN.TextureInput(),
          D: new NIN.TextureInput(),
          E: new NIN.TextureInput(),
          F: new NIN.TextureInput(),
          G: new NIN.TextureInput(),
          H: new NIN.TextureInput(),
        },
        outputs: {
          render: new NIN.TextureOutput(),
        }
      });
    }

    update() {
      this.inputs.A.enabled = false;
      this.inputs.B.enabled = false;
      this.inputs.C.enabled = false;
      this.inputs.D.enabled = false;
      this.inputs.E.enabled = false;
      this.inputs.F.enabled = false;
      this.inputs.G.enabled = false;
      this.inputs.H.enabled = false;

      let selectedScene;
      if (BEAN < 48 * 2) {
        selectedScene = this.inputs.A;
      } else if (BEAN < 48 * 4) {
        selectedScene = this.inputs.B;
      } else if (BEAN < 48 * 6) {
        selectedScene = this.inputs.C;
      } else if (BEAN < 48 * 8) {
        selectedScene = this.inputs.D;
      } else if (BEAN < 48 * 10) {
        selectedScene = this.inputs.E;
      } else if (BEAN < 48 * 12) {
        selectedScene = this.inputs.F;
      } else if (BEAN < 48 * 14) {
        selectedScene = this.inputs.G;
      } else {
        selectedScene = this.inputs.H;
      }

      selectedScene.enabled = true;
      this.outputs.render.setValue(selectedScene.getValue());
    }
  }

  global.SceneSwitcherNode = SceneSwitcherNode;
})(this);
