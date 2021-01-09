// import {configuration} from "./application-config.js";
const configuration = {
    height : 1000,
    width : 1000,
    backgroundColor : 0x2A1D32,
    transparent : false,
    resolution : 1,
    antialias : true
}

 app = new PIXI.Application(configuration)
document.body.appendChild(app.view)

loader = app.loader
// Texture = PIXI.Texture
// Sprite = PIXI.Sprite



const appendCardObject = (i, deckTextures, app, x, y, clickEvent) => {
  let val = i['value'];
  let backTexture = deckTextures[`back_1.png`];
  let frontTexture = deckTextures[`symbol${val}.png`];
  // console.log(frontTexture)
  // console.log(backTexture)
  let card = new PIXI.Sprite(backTexture);
  
  card.interactive = true;
  card.buttonMode = true;
  card.visible = true;
  card.value = i['value'];

  card.showFront = () => {
    card.texture = frontTexture;
  };
  card.showBack = () => {
    card.texture = backTexture;
  };

  card.x = x + card.width;
  card.y = y + card.height;

  card.on("click", () => {
    clickEvent(card);
  });
  app.stage.addChild(card);

  return card;
}

const randomArray = [1,2,3,1,2,3];
randomArrayGenerator = shuffle(randomArray);

loader.add("spritesheet.json").load(() => {
  const deckTextures = loader.resources["spritesheet.json"].textures;

  var isOpencard = false;

  const clickEvent = (card) => {
    console.log(card.value);
    var currentOpenCard = card;
    if (remainCards > 0){
      if (! isOpencard) {
        lastOpenCard = card;
        isOpencard = true;
        currentOpenCard.showFront();
      }
      else{
        currentOpenCard.showFront();

        if(lastOpenCard.value == currentOpenCard.value){
          lastOpenCard.visible = false;
          currentOpenCard.visible = false;
          isOpencard = false;
          remainCards -= 1;
        }
        else{
          lastOpenCard.showBack();
          currentOpenCard.showBack();
          isOpencard = false;
          lastOpenCard = currentOpenCard = false;
        }
      }

    }
  };

  const cards = [
    appendCardObject(randomArrayGenerator.next(), deckTextures, app, 0, 0, clickEvent),
    appendCardObject(randomArrayGenerator.next(), deckTextures, app, 130, 0,clickEvent ),
    appendCardObject(randomArrayGenerator.next(), deckTextures, app, 260, 0, clickEvent),
    appendCardObject(randomArrayGenerator.next(), deckTextures, app, 0, 202, clickEvent),
    appendCardObject(randomArrayGenerator.next(), deckTextures, app, 130, 202, clickEvent),
    appendCardObject(randomArrayGenerator.next(), deckTextures, app, 260, 202, clickEvent)
  ];

});

var isOpencard = false;
var remainCards = 3;

app.ticker.add(() => {
  
  })


// FOR RANDOMLY GENERATE UNIQUE FROM ARRAY
// [INFO]:in this case splice will delete data from array, needs something better than this
function* shuffle(array) {
  var i = array.length;
  console.log("here");
  while (i--) {
      yield array.splice(Math.floor(Math.random() * (i+1)), 1)[0];
  }
}



  