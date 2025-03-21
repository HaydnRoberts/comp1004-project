const playerTypeGUI = document.querySelector('#player-type');
const playerSubclassGUI = document.querySelector('#player-subclass');
const playerItemGUI = document.querySelector('#player-item');
const playerHealthGUI = document.querySelector('#player-health');
const playerImageGUI = document.querySelector('#player-image');

const enemyTypeGUI = document.querySelector('#enemy-type');
const enemySubclassGUI = document.querySelector('#enemy-subclass');
const enemyItemGUI = document.querySelector('#enemy-item');
const enemyHealthGUI = document.querySelector('#enemy-health');
const enemyImageGUI = document.querySelector('#enemy-image');

const combatGUI = document.querySelector('#game-3-combat');
const typeGUI = document.querySelector('#game-3-type-choice');
const subclassGui = document.querySelector('#game-3-subclass-choice')
const subclassChoice0 = document.querySelector('#subclass0');
const subclassChoice1 = document.querySelector('#subclass1');

function HealthBar(progression, end, length){
	let progressBar = "";
	let fullBar = '|';
	let emptyBar = ':';
	let percentage = (progression / end) * 100;

	for (let i = 0; i < length; i++) {
		let forPercentage = (i / length) * 100;
		if (forPercentage < percentage) {
			progressBar += fullBar;
		}
		else {
			progressBar += emptyBar;
		}
	}

	return progressBar;
}

let Types = ["Fire", "Ice", "Healer", "Poison", "Ground", "Flying", "Metal", "Electric"];
let subclasses = ["Flame", "Molten", "Freeze", "Slow", "Medic", "Vampiric", "Venom", "Viral", "Sandstorm", "Flora", "Breeze", "Clense", "Armour", "Blade", "Grounded", "Charge"];
// items are the equivelant of a craftable second subclass
// Type 1 can access subclass 1 and 2, Type 2 can access subclass 3 and 3, ect

let playerMonster = ['','','']; // 0 is type, 1 is subclass, 2 is item
let tmp = 0;
function chooseType(value){
	playerMonster[0] = Types[value];
	tmp = value;

	subclassChoice0.innerHTML = subclasses[tmp*2];
	subclassChoice1.innerHTML = subclasses[(tmp*2)+1];
	
	battleIcon(value ,"player");
	
	typeGUI.classList.add('hidden');
	subclassGui.classList.remove('hidden');
}
function subclass(value){
	playerMonster[1] = subclasses[((tmp*2)+value)];

	playerTypeGUI.innerHTML = playerMonster[0];
	playerSubclassGUI.innerHTML = playerMonster[1];
	playerItemGUI.innerHTML = "no item";
	playerHealthGUI.innerHTML = HealthBar(100,100,50);
	

	subclassGui.classList.add('hidden');
	combatGUI.classList.remove('hidden');
}



function battleIcon(typeID, player){
	let target = "";
	let tmpType = "";

	tmpType = Types[typeID];
	if(tmpType == "Fire"){
		target = "RedWyvern320px.webp";
	} else if(tmpType == "Ice"){
		target = "IceDragon320px.webp";
	} else if (tmpType == "Healer"){
		target = "GreenWyvern320px.webp";
	} else if (tmpType == "Poison"){
		target = "VenomDragon320px.webp";
	} else if(tmpType == "Ground"){
		target = "GroundWorm320px.webp";
	} else if(tmpType == "Flying"){
		target = "FlyingMonster320px.webp";
	}else if (tmpType == "Metal"){
		target = "EvilFrog320px.webp";
	} else if (tmpType == "Electric"){
		target = "ElectricDog320px.webp";
	} else {
		console.warn("Unknown type:", tmpType);
		target = "placeholder-200x200.jpg"; // Set a default fallback image
	}
	


	if(player=="enemy"){
		enemyImageGUI.src = `/comp1004-PROJECT/public/Images/${target}`;

	} else{
		playerImageGUI.src = `/comp1004-PROJECT/public/Images/${target}`;

	}


}









typeGUI.classList.remove('hidden');
subclassGui.classList.add('hidden');
combatGUI.classList.add('hidden');