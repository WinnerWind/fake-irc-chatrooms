var ircMessages = [] //Fill this from fetchMessages()
var ircMessageDisplay = document.getElementById("mainChat")
let lastIndex = -1; // Prevents immediate repeats.

fetchMessages()
startMessages()

async function sendNewMessage(){
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * ircMessages.length);
    } while (randomIndex === lastIndex && ircMessages.length > 1); // Ensure messages array has more than 1 item to avoid infinite loop

    const messageGroup = ircMessages[randomIndex];

    for (let messageIndex in messageGroup) {
        const newMessageDiv = document.createElement("div");
        newMessageDiv.textContent = messageGroup[messageIndex];
        ircMessageDisplay.insertBefore(newMessageDiv, ircMessageDisplay.firstChild);
        // Formula master :
        // Finds the amount of time it should take for a good typist to type the message by doing length of text divided by 10
        // adds a random delay between 0.5 and 2 seconds
        // adds an extra delay between 0 and 1 seconds.
        var delayBetweenMessages = (messageGroup[messageIndex].length/10)+(getRandomIndex(2,5)*1000)+(Math.random()*1000)
        await delay(delayBetweenMessages)
    }

    lastIndex = randomIndex; // Update the last displayed index
}

async function startMessages() {
  await sendNewMessage() //We want to send a new message

  // Generate a random delay between min (inclusive) and max (exclusive) seconds
  const minDelaySeconds = 0.1; // Minimum delay in seconds
  const maxDelaySeconds = 1; // Maximum delay in seconds

  const randomDelayMilliseconds = getRandomIndex(minDelaySeconds,maxDelaySeconds) * 1000;

  // Schedule the next execution
  setTimeout(startMessages, randomDelayMilliseconds);
}

async function fetchMessages() {
  var indexResponse = await fetch('messages/index.txt')
  var messageFilesRaw = await indexResponse.text() //Allow loading text messages from index.txt
  var messageFiles = messageFilesRaw.split('\n').filter(line => line.trim().length > 0)
  for (let file of messageFiles){
    try {
      const response = await fetch('messages/'+file);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const text = await response.text();
      ircMessages.push(text.split('\n').filter(line => line.trim().length > 0)); // Split and filter empty lines
    } catch (error) {
      console.error("Error loading messages:", error, file);
    }
  }
}

function getRandomIndex(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
