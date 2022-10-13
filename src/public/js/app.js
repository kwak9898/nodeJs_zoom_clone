const messageList = document.querySelector("ul")
const messageForm = document.querySelector("form")
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connected to Server ✅");
});

socket.addEventListener("message", async (message) => {
    if (typeof message.data === 'string') {
        console.log("New Message: ", message.data);
    } else {
        const messageText = await message.data.text();
        console.log(messageText);
    }
});

socket.addEventListener("close", () => {
    console.log("Disconnected from the Browser ❌");
});

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
}

messageForm.addEventListener("submit", handleSubmit);
