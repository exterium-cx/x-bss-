const BASE_ITEMS = [
  "royalJelly",  
  "magicBean",    
  "honeysuckle",
  "whirligig",
  "coconut",
  "strawberry",
  "blueberry",
  "pineapple",
  "sunflowerSeed",
  "neonberry",
  "bitterberry"
];

const RECIPES = {

  redExtract: {
    strawberry: 50,
    royalJelly: 10
  },

  blueExtract: {
    blueberry: 50,
    royalJelly: 10
  },

  oil: {
    sunflowerSeed: 50,
    royalJelly: 10
  },

  enzymes: {
    pineapple: 50,
    royalJelly: 10
  },

  gumdrops: {
    pineapple: 3,
    blueberry: 3,
    strawberry: 3
  },

  glue: {
    gumdrops: 50,
    royalJelly: 10
  },

  moonCharm: {
    pineapple: 5,
    gumdrops: 5,
    royalJelly: 1
  },

  glitter: {
    magicBean: 1,
    moonCharm: 25
  },

  tropicalDrink: {
    coconut: 10,
    enzymes: 2,
    oil: 2
  },

  purplePotion: {
    neonberry: 3,
    redExtract: 3,
    blueExtract: 3,
    glue: 3
  },

  superSmoothie: {
    neonberry: 3,
    starJelly: 3,
    purplePotion: 3,
    tropicalDrink: 6
  },

  starJelly: {
    glitter: 3,
    royalJelly: 100
  },

  softWax: {
    honeysuckle: 5,
    oil: 1,
    enzymes: 1,
    royalJelly: 10
  },

  hardWax: {
    softWax: 3,
    enzymes: 3,
    bitterberry: 33,
    royalJelly: 33
  },

  swirledWax: {
    hardWax: 3,
    softWax: 9,
    purplePotion: 6,
    royalJelly: 3333
  },

  causticWax: {
    hardWax: 5,
    enzymes: 5,
    neonberry: 25,
    royalJelly: 5252
  },

  fieldDice: {
    softWax: 1,
    whirligig: 1,
    redExtract: 1,
    blueExtract: 1
  },

  smoothDice: {
    fieldDice: 3,
    softWax: 3,
    whirligig: 3,
    oil: 3
  },

  loadedDice: {
    smoothDice: 3,
    hardWax: 3,
    oil: 3,
    glue: 1
  },

  turpentine: {
    superSmoothie: 10,
    causticWax: 10,
    starJelly: 100,
    honeysuckle: 1000
  }
};