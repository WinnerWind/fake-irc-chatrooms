const ircMessages = [["Message1","Message2","Message3"],["a","b","c"],["1","2","3"]]

var ircMessageDisplay = document.getElementById("mainChat")

let lastIndex = -1; // Prevents immediate repeats.

startMessages()

async function sendNewMessage(){
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * ircMessages.length);
    } while (randomIndex === lastIndex && ircMessages.length > 1); // Ensure messages array has more than 1 item to avoid infinite loop

    const messageGroup = ircMessages[randomIndex];

    for (let messageIndex in messageGroup) {
        ircMessageDisplay.textContent += messageGroup[messageIndex]+"\n"; // Line break required for proper rendering.
        await delay(1000) //TODO Randomize this
    }

    lastIndex = randomIndex; // Update the last displayed index
}

async function startMessages() {
  await sendNewMessage() //We want to send a new message

  console.log("Function executed at:", new Date().toLocaleTimeString());

  // Generate a random delay between min (inclusive) and max (exclusive) seconds
  const minDelaySeconds = 0.1; // Minimum delay in seconds
  const maxDelaySeconds = 1; // Maximum delay in seconds

  const randomDelayMilliseconds = getRandomIndex(minDelaySeconds,maxDelaySeconds) * 1000;

  console.log("Next execution in:", randomDelayMilliseconds / 1000, "seconds");

  // Schedule the next execution
  setTimeout(startMessages, randomDelayMilliseconds);
}

function getRandomIndex(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
