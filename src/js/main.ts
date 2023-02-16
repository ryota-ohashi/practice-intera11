import '../scss/style.scss';
import p5 from "p5";

const sketch = (p: p5) => {

  interface Status {
    order: number,
    letter: string,
    x: number,
    y: number
  }

  let t = 0;
  let textSize = 24;
  let myFont: p5.Font;
  let fontPath = "/public/fonts/YujiBoku-Regular.ttf";

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
    word.map((words, index) => {
      splitWord(words).map((letter) => {
        // console.log(initPos(letter, index));
        wordArray.push(initPos(letter, index));
      });
    });
    console.log(wordArray);

  };

  p.draw = () => {
    t++;
    p.clear;
    p.textSize(textSize);
    p.textFont(myFont);
    p.fill(0);

    wordArray.forEach(obj => {
        p.text(obj.letter, obj.x, obj.y);
    });
  };

  const splitWord = (word: string) => {
    return word.split("");
  };

  const initPos = (letter: string, index: number) => {
    const wordPos: Status = {
      order: index,
      letter: letter,
      x: p.random(p.windowWidth - textSize),
      y: p.random(p.windowHeight - textSize)
    };
    return wordPos;
  };

};

new p5(sketch);
