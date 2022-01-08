const weapons = {
  axes: {
    length: 44
  },
  daggers: {
    length: 13
  },
  maces: {
    length: 36
  },
  spears: {
    length: 21
  },
  staffs: {
    length: 58
  },
  swords: {
    length: 144
  }
}

const hats = [
  {
    "name": "Cowboy",
    "file": "hat24"
  },
  {
    "name": "Feather",
    "file": "hat22"
  },
  {
    "name": "Luck",
    "file": "hat18",
    "yAdjust": -2
  },
  {
    "name": "Magician",
    "file": "hat19",
    "yAdjust": -3
  },
  {
    "name": "Pineapple",
    "file": "hat6",
    "yAdjust": 4
  },
  {
    "name": "Pirate",
    "file": "hat13"
  },
  {
    "name": "Sheriff",
    "file": "hat23"
  }
]

const characters = [
  {
    type: "Butcher",
    file: "Butcher",
    hats: hats,
    weapons: weapons.axes,
    weaponsBase: 'axes'
  },
  {
    type: "Butcher",
    file: "Butcher",
    hats: hats,
    weapons: weapons.maces,
    weaponsBase: 'maces'
  },
  {
    type: "Knight",
    file: "Herald",
    hats: hats,
    weapons: weapons.swords,
    weaponsBase: 'swords'
  },
  {
    type: "Mage",
    file: "Mage",
    hats: hats,
    weapons: weapons.staffs,
    weaponsBase: 'staffs'
  },
  {
    type: "Thief",
    file: "Thief",
    hats: hats,
    weapons: weapons.daggers,
    weaponsBase: 'daggers'
  },
  {
    type: "Thief",
    file: "Thief",
    hats: hats,
    weapons: weapons.spears,
    weaponsBase: 'spears'
  }
]

let charIndex = 0;
let charDetails = characters[charIndex];
let character;

let hatDetails = hats[0];
let hatIndex = 0;

let weapon;
let weaponIndex = 0;

let total = 0

const baseDir = './assets'

const getHatImagePath = (file) => `${baseDir}/hats/small/${file}.png`
const getCharacterImagePath = (file) => `${baseDir}/characters/${file}.png`
const getWeaponImagePath = (base, index) => `${baseDir}/weapons/${base}/weapon (${index + 1}).png`

function setup() {
  createCanvas(50, 50)
  noSmooth();
  frameRate(3);

  hat = loadImage(getHatImagePath(hatDetails.file));
  character = loadImage(getCharacterImagePath(charDetails.file));
  weapon = loadImage(getWeaponImagePath(charDetails.weaponsBase, weaponIndex));
}

function draw() {
  clear()

  if (charIndex === characters.length) {
    console.log("Total was:", total)
    // Closing the current tab
    window.open('', '_parent', '');
    window.close()
    return
  }

  // Need to rotate because weapon sprites are titled
  rotate(PI / 180 * -45);
  image(weapon, 0, 28, 16, 16);

  // Reverting back the rotation
  rotate(PI / 180 * 45);
  image(character, 0, 0, 30, 30);

  imageMode(CENTER);

  // Need to horizontally flip because hat sprites are flipped
  scale(-1, 1);
  image(hat, -15, 13 + (hatDetails?.yAdjust || 0), 30, 30);

  imageMode(CORNER);

  hat = loadImage(getHatImagePath(hatDetails.file));
  weapon = loadImage(getWeaponImagePath(charDetails.weaponsBase, weaponIndex));

  if (weaponIndex === (charDetails.weapons.length - 1)) {
    weaponIndex = 0
    hatIndex++
  }
  else {
    weaponIndex++
  }

  if (hatIndex === hats.length) {
    charIndex++;
    hatIndex = 0;
    weaponIndex = 0;

    charDetails = characters[charIndex];
    character = loadImage(getCharacterImagePath(charDetails.file));
  }

  hatDetails = hats[hatIndex];

  total += 1

  saveCanvas()
}