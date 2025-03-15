const playerTypeGUI = document.querySelector('#player-type');
const playerSubclassGUI = document.querySelector('#player-subclass');
const playerItemGUI = document.querySelector('#player-item');
const playerHealthGUI = document.querySelector('#player-health');
const playerimageGUI = document.querySelector('#player-image');

const enemyTypeGUI = document.querySelector('#enemy-type');
const enemySubclassGUI = document.querySelector('#enemy-subclass');
const enemyItemGUI = document.querySelector('#enemy-item');
const enemyHealthGUI = document.querySelector('#enemy-health');
const enemyImageGUI = document.querySelector('#enemy-image');

const combatGUI = document.querySelector('#game-3-combat');

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

let Types = ["Fire", "Ice", "Healer", "Poison", "Ground", "Flying", "Steel", "Electric"]
let subclasses = ["Flame", "Molten", "Freeze", "Slow", "Medic", "Vamiric", "Venom", "Viral", "Sandstorm", "Flora", "Breeze", "Clense", "Armour", "Blade", "Grounded", "Charge"];
// items are the equivelant of a craftable second subclass
// Type 1 can access subclass 1 and 2, Type 2 can access subclass 3 and 3, ect
