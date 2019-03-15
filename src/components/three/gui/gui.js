export function getModel() {
  let ui = {
    flower_Layer1: {
      size: 0.5,
      open: 1,
      petalShape: -0.3, //variation
      petalNum: 4,
      color: "#eb00fa"
    },

    flower_Layer2: {
      enable: false,
      size: 0.4,
      open: 0.5,
      petalShape: -0.3, //variation
      petalNum: 4,
      color: "#eb00fa"
    },

    flower_Layer3: {
      enable: false,
      size: 0.2,
      open: 0.2,
      petalShape: -0.3, //variation
      petalNum: 4,
      color: "#eb00fa"
    },
    root: {
      leafNum: 4,
      length: 1,
      wave: 1 //variation
    }
  };
  return ui;
}

export function setupPanel(gui, ui) {
  let fs = gui.addFolder("flower_Layer1");
  fs.add(ui.flower_Layer1, "size", 0.5, 2).step(0.01);
  fs.add(ui.flower_Layer1, "open", -1.5, 1).step(0.01);
  fs.add(ui.flower_Layer1, "petalShape", -0.5, 0.5).step(0.01);
  fs.add(ui.flower_Layer1, "petalNum", 3, 20).step(1);
  fs.addColor(ui.flower_Layer1, "color");
  fs.open();

  let fs2 = gui.addFolder("flower_Layer2");
  fs2.add(ui.flower_Layer2, "enable");
  fs2.add(ui.flower_Layer2, "size", 0.5, 2).step(0.01);
  fs2.add(ui.flower_Layer2, "open", -1.4, 0.3).step(0.01);
  fs2.add(ui.flower_Layer2, "petalShape", -0.5, 0.5).step(0.01);
  fs2.add(ui.flower_Layer2, "petalNum", 3, 20).step(1);
  fs2.addColor(ui.flower_Layer2, "color");

  let fs3 = gui.addFolder("flower_Layer3");
  fs3.add(ui.flower_Layer3, "enable");
  fs3.add(ui.flower_Layer3, "size", 0.5, 2).step(0.01);
  fs3.add(ui.flower_Layer3, "open", -1.4, 0.3).step(0.01);
  fs3.add(ui.flower_Layer3, "petalShape", -0.5, 0.5).step(0.01);
  fs3.add(ui.flower_Layer3, "petalNum", 3, 20).step(1);
  fs3.addColor(ui.flower_Layer3, "color");

  let fr = gui.addFolder("root");
  fr.add(ui.root, "leafNum", 0, 20).step(1);
  fr.add(ui.root, "length", 0, 2).step(0.01);
  fr.add(ui.root, "wave", -1, 1).step(0.01);
  fr.open();
}
