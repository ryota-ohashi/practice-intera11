import '../scss/style.scss';
import p5 from "p5";

const sketch = (p: p5) => {

  interface Status {
    order: number,
    wordIndex: number,
    letter: string,
    initX: number,
    initY: number,
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
        // console.log(init(letter, index));
        wordArray.push(init(letter, order, index));
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
      obj.y = p.lerp(obj.y, p.map(index, 0, totalLength, p.height / 5, p.height * 4 / 5), 0.05);
      p.text(obj.letter, obj.x, obj.y);
    });

    // 中央に集めない文字の処理
    let filteredUnCollectedArray = wordArray.filter(obj => obj.order !== currentNumber);

    filteredUnCollectedArray.forEach(obj => {

      if (obj.x > (p.width / 2 - 50) && obj.x < (p.width / 2 + 50)) {
        obj.x = obj.initX;
        obj.y = obj.initY;
      }else{
        obj.vx = 2 * p.noise(obj.x / 100, obj.y / 100, t / 100) - 1;
        obj.vy = 2 * p.noise(obj.x / 100, obj.y / 100, (t + 1000) / 100) - 1;
        obj.x += obj.vx;
        obj.y += obj.vy;
      }
      p.text(obj.letter, obj.x, obj.y);
    });

  };

  const splitWord = (word: string) => {
    return word.split("");
  };

  // const randomMinusOneOrOne = () => {
  //   const value = p.random(0,1);
  //   return value > 0.5 ? 1 : -1;
  // }

  // const createPositionX = ():number => {
  //   let flagX = false;
  //   let positionX;
  //   while (flagX === false) {
  //     positionX = p.random(p.width);
  //     if (positionX < (p.width / 2 - 50) && positionX > (p.width / 2 + 50)) flagX = true;
  //   }
  //   return Number(positionX);
  // }

  // const createPositionY = ():number => {
  //   let flagY = false;
  //   let positionY;
  //   while (flagY === false) {
  //     positionY = p.random(p.height);
  //     if (positionY < (p.height / 4) && positionY > (p.height * 3 / 4)) flagY = true;
  //   }
  //   return Number(positionY);
  // }

  const init = (letter: string, order: number, wordIndex: number) => {

    // let flagX = false;
    // let positionX;
    // while (flagX === false) {
    //   positionX = p.random(p.width);
    //   if (positionX < (p.width / 2 - 50) && positionX > (p.width / 2 + 50)) flagX = true;
    // }

    const wordPos: Status = {
      order: order,
      wordIndex: wordIndex,
      letter: letter,
      // initX: createPositionX(),
      // initY: createPositionY(),
      // x: createPositionX(),
      // y: createPositionY(),
      initX: p.random(p.width),
      initY: p.random(p.height),
      x: p.random(p.width),
      y: p.random(p.height),
      vx: 0,
      vy: 0
    };
    return wordPos;
  };

};

new p5(sketch);
