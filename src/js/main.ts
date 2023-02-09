import '../scss/style.scss'
import p5 from "p5";

const sketch = (p: p5) => {

  let canvas;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    canvas = <HTMLCanvasElement>document.querySelector(".p5Canvas");
    console.log("hello");

  };

  p.draw = () => {

  };

};

new p5(sketch);