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

  let t = 1;
  let textSize = 24;
  let myFont: p5.Font;
  let fontPath = "/assets/fonts/YujiBoku-Regular.ttf";

  const word = [
    "咳をしても一人",
    "白い椿赤い椿と落ちにけり",
    "さびしくて他人のお葬式へゆく"
  ];
  const wordLength: number = word.length;
  let currentNumber:number = 0;

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

    // 600フレームごとにcurrentNumberを変更
    if (t % 600 === 0 ) currentNumber++;
    if(currentNumber === wordLength) currentNumber = 0;

    // 中央に集める文字の処理
    let filteredCollectedArray = wordArray.filter(obj => obj.order === currentNumber);

    filteredCollectedArray.forEach(obj => {
      let index = obj.wordIndex;
      let totalLength = filteredCollectedArray.length;

      obj.x = p.lerp(obj.x, p.width / 2, 0.05);
      obj.y = p.lerp(obj.y, p.map(index, 0, totalLength, p.height / 4, p.height * 3 / 4), 0.05);
      p.text(obj.letter, obj.x, obj.y);
    });

    // 中央に集めない文字の処理
    let filteredUnCorrectedArray = wordArray.filter(obj => obj.order !== currentNumber);

    filteredUnCorrectedArray.forEach(obj => {

      if (obj.x > (p.width / 2 - 50) && obj.x < (p.width / 2 + 50)) {


      }else{
        obj.vx = 2 * p.noise(obj.x / 100, obj.y / 100, t / 100) - 1;
        obj.vy = 2 * p.noise(obj.x / 100, obj.y / 100, (t + 1000) / 100) - 1;
      }
      obj.x += obj.vx;
      obj.y += obj.vy;
      p.text(obj.letter, obj.x, obj.y);
    });

  };

  const splitWord = (word: string) => {
    return word.split("");
  };

  // const randomMinusOneOrOne = () => {
  //   const value = Math.ceil(Math.sin(Math.random() * Math.PI * 2));
  //   return value > 0 ? 1 : -1;
  // }

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
