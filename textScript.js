const ircMessages = ["Message1","Message2","Message3"]

var ircMessageDisplay = document.getElementById("mainChat")

let lastIndex = -1; // Prevents immediate repeats.

function sendNewMessage(){
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * ircMessages.length);
    } while (randomIndex === lastIndex && ircMessages.length > 1); // Ensure messages array has more than 1 item to avoid infinite loop

    const message = ircMessages[randomIndex];
    ircMessageDisplay.textContent += message;
    lastIndex = randomIndex; // Update the last displayed index
}
