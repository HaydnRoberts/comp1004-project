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
const inventoryGUI = document.querySelector('#game-3-inventory');

const combatButtons = document.querySelector('#game-3-combat-buttons');
const combatLossButtons = document.querySelector('#game-3-loss-buttons');
const combatWinButtons = document.querySelector('#game-3-win-buttons');

const scoreBox = document.querySelector('#scoreBox');

// this is a box to tell the user what just happened, as without this, the game would be very confusing
const whatJustHappenedBox = document.querySelector('#what-just-happened-box');

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

function chooseType(value){
	playerMonster[0] = Types[value];
	tmp = value;

	subclassChoice0.innerHTML = subclasses[tmp*2];
	subclassChoice1.innerHTML = subclasses[(tmp*2)+1];
	
	battleIcon(value ,"player");
	// this flips the player's icon so that it is facing the opposing monster
	//playerImageGUI.style.transform = playerImageGUI.style.transform === 'scaleX(-1)' ? 'scaleX(1)' : 'scaleX(-1)';
	
	typeGUI.classList.add('hidden');
	subclassGui.classList.remove('hidden');
}
function subclass(value){
	playerMonster[1] = subclasses[((tmp*2)+value)];

	playerTypeGUI.innerHTML = playerMonster[0];
	playerSubclassGUI.innerHTML = playerMonster[1];
	playerItemGUI.innerHTML = "no item";
	playerStatusGUI.innerHTML = "Status effects: None";
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
	enemyStatusGUI.innerHTML = "Status effects: None";
}

// in previous versions of the game, the same status could be applied multiple times which turned the game into spamming attack boosts or defence boosts as they were multiplicative
// this lead to unfun gameplay, so I added this function to only push statuses if they do not already exist on the target/user
function addUniqueStatus(statusList, status) {
	if (!statusList.includes(status)) {
		statusList.push(status);
	}
} 

