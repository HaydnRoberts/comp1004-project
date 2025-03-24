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

const playerHealth = 100;
const enemyHealth = 100;

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
	playerHealthGUI.innerHTML = HealthBar(playerHealth,100,50);
	
	generateRandomOpponent();

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

function generateRandomOpponent(){
	let tmp = getRandomInt(8);
	enemyTypeGUI.innerHTML = Types[tmp];

	// subclass modifier is either 0 or 1
	let subclassModifier= getRandomInt(2);
	// this equation mathches the type to the two valid subclasses
	// e.g. type 0 should match to 0 and 1: type 0, (0+1)*2=2, 2-1=1, 2-2=0
	// and type 3 should match to 6 and 7: type 3 (3+1)*2=8, 8-1=7, 8-2=6
	subclassModifier = ((tmp+1)*2)-(1+subclassModifier)
	enemySubclassGUI.innerHTML = subclasses[subclassModifier];
	enemyHealthGUI.innerHTML = HealthBar(enemyHealth,100,50);
	battleIcon(tmp, "enemy")
	enemyItemGUI.innerHTML = "no item";
}

// add the effects function here
function subclassEffects(subclass, user, target){
	if (subclass == "Flame"){
		//target takes minor damage every turn and takes slightly more damage - fire status
	} else if (subclass == "Molten"){
		// user deals chip damge whenever attacked - molten scales status
	} else if (subclass == "Freeze"){
		// user attacks target for reduced damage and has a 1/2 chance to skip the target's next turn with the frozen status
	} else if (subclass == "Slow"){
		// skips the targets next turn, however, only attacks can be used against it during that turn - slow status
	} else if (subclass == "Medic"){
		// user re-gains 30 health
	} else if (subclass == "Vampiric"){
		// all of user's future attacks have lifesteal - re-gain health on attack, based on percentage of attack damage
	} else if (subclass == "Poison"){
		// target takes damage every turn - poisoned status
	} else if (subclass == "Viral"){
		// user takes damage every turn - poisoned status, but user also gains a major damage boost - major-dmg-up status
	} else if (subclass == "Sandstorm"){
		//target takes minor damage every turn - sandstorm status, user takes slightly less damage - minor-def-up status
	} else if (subclass == "Flora"){
		// target loses health, next turn user gains this health - flora status
	} else if (subclass == "Breeze"){
		// target and user swap all status effects
	} else if (subclass == "Clense"){
		// target loses all positive status effects, user loses all negative status effects
	} else if (subclass == "Armour"){
		// user takes less damage - def-up
	} else if (subclass == "Blade"){
		// user deals more damage - dmg-up
	} else if (subclass == "Charge"){
		// user gains major-dmg-up for two turns 
	} else if (subclass == "Ground"){
		// user damages target once for each status effect target has, then remove those status effects
	}
}

function playerMove(move){
	if (playerItemGUI.innerHTML != "no item" && move != "item"){
		let baseDamage = 20;
		// go through and apply effects
		if (move == "attack"){
			enemyHealth -= baseDamage;
		} else if (move == "subclass"){
			subclassEffects(playerSubclassGUI.innerHTML, "Player", "Enemy")
		} else if (move == "item"){
			subclassEffects(playerItemGUI.innerHTML, "Player", "Enemy")
		}
		// rand 1-3(1-2 if no item) for what the enemy will do
		// more advanced logic may be added later but is outside current sprint scope
		baseDamage = 20;
		let enemyMove = 0;
		if (enemyItemGUI.innerHTML == "no item"){
			enemyMove = getRandomInt(2);
		} else {
			enemyMove = getRandomInt(3);
		}
		if (enemyMove == 0){
			playerHealth -= baseDamage;
		} else if (enemyMove == 1){
			subclassEffects(enemySubclassGUI.innerHTML, "Enemy", "Player")
		} else if (enemyMove == 2){
			subclassEffects(enemyItemGUI.innerHTML, "Enemy", "Player")
		}

		// check if either monster's health is below 0
		// if it isnt, show health and end turn
		// if user is, show stat screen and ask them to play again or load their save
		// if enemy is, enemy drops ([type] core), this can be turned into an item fo either of that type's subclasses 
		// e.g. Ice core can be turned into Freeze Item or Slow Item, letting the player's monster use that ability
		
		enemyHealthGUI.innerHTML = HealthBar(enemyHealth,100,50);
		playerHealthGUI.innerHTML = HealthBar(playerHealth,100,50);
	}
}




typeGUI.classList.remove('hidden');
subclassGui.classList.add('hidden');
combatGUI.classList.add('hidden');