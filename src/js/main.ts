import '../scss/style.scss';
import p5 from "p5";

const sketch = (p: p5) => {

  interface Status {
    order: number,
    wordIndex: number,
    letter: string,
    x: number,
    y: number,
    vx: number,
    vy: number
  }

  let t = 0;
  let textSize = 24;
  let myFont: p5.Font;
  let fontPath = "/assets/fonts/YujiBoku-Regular.ttf";

  const word = [
    "咳をしても一人",
    "白い椿赤い椿と落ちにけり",
    "さびしくて他人のお葬式へゆく"
  ];

  let wordArray: Status[] = [];

  p.preload = () => {
    myFont = p.loadFont(fontPath);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    word.map((words, order) => {
      splitWord(words).map((letter, index) => {
        // console.log(initPos(letter, index));
        wordArray.push(initPos(letter, order, index));
      });
    });
    // console.log(wordArray);

  };

  p.draw = () => {
    t++;
    p.clear(0,0,0,0);
    p.textSize(textSize);
    p.textFont(myFont);
    p.fill(0);

    wordArray.forEach(obj => {
      obj.x += obj.vx;
      obj.y += obj.vy;
      obj.vx = 2 * p.noise(obj.x / 100, obj.y / 100, t / 100) - 1;
      obj.vy = 2 * p.noise(obj.x / 100, obj.y / 100, (t + 1000) / 100) - 1;
      p.text(obj.letter, obj.x, obj.y);
    });
  };

  const splitWord = (word: string) => {
    return word.split("");
  };

  const initPos = (letter: string, order: number, wordIndex: number) => {
    const wordPos: Status = {
      order: order,
      wordIndex: wordIndex,
      letter: letter,
      x: p.random(p.windowWidth),
      y: p.random(p.windowHeight),
      vx: 0,
      vy: 0
    };
    return wordPos;
  };

};

new p5(sketch);