// this function is for subclass moves, it commonly gives out status effects which are executed in later functions
// for readability and my own sanity I have commented what each move does
function subclassEffects(subclass, user, damage){
	let targetStatusList, targetHealth, userStatusList, userHealth, target;

    if (user === "Player") {
		target = "Enemy";
        userStatusList = playerStatusList;
        userHealth = playerHealth;
		targetStatusList = enemyStatusList;
        targetHealth = enemyHealth;
    } else if (user === "Enemy") {
		target = "Player";
		userStatusList = enemyStatusList;
        userHealth = enemyHealth;
        targetStatusList = playerStatusList;
        targetHealth = playerHealth;
    }

	if (subclass == "Flame"){
		//target takes minor damage every turn and takes slightly more damage - burning status
		addUniqueStatus(targetStatusList, "Burning");
        addUniqueStatus(targetStatusList, "Minor-Def-Down");
		whatJustHappened("The " + user + " sets the " + target + " aflame, making it take constant damage and be more succeptable to future damage");
	} else if (subclass == "Molten"){
		// user deals chip damge whenever attacked - molten scales status
		addUniqueStatus(userStatusList, "Molten-Scales");
		whatJustHappened("The " + user + " imbues its scales with molten lava that will harm any who attack it");
	} else if (subclass == "Freeze"){
		// user attacks target for reduced damage and has a 1/2 chance to skip the target's next turn with the frozen status
		applyOffensiveEffects(user);
		applyDefensiveEffects(target);
		targetHealth -= (damage / 2);
		whatJustHappened("The " + user + " attacks with blunt ice attacks, dealing " + (damage/2) + " damage and accumulating frost that may freeze the " + target);
		// this was changed to a 1 in 3 chace due to being too strong
		tmp = getRandomInt(3);
		if (tmp == 0){
			addUniqueStatus(targetStatusList, "Frozen");	
		}
	} else if (subclass == "Slow"){
		// skips the targets next turn, however, only regular attacks can be used against it during that turn - slow status
		// I later changed this to not allowing another ice move
		addUniqueStatus(targetStatusList, "Slowed");
		whatJustHappened("The " + user + " slows its opponent");
	} else if (subclass == "Medic"){
		// user re-gains 20 health
		userHealth += 20;
		if (userHealth > 100){
			userHealth = 100;
		}
		whatJustHappened("The " + user + " heals 20 health");
	} else if (subclass == "Vampiric"){
		// all of user's future attacks have lifesteal - re-gain health on attack, based on percentage of attack damage
		addUniqueStatus(userStatusList, "Life-Steal");
		whatJustHappened("The " + user + " forfiets its ancient blood tie and leans into the life-stealing power it had attained");
	} else if (subclass == "Venom"){
		// target takes damage every turn - poisoned status
		addUniqueStatus(targetStatusList, "Poisoned");
		whatJustHappened("The " + user + " poisoned the " + target);
	} else if (subclass == "Viral"){
		// user takes damage every turn - poisoned status, but user also gains a major damage boost - major-dmg-up status
		addUniqueStatus(userStatusList, "Poisoned");
        addUniqueStatus(userStatusList, "Major-Dmg-Up");
		whatJustHappened("The " + user + "'s immune system shuts down, utilising all it's power into this fight");
	} else if (subclass == "Sandstorm"){
		//target takes minor damage every turn - sandstorm status, user takes slightly less damage - minor-def-up status
		addUniqueStatus(targetStatusList, "Sandstorm");
        addUniqueStatus(userStatusList, "Minor-Def-Up");
		whatJustHappened("The " + user + " summoned a sandstorm");
	} else if (subclass == "Flora"){
		// target loses health, next turn user gains this health - flora status
		addUniqueStatus(userStatusList, "Flora");
		whatJustHappened("The " + user + " called upon the flora");
	} else if (subclass == "Breeze"){
		// target and user swap all status effects
		let tmpStatusList = [...targetStatusList]; // this makes a shallow copy of list
		targetStatusList.length = 0;
		targetStatusList.push(...userStatusList);
		userStatusList.length = 0;
		userStatusList.push(...tmpStatusList);
		whatJustHappened("The " + user + " swapped all status");
	} else if (subclass == "Clense"){
		// target loses all positive status effects, user loses all negative status effects
		const positiveStatuses = ["Minor-Dmg-Up", "Dmg-Up", "Major-Dmg-Up", "Tmp-Major-Dmg-Up-2", "Tmp-Major-Dmg-Up-1", "Minor-Def-Up", "Def-Up", "Major-Def-Up", "Molten-Scales", "Life-Steal", "Flora"];
    	const negativeStatuses = ["Minor-Dmg-down", "Dmg-Down", "Major-Dmg-Down", "Minor-Def-Down", "Def-Down", "Major-Def-Down", "Burning", "Frozen", "Slowed", "Poisoned", "Sandstorm"];

		// finding this formulae for removing the correct statuses was more difficult than expected, next time I will probably just use a for loop, despite it being less effiecient
		userStatusList.splice(0, userStatusList.length, ...userStatusList.filter(status => !negativeStatuses.includes(status)));	
		targetStatusList.splice(0, targetStatusList.length, ...targetStatusList.filter(status => !positiveStatuses.includes(status)));
		whatJustHappened("The " + user + " removed all its negative status and  all of the  " + target + "'s positive status");
	} else if (subclass == "Armour"){
		// user takes less damage - def-up
		whatJustHappened("The " + user + " infused itself with a metal carapace, giving it a defence boost");
		addUniqueStatus(userStatusList, "Def-Up");
	} else if (subclass == "Blade"){
		// user deals more damage - dmg-up
		whatJustHappened("The " + user + " infused itself with a metal blade, giving them a damage boost");
		addUniqueStatus(userStatusList, "Dmg-Up");
	} else if (subclass == "Charge"){
		// user gains tmp-major-dmg-up-2, which turns into tmp-major-dmg-up-1 after attacking, then goes away after the next attack 
		whatJustHappened("The " + user + " charged up a temporary damage boost");
		addUniqueStatus(userStatusList, "Tmp-Major-Dmg-Up-2");
	} else if (subclass == "Grounded"){
		// user damages target once for each status effect target has, then removes those status effects
		applyOffensiveEffects(user);
		applyDefensiveEffects(target);
		targetHealth -= (damage * targetStatusList.length);
		targetStatusList.length = 0;
		whatJustHappened("The " + user + " grounded its target dealing  " + damage + " damage for each status it had, before removing them");
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


// these status execution functions is structured similarly to the function that applys statuses as I found that logic to already be robust, therefore using similar logic would be useful
function applyEveryTurnEffects(target, damage) {
    let targetStatusList, targetHealth;

    if (target === "Player") {
        targetStatusList = playerStatusList;
        targetHealth = playerHealth;
		opponentHealth = enemyHealth;
    } else if (target === "Enemy") {
        targetStatusList = enemyStatusList;
        targetHealth = enemyHealth;
		opponentHealth = playerHealth;
    }

    targetStatusList.forEach(status => {
        if (status === "Burning") {
            targetHealth -= (damage/4);
			whatJustHappened("The " + target + " took " + (damage/4) + " damage from Burning");
        } else if (status === "Poisoned") {
            targetHealth -= (damage/2);
			whatJustHappened("The " + target + " took " + (damage/2) + " damage from being Poisoned");
		} else if (status === "Sandstorm") {
            targetHealth -= (damage/4);
			whatJustHappened("The " + target + " took " + (damage/4) + " damage from the Sandstorm");
        } else if (status === "Flora") {
            
			// flora needs to be seperated so that it will not work unintentionally if both monsters use it
            if (target === "Enemy") {
				opponentHealth -= (enemyBaseDamage/4)*3;
				whatJustHappened("Your monster was hurt by the flora and took " + ((enemyBaseDamage/4)*3) + " damage which the Flora is now storing");
                enemyFloraHealing += (enemyBaseDamage/4)*3;
            } else {
				opponentHealth -= (playerBaseDamage/4)*3;
				whatJustHappened("The enemy was hurt by the flora and took " + ((playerBaseDamage/4)*3) + " damage which the Flora is now storing");
                playerFloraHealing += (playerBaseDamage/4)*3;
            }
        }
    });

    if (target === "Player") {
        playerHealth = targetHealth;
		enemyHealth = opponentHealth;
    } else {
        enemyHealth = targetHealth;
		playerHealth = opponentHealth;
    }
}

function applyDefensiveEffects(target) {
    let targetStatusList, targetHealth, reducedDamage;

    if (target === "Player") {
        targetStatusList = playerStatusList;
        targetHealth = playerHealth;
		reducedDamage = enemyBaseDamage;
    } else if (target === "Enemy") {
        targetStatusList = enemyStatusList;
        targetHealth = enemyHealth;
		reducedDamage = playerBaseDamage;
    }

    targetStatusList.forEach(status => {
        if (status === "Minor-Def-Up") {
            reducedDamage *= 0.85;
        } else if (status === "Def-Up") {
            reducedDamage *= 0.7;
        } else if (status === "Major-Def-Up") {
            reducedDamage *= 0.55;
        } else if (status === "Minor-Def-Down") {
            reducedDamage *= 1.15;
        } else if (status === "Def-Down") {
            reducedDamage *= 1.3;
        } else if (status === "Major-Def-Down") {
            reducedDamage *= 1.45;
        } else  if (status === "Molten-Scales") {
            if (target === "Player") {
				whatJustHappened("The enemy was hurt by your monster's Molten-Scales and recieved " + (playerBaseDamage/3) + " damage");
                enemyHealth -= (playerBaseDamage/3);
            } else {
                playerHealth -= (enemyBaseDamage/3);
				whatJustHappened("Your monster was hurt by the enemy's Molten-Scales and recieved " + (playerBaseDamage/3) + " damage");
            }
        }
    });

    if (target === "Player") {
        playerHealth = targetHealth;
		enemyBaseDamage = reducedDamage;
    } else {
        enemyHealth = targetHealth;
		playerBaseDamage = reducedDamage;
    }
}

function applyOffensiveEffects(attacker) {
    let attackerStatusList, attackerHealth, modifiedDamage;
    

    if (attacker === "Player") {
        attackerStatusList = playerStatusList;
        attackerHealth = playerHealth;
		modifiedDamage = playerBaseDamage;
    } else {
        attackerStatusList = enemyStatusList;
        attackerHealth = enemyHealth;
		modifiedDamage = enemyBaseDamage;
    }
	
    
	attackerStatusList.forEach(status => {
        if (status === "Minor-Dmg-Up") {
            modifiedDamage *= 1.25;
        } else if (status === "Dmg-Up") {
            modifiedDamage *= 1.5;
        } else if (status === "Major-Dmg-Up") {
            modifiedDamage *= 1.75;
        } else if (status === "Minor-Dmg-Down") {
            modifiedDamage *= 0.85;
        } else if (status === "Dmg-Down") {
            modifiedDamage *= 0.7;
        } else if (status === "Major-Dmg-Down") {
            modifiedDamage *= 0.55;
        }else if (status === "Tmp-Major-Dmg-Up-1") {
            modifiedDamage *= 1.75;
            attackerStatusList.splice(attackerStatusList.indexOf("Tmp-Major-Dmg-Up-1"), 1);
        } else if (status === "Tmp-Major-Dmg-Up-2") {
            modifiedDamage *= 1.75;
            attackerStatusList.splice(attackerStatusList.indexOf("Tmp-Major-Dmg-Up-2"), 1);
            attackerStatusList.push("Tmp-Major-Dmg-Up-1");
        } else if (status === "Life-Steal") {
            attackerHealth += modifiedDamage * 0.3;
			whatJustHappened("The attacker had Life-Steal and healed " + (modifiedDamage * 0.4) + " health");
        } 
    });

    if (attacker === "Player") {
		playerHealth = attackerHealth;
		playerBaseDamage = modifiedDamage;
	} else {
		enemyHealth = attackerHealth;
		enemyBaseDamage = modifiedDamage;
	}
	
}


function checkTurnSkip(target) {
    let targetStatusList;

    if (target === "Player") {
        targetStatusList = playerStatusList;
    } else {
        targetStatusList = enemyStatusList;
    }


    if (targetStatusList.includes("Frozen")) {
        targetStatusList.splice(targetStatusList.indexOf("Frozen"), 1);
		// after testing, I found freeze to be the strongest subclass by far, so I decided to implement the same thing as slow, to limit its power
        if (target === "Player") {
			enemyIceMovesAllowed = 0;
		} else {
			playerIceMovesAllowed = 0;
		}
		return "frozenSkip";
    } else if (targetStatusList.includes("Slowed")) {
        targetStatusList.splice(targetStatusList.indexOf("Slowed"), 1);
        if (target === "Player") {
			enemyIceMovesAllowed = 0;
		} else {
			playerIceMovesAllowed = 0;
		}
		return "slowSkip";
    }

	if (target === "Player") {
		enemyIceMovesAllowed = 1;
	} else {
		playerIceMovesAllowed = 1;
	}
    return "regularTurn";
}

// this function checks if either side has flora and if they do, then it is applied
function checkFloraHealing(target) {
	if (playerStatusList.includes("Flora") && target == "Player") {
		playerStatusList.splice(playerStatusList.indexOf("Flora"), 1);
		if (playerFloraHealing < 10){
			// this is so that if a breeze takes the flora buff, then they will still benefit
			playerFloraHealing = 10;
		}
		playerHealth += playerFloraHealing;
		if (playerHealth > 100){
			playerHealth = 100;
		}
		whatJustHappened("Your monster consumed the flora and healed " + playerFloraHealing + " health");
		// I experimented with making the flora attack do less damage but the healing to stack(not get reset therefore continually climbing) however this was far too strong of an effect 
		playerFloraHealing = 0;
	}
	if (enemyStatusList.includes("Flora") && target == "Enemy") {
		enemyStatusList.splice(enemyStatusList.indexOf("Flora"), 1);
		if (enemyFloraHealing < 10){
			// this is so that if a breeze takes the flora buff, then they will still benefit
			enemyFloraHealing = 10;
		}
		enemyHealth += enemyFloraHealing;
		if (enemyHealth > 100){
			enemyHealth = 100;
		}
		whatJustHappened("The enemy consumed the flora and healed " + enemyFloraHealing + " health");
		enemyFloraHealing = 0;
	}
}

// removes the locked state placed over the button during initialisation
// to save time and help me work out the logic, I made this into a function despite it 
function unlockItem(itemName) {
	// every time the function is run, this will be a different button based on the parameters used, this is great :)
	const button = document.querySelector(`.inventory-item[data-item="${itemName}"]`);
	if (button) {
		// removes the overlay that shows the item as locked
	    button.classList.remove("opacity-50", "pointer-events-none", "relative");
	    button.querySelector("div")?.remove();
		// and of course, you need to be able to click the button again
	    button.disabled = false;
		whatJustHappened("You unlocked  the " + itemName + " Item, you can now equip it in your inventory");
	}
}

// this function is essentailly where the game's combat plays out
function playerMove(move){
	// to stop players from wasting a turn by trying to use an item they do not have
	if (move === "item") {
        if (playerItemGUI.innerHTML == "no item") {
            whatJustHappened("You do not have an item, please use a different move.");
			return;
        }
    }
	
	// player's turn
	let playerTurnState = checkTurnSkip("Player");
	if (playerTurnState == "frozenSkip" || playerTurnState == "slowSkip"){
		whatJustHappened("Your turn has been skipped due to your monster being Frozen or Slowed");
	} else {
		
		checkFloraHealing("Player");
		playerBaseDamage = 15;
		// go through and apply effects
		if (move == "attack"){
			applyOffensiveEffects("Player");
			applyDefensiveEffects("Enemy");
			enemyHealth -= playerBaseDamage;
			whatJustHappened("You attacked the enemy and dealt " + playerBaseDamage + " Damage, reducing it to " + enemyHealth + " Health");
		} else if (move == "subclass" && (playerIceMovesAllowed == 1 || (playerSubclassGUI.innerHTML != "Freeze" && playerSubclassGUI.innerHTML != "Slow"))){
			subclassEffects(playerSubclassGUI.innerHTML, "Player", playerBaseDamage);
		} else if (move == "item" && (playerIceMovesAllowed == 1 || (playerItemGUI.innerHTML != "Freeze" && playerItemGUI.innerHTML != "Slow"))){
			subclassEffects(playerItemGUI.innerHTML, "Player", playerBaseDamage);
		}	
	}
	applyEveryTurnEffects("Player",enemyBaseDamage);
	
	// enemy's turn
	let enemyTurnState = checkTurnSkip("Enemy");
	if (enemyTurnState == "frozenSkip" || enemyTurnState == "slowSkip"){
		whatJustHappened("The enemy's turn has been skipped due to it being Frozen or Slowed (you can only use regular attacks on it for the next turn)");
	} else {
		checkFloraHealing("Enemy");

		enemyBaseDamage = 15;
		let enemyMove = 0;
		// rand 1-3(1-2 if no item) for what the enemy will do
		// more advanced logic may be added later but is outside current sprint scope
		if (enemyIceMovesAllowed == 0){
			enemyMove = 0;	
		}else if (enemyItemGUI.innerHTML == "no item"){
			enemyMove = getRandomInt(2);
		} else {
			enemyMove = getRandomInt(3);
		}
		if (enemyMove == 0){
			applyOffensiveEffects("Enemy");
			applyDefensiveEffects("Player");
			playerHealth -= enemyBaseDamage;
			whatJustHappened("The enemy attacked you and dealt " + enemyBaseDamage + " Damage, reducing your monster to " + playerHealth + " Health");
		} else if (enemyMove == 1){
			subclassEffects(enemySubclassGUI.innerHTML, "Enemy", enemyBaseDamage);
		} else if (enemyMove == 2){
			subclassEffects(enemyItemGUI.innerHTML, "Enemy", enemyBaseDamage);
		}
	}
	applyEveryTurnEffects("Enemy",playerBaseDamage);
	// check if either monster's health is below 0
	// if it isnt, show health and end turn
	// if user is, show stat screen and ask them to play again or load their save
	// if enemy is, enemy drops ([type] core), this can be turned into an item fo either of that type's subclasses 
	// e.g. Ice core can be turned into Freeze Item or Slow Item, letting the player's monster use that ability

	if(playerHealth <= 0){
		whatJustHappened("Your monster was defeated");
		combatButtons.classList.add('hidden');
		combatLossButtons.classList.remove('hidden');
	} else if(enemyHealth <= 0){
		whatJustHappened("The Enemy was defeated");
		unlockItem(enemySubclassGUI.innerHTML);
		combatButtons.classList.add('hidden');
		combatWinButtons.classList.remove('hidden');
		playerScore += 1;
		scoreBox.innerHTML = "Score: " + playerScore;
	}

	
	enemyHealthGUI.innerHTML = HealthBar(enemyHealth,100,50);
	playerHealthGUI.innerHTML = HealthBar(playerHealth,100,50);
	playerStatusGUI.innerHTML = "Status effects: " + (playerStatusList.length ? playerStatusList.join(", ") : "None");
	enemyStatusGUI.innerHTML = "Status effects: " + (enemyStatusList.length ? enemyStatusList.join(", ") : "None");
}

function showInventory(){
	combatGUI.classList.add('hidden');
	inventoryGUI.classList.remove('hidden');
}

function closeInventory(){
	combatGUI.classList.remove('hidden');
	inventoryGUI.classList.add('hidden');
}

// locks all the inventory items so that the player will have to unlock them by killing their associated monster.
document.addEventListener("DOMContentLoaded", () => {

	document.querySelectorAll(".inventory-item").forEach(button => {
		const itemName = button.dataset.item;

		if (!playerItemList.includes(itemName)) {
			// the locked state looks like they are faded out and will have a padlock emoji covering them
			button.classList.add("opacity-50", "pointer-events-none", "relative");
			button.innerHTML += `<div class="absolute inset-0 flex items-center justify-center text-2xl font-bold">🔒</div>`;
			button.disabled = true;
		}
	});
});

// when the user clicks an item in their inventory, this will equip it onto their monster
function equipItem(itemName) {
	const button = document.querySelector(`.inventory-item[data-item="${itemName}"]`);
	if (button && !button.disabled) {
		playerMonster[2] = itemName;
		playerItemGUI.innerHTML = itemName;
		whatJustHappened("You equipped " + itemName + " Item");
		closeInventory();
	}
}



// logic for the waht just happened carosel to only show the 6 most recent events
function whatJustHappened(newString) {
    history.push(newString);
    if (history.length > 6) {
        history.shift();
    }
    whatJustHappenedBox.innerHTML = history.join('<hr>');
}

// score should only be reset if the player loses and clicks retry and should be be saved alongside your monster and inventory:
let playerScore = 0;
scoreBox.innerHTML = "Score: " + playerScore;
// I am moving all the global variables here so that I can arrange them into functions for retrying or facing a new monster
let history = [];
let Types = ["Fire", "Ice", "Healer", "Poison", "Ground", "Flying", "Metal", "Electric"];
let subclasses = ["Flame", "Molten", "Freeze", "Slow", "Medic", "Vampiric", "Venom", "Viral", "Sandstorm", "Flora", "Breeze", "Clense", "Armour", "Blade", "Grounded", "Charge"];
// items are the equivelant of a craftable second subclass
// Type 1 can access subclass 1 and 2, Type 2 can access subclass 3 and 3, ect

let playerHealth = 100;
let enemyHealth = 100;

let playerMonster = ['','','']; // 0 is type, 1 is subclass, 2 is chosen item
let playerItemList = [];
let playerStatusList = [];
let enemyStatusList = [];
let tmp = 0;

// these are for the flora healing status, so that the player cant use the enemys flora ect ect
let playerFloraHealing = 0;
let enemyFloraHealing = 0;

// I needed a way to stop either side from using subclass moves on slowed opponents, as stated in the description of the slowed status
let playerIceMovesAllowed = 1;
let enemyIceMovesAllowed = 1;

// initialising these variables as global
let playerBaseDamage = 0;
let enemyBaseDamage = 0;

combatButtons.classList.remove('hidden');
combatLossButtons.classList.add('hidden');
combatWinButtons.classList.add('hidden');

typeGUI.classList.remove('hidden');
subclassGui.classList.add('hidden');
combatGUI.classList.add('hidden');
inventoryGUI.classList.add('hidden');


function retry(){
	playerScore = 0;
	scoreBox.innerHTML = "Score: " + playerScore;
	
	playerHealth = 100;
	enemyHealth = 100;

	playerMonster = ['','','']; // 0 is type, 1 is subclass, 2 is chosen item
	playerItemList = [];
	document.querySelectorAll(".inventory-item").forEach(button => {
		const itemName = button.dataset.item;

		if (!playerItemList.includes(itemName)) {
			// the locked state looks like they are faded out and will have a padlock emoji covering them
			button.classList.add("opacity-50", "pointer-events-none", "relative");
			button.innerHTML += `<div class="absolute inset-0 flex items-center justify-center text-2xl font-bold">🔒</div>`;
			button.disabled = true;
		}
	});
	playerStatusList = [];
	enemyStatusList = [];
	playerFloraHealing = 0;
	enemyFloraHealing = 0;
	playerIceMovesAllowed = 1;
	enemyIceMovesAllowed = 1;
	playerBaseDamage = 0;
    enemyBaseDamage = 0;

	combatButtons.classList.remove('hidden');
	combatLossButtons.classList.add('hidden');
	combatWinButtons.classList.add('hidden');

	typeGUI.classList.remove('hidden');
	subclassGui.classList.add('hidden');
	combatGUI.classList.add('hidden');
	inventoryGUI.classList.add('hidden');

	whatJustHappened("The last fight didn't go so well, lets hope this one is better");
}

function nextEnemy(){
	playerHealth = 100;
	enemyHealth = 100;
	playerStatusList = [];
	enemyStatusList = [];
	playerFloraHealing = 0;
	enemyFloraHealing = 0;
	playerIceMovesAllowed = 1;
	enemyIceMovesAllowed = 1;
	playerBaseDamage = 0;
    enemyBaseDamage = 0;

	playerTypeGUI.innerHTML = playerMonster[0];
	playerSubclassGUI.innerHTML = playerMonster[1];
	playerItemGUI.innerHTML = playerMonster[2];
	playerStatusGUI.innerHTML = "Status effects: None";
	playerHealthGUI.innerHTML = HealthBar(playerHealth,100,50);

	generateRandomOpponent();
	let itemModifier= getRandomInt(16);
	enemyItemGUI.innerHTML = subclasses[itemModifier];

	combatButtons.classList.remove('hidden');
	combatLossButtons.classList.add('hidden');
	combatWinButtons.classList.add('hidden');

	combatGUI.classList.remove('hidden');
	typeGUI.classList.add('hidden');
	subclassGui.classList.add('hidden');
	inventoryGUI.classList.add('hidden');
	
	whatJustHappened("You face a new enemy, defeat it, just like the last");
}