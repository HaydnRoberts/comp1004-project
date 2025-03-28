function saveData(){
    var data = {
        // values for the clicker game
        clicks: clicks,
        total_clicks: total_clicks,
        autoClicks: autoClicks,
        bonusClicks: bonusClicks,
        debtValue: debtValue,
        // values for the maze game
        score: score,
        maze: maze,
        // values for turn based combat game
        playerScore: playerScore,
        playerMonster: playerMonster,
        playerItemList: playerItemList
        }

    // make the data JSON
    const jsonData = JSON.stringify(data, null, 2);

    // as I can't use node for this, I resorted to usign blobs to store the data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // this creates an anchor element(a link) to the file where the JSON element is stored using a URL
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);

    //then we set the filename for when it's downloaded
    a.download = 'saveData.json';

    // make this new anchor a child of the main page
    document.body.appendChild(a);

    // now the file will be downloaded as the download click is stimulated
    a.click()

    //remove the anchor so the file isn't re-downloaded
    document.body.removeChild(a);

    console.log("Saved the data to saveData.json");
}

// event listener for when the user selects a file
document.getElementById("loadFileInput").addEventListener("change", function(event) {
    // get the elements needed for this function
    const file = event.target.files[0];
    const fileNameDisplay = document.getElementById("fileName");
    const loadButton = document.getElementById("loadButton");

    // this is to stop the user from pressing the button if no file has been selected
    if (file) {
        fileNameDisplay.textContent = file.name;
        loadButton.disabled = false;
    } else {
        fileNameDisplay.textContent = "No file selected";
        loadButton.disabled = true;
    }
});

function loadSaveData(event){
    const fileInput = document.getElementById("loadFileInput");

    // turn the file into a variable:
    const file = fileInput.files[0];

    // exit function if no file was selected
    if (!file) return;

    // create a Javascript FileReader
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            // save the file data as a variable by parsing it
            const jsonData = JSON.parse(e.target.result);

            // values for clicker game
            clicks = jsonData.clicks;
            total_clicks = jsonData.total_clicks;
            autoClicks = jsonData.autoClicks;
            bonusClicks = jsonData.bonusClicks;
            debtValue = jsonData.debtValue;
            // values for maze game
            score = jsonData.score;
            maze = jsonData.maze;
            // vaues for turn based combat game
            playerScore = jsonData.playerScore;
            playerMonster = jsonData.playerMonster;
            playerItemList = jsonData.playerItemList;
            
            console.log("Loaded the data from a saveData.json");
            
            // make sure everything looks right after loading the save
            loadClickerGame();
            renderMaze();
            loadInventory();
            showLoadedMonster();
            
            alert("Your Save Data has been restored, have fun");
        // standard error checking just incase the wrong file type is entered or something unexpected goes wrong
        } catch (error) {
            console.error(error);
            alert("Please only enter save files form this website");
        }
    };
    // this is what will trigger the onload event, therefore running the function above
    reader.readAsText(file);

   
}