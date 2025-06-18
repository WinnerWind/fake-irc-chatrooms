const ircMessages = ["Message1","Message2","Message3"]

var ircMessageDisplay = document.getElementById("mainChat")

let lastIndex = -1; // Prevents immediate repeats.

startMessages()

function sendNewMessage(){
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * ircMessages.length);
    } while (randomIndex === lastIndex && ircMessages.length > 1); // Ensure messages array has more than 1 item to avoid infinite loop

    const message = ircMessages[randomIndex];
    ircMessageDisplay.textContent += message+"\n"; // Line break required for proper rendering.
    lastIndex = randomIndex; // Update the last displayed index
}

function startMessages() {
  sendNewMessage() //We want to send a new message

  console.log("Function executed at:", new Date().toLocaleTimeString());

  // Generate a random delay between min (inclusive) and max (exclusive) seconds
  const minDelaySeconds = 0.1; // Minimum delay in seconds
  const maxDelaySeconds = 1; // Maximum delay in seconds

  const randomDelayMilliseconds = Math.floor(Math.random() * (maxDelaySeconds - minDelaySeconds + 1) + minDelaySeconds) * 1000;

  console.log("Next execution in:", randomDelayMilliseconds / 1000, "seconds");

  // Schedule the next execution
  setTimeout(runRandomly, randomDelayMilliseconds);
}
