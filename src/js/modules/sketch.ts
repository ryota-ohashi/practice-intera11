import p5 from "p5";

export const sketch = (p: p5) => {

  interface Status {
    order: number,
    wordIndex: number,
    letter: string,
    initX: number,
    initY: number,
    x: number,
    y: number,
    t: number
  }

  let t = 240;
  let interval = 360;
  let textSize = 24;
  let myFont: p5.Font;
  let fontPath = "./assets/fonts/YujiBoku-Regular.ttf";

  const word = [
    "咳をしても一人　尾崎放哉",
    "白い椿赤い椿と落ちにけり　河東碧梧桐",
    "まっすぐな道でさびしい　種田山頭火",
    "さびしくて他人のお葬式へゆく　石部明",
    "月揺れて不意に疑う指の数　加藤久子"
  ];
  const wordLength: number = word.length;
  let currentNumber:number = -1;
  let wordArray: Status[] = [];

  p.preload = () => {
    myFont = p.loadFont(fontPath);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    word.map((words, order) => {

      splitWord(words).map((letter, index) => {
        wordArray.push(init(letter, order, index));
      });

    });

  };

  p.draw = () => {
    t++;
    p.clear(0,0,0,0);
    p.textSize(textSize);
    p.textFont(myFont);
    p.fill(0);

    // intervalごとにcurrentNumberを変更
    if (t % interval === 0 ) currentNumber++;
    if(currentNumber === wordLength) currentNumber = 0;

    // 中央に集める文字の処理
    let filteredCollectedArray = wordArray.filter(obj => obj.order === currentNumber);
    moveCollected(filteredCollectedArray);

    // 中央に集めない文字の処理
    let filteredUnCollectedArray = wordArray.filter(obj => obj.order !== currentNumber);
    moveUnCollected(filteredUnCollectedArray);

  };

  const moveCollected = (filteredCollectedArray: Status[]) => {

    filteredCollectedArray.forEach((obj: Status) => {

      let index = obj.wordIndex;
      let totalLength = filteredCollectedArray.length;

      obj.t = 0;
      obj.x = p.lerp(obj.x, p.width / 2 - textSize / 2, 0.05);
      obj.y = p.lerp(obj.y, p.map(index, 0, totalLength, p.height / 6, p.height * 5 / 6), 0.05);
      p.text(obj.letter, obj.x, obj.y);

    });

  }

  const moveUnCollected = (filteredUnCollectedArray: Status[]) => {

    filteredUnCollectedArray.forEach((obj: Status) => {

      if (obj.t < 90) {
        obj.t++;
        obj.x += (obj.initX - obj.x) * 0.05;
        obj.y += (obj.initY - obj.y) * 0.05;
      }else{
        obj.x += 2 * p.noise(obj.x / 100, obj.y / 100, t / 100) - 1;
        obj.y += 2 * p.noise(obj.x / 100, obj.y / 100, (t + 1000) / 100) - 1;
      }
      p.text(obj.letter, obj.x, obj.y);

    });

  }

  const splitWord = (word: string) => {
    return word.split("");
  };

  const createPositionX = (): number => {

    let positionX;
    const flag = p.random(1);

    if (flag > 0.5) {
      positionX = p.random(p.width / 2 - 120);
    }else{
      positionX = p.random(p.width / 2 + 120, p.width);
    }
    return positionX;
  }

  const createPositionY = (): number => {
    return p.random(p.height);
  }

  const init = (letter: string, order: number, wordIndex: number) => {

    const wordPos: Status = {
      order: order,
      wordIndex: wordIndex,
      letter: letter,
      initX: createPositionX(),
      initY: createPositionY(),
      x: createPositionX(),
      y: createPositionY(),
      t: 0
    };
    return wordPos;
  };

};