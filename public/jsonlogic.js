function savedata(){
    var data = {
        clickercount: clicked,
        game1value: "0",
        game3value: "0",
        game4value: "0"
        }

    var jsonData = JSON.stringify(data);

    // this code block does not work right
    var fs = require('fs');
    fs.writeFile("./savedata.txt", jsonData, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

function readdata(){
  fetch("./savedata.txt")
    .then((res) => {
      if (!res.ok) {
        throw new Error
          (`HTTP error! Status: ${res.status}`);
        }
          return res.json();
        })
        .then((data) =>
          console.log(data))
        .catch((error) =>
          console.error("Unable to fetch data:", error));
}