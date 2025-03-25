const playerTypeGUI = document.querySelector('#player-type');
const playerSubclassGUI = document.querySelector('#player-subclass');
const playerItemGUI = document.querySelector('#player-item');
const playerHealthGUI = document.querySelector('#player-health');
const playerImageGUI = document.querySelector('#player-image');
const playerStatusGUI = document.querySelector('#player-status');

const enemyTypeGUI = document.querySelector('#enemy-type');
const enemySubclassGUI = document.querySelector('#enemy-subclass');
const enemyItemGUI = document.querySelector('#enemy-item');
const enemyHealthGUI = document.querySelector('#enemy-health');
const enemyImageGUI = document.querySelector('#enemy-image');
const enemyStatusGUI = document.querySelector('#enemy-status');

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

let playerHealth = 100;
let enemyHealth = 100;

let playerMonster = ['','','']; // 0 is type, 1 is subclass, 2 is item
let playerStatusList = [];
let enemyStatusList = [];
let tmp = 0;
function chooseType(value){
	playerMonster[0] = Types[value];
	tmp = value;

	subclassChoice0.innerHTML = subclasses[tmp*2];
	subclassChoice1.innerHTML = subclasses[(tmp*2)+1];
	
	battleIcon(value ,"player");
	playerImageGUI.style.transform = playerImageGUI.style.transform === 'scaleX(-1)' ? 'scaleX(1)' : 'scaleX(-1)';
	
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

function subclassEffects(subclass, user, baseDamage){
	let targetStatusList, targetHealth, userStatusList, userHealth;

    if (user === "Player") {
        userStatusList = playerStatusList;
        userHealth = playerHealth;
		targetStatusList = enemyStatusList;
        targetHealth = enemyHealth;
    } else if (user === "Enemy") {
		userStatusList = enemyStatusList;
        userHealth = enemyHealth;
        targetStatusList = playerStatusList;
        targetHealth = playerHealth;
    }

	if (subclass == "Flame"){
		//target takes minor damage every turn and takes slightly more damage - burning status
		targetStatusList.push("Burning");
	} else if (subclass == "Molten"){
		// user deals chip damge whenever attacked - molten scales status
		userStatusList.push("Molten-Scales");
	} else if (subclass == "Freeze"){
		// user attacks target for reduced damage and has a 1/2 chance to skip the target's next turn with the frozen status
		targetHealth -= ((baseDamage*2)/3);
		tmp = getRandomInt(2);
		if (tmp == 0){
			targetStatusList.push("Frozen");	
		}
	} else if (subclass == "Slow"){
		// skips the targets next turn, however, only attacks can be used against it during that turn - slow status
		targetStatusList.push("Slowed");
	} else if (subclass == "Medic"){
		// user re-gains 30 health
		userHealth += 30;
		if (userHealth > 100){
			userHealth = 100;
		}
	} else if (subclass == "Vampiric"){
		// all of user's future attacks have lifesteal - re-gain health on attack, based on percentage of attack damage
		userStatusList.push("Life-Steal");
	} else if (subclass == "Poison"){
		// target takes damage every turn - poisoned status
		targetStatusList.push("Poisoned");
	} else if (subclass == "Viral"){
		// user takes damage every turn - poisoned status, but user also gains a major damage boost - major-dmg-up status
		userStatusList.push("Poisoned");
		userStatusList.push("Major-Dmg-Up");
	} else if (subclass == "Sandstorm"){
		//target takes minor damage every turn - sandstorm status, user takes slightly less damage - minor-def-up status
		targetStatusList.push("Sandstorm");
		userStatusList.push("Minor-Def-Up");
	} else if (subclass == "Flora"){
		// target loses health, next turn user gains this health - flora status
		targetHealth -= 15;
		userStatusList.push("Flora");
	} else if (subclass == "Breeze"){
		// target and user swap all status effects
		let tmpStatusList = [...targetStatusList]; // this makes a shallow copy of list
		targetStatusList.length = 0;
		targetStatusList.push(...userStatusList);
		userStatusList.length = 0;
		userStatusList.push(...tmpStatusList);
	} else if (subclass == "Clense"){
		// target loses all positive status effects, user loses all negative status effects
		const positiveStatuses = ["Minor-Dmg-Up", "Dmg-Up", "Major-Dmg-Up", "Tmp-Major-Dmg-Up-2", "Tmp-Major-Dmg-Up-1", "Minor-Def-Up", "Def-Up", "Major-Def-Up", "Molten-Scales", "Life-Steal", "Flora"];
    	const negativeStatuses = ["Minor-Dmg-down", "Dmg-Down", "Major-Dmg-Down", "Minor-Def-Down", "Def-Down", "Major-Def-Down", "Burning", "Frozen", "Slowed", "Poisoned", "Sandstorm"];

		userStatusList = userStatusList.filter(status => !negativeStatuses.includes(status));
		targetStatusList = targetStatusList.filter(status => !positiveStatuses.includes(status));    	
	} else if (subclass == "Armour"){
		// user takes less damage - def-up
		userStatusList.push("Def-Up");
	} else if (subclass == "Blade"){
		// user deals more damage - dmg-up
		userStatusList.push("Dmg-Up");
	} else if (subclass == "Charge"){
		// user gains tmp-major-dmg-up-2, which turns into tmp-major-dmg-up-1 after attacking, then goes away after the next attack 
		userStatusList.push("Tmp-Major-Dmg-Up-2");
	} else if (subclass == "Ground"){
		// user damages target once for each status effect target has, then removes those status effects
		targetHealth -= (baseDamage * targetStatusList.length);
		targetStatusList.length = 0;
	}
	if (user === "Player") {
		playerHealth = userHealth;
		playerStatusList.splice(0, playerStatusList.length, ...userStatusList);
		enemyHealth = targetHealth;
		enemyStatusList.splice(0, enemyStatusList.length, ...targetStatusList);
	} else {
		playerHealth = targetHealth;
		playerStatusList.splice(0, playerStatusList.length, ...targetStatusList);
		enemyHealth = userHealth;
		enemyStatusList.splice(0, enemyStatusList.length, ...userStatusList);
	}	

	playerHealthGUI.innerHTML = HealthBar(playerHealth,100,50);
	enemyHealthGUI.innerHTML = HealthBar(enemyHealth,100,50);
	playerStatusGUI.innerHTML = "Status effects: " + (playerStatusList.length ? playerStatusList.join(", ") : "None");
	enemyStatusGUI.innerHTML = "Status effects: " + (enemyStatusList.length ? enemyStatusList.join(", ") : "None");
}

function playerMove(move){

	if (move === "item") {
        if (playerItemGUI.innerHTML == "no item") {
            alert("You do not have an item");
        }
    }
	let playerBaseDamage = 20;
	// go through and apply effects
	if (move == "attack"){
		enemyHealth -= playerBaseDamage;
	} else if (move == "subclass"){
		subclassEffects(playerSubclassGUI.innerHTML, "Player", playerBaseDamage);
	} else if (move == "item"){
		subclassEffects(playerItemGUI.innerHTML, "Player", playerBaseDamage);
	}
	// rand 1-3(1-2 if no item) for what the enemy will do
	// more advanced logic may be added later but is outside current sprint scope
	let enemyBaseDamage = 20;
	let enemyMove = 0;
	if (enemyItemGUI.innerHTML == "no item"){
		enemyMove = getRandomInt(2);
	} else {
		enemyMove = getRandomInt(3);
	}
	if (enemyMove == 0){
		playerHealth -= enemyBaseDamage;
	} else if (enemyMove == 1){
		subclassEffects(enemySubclassGUI.innerHTML, "Enemy", enemyBaseDamage);
	} else if (enemyMove == 2){
		subclassEffects(enemyItemGUI.innerHTML, "Enemy", enemyBaseDamage);
	}

	// check if either monster's health is below 0
	// if it isnt, show health and end turn
	// if user is, show stat screen and ask them to play again or load their save
	// if enemy is, enemy drops ([type] core), this can be turned into an item fo either of that type's subclasses 
	// e.g. Ice core can be turned into Freeze Item or Slow Item, letting the player's monster use that ability
	
	enemyHealthGUI.innerHTML = HealthBar(enemyHealth,100,50);
	playerHealthGUI.innerHTML = HealthBar(playerHealth,100,50);
}




typeGUI.classList.remove('hidden');
subclassGui.classList.add('hidden');
combatGUI.classList.add('hidden');