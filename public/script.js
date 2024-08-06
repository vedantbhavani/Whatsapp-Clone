const socket = io('http://localhost:9000')
const messageInput = document.getElementById('messageInp')
const sendBtn = document.getElementById('sendbtn')
const allMessage = document.getElementById('allMessages')
const form = document.getElementById('send-container')
const centertext = document.querySelector('.firsttitle')

const appendchild = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    allMessage.append(messageElement)
}
// First user joined

// New user Joined
const names = prompt("Enter Your name to Join");
socket.emit('new-user-join', names);
centertext.innerHTML = `Welcome to the Chat App <b class="firsttitlename">${names}</b>`

socket.on('user-joined', (names) => {
    appendchild(`<b class="firstname">${names}</b> Joined the chat`, 'center')
    console.log("New user coming", names);
})
// User receive a message
socket.on('receive', data => {
    appendchild(`<b class="firstname">${data.name}:</b> ${data.message}`, 'left')
})

// User left the chat
socket.on('leave', name => {
    appendchild(`<b class="firstname">${name}</b> left the chat`, 'leave')
})

// User send a message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendchild(`<b class="firstname">You:</b> ${message}`, 'right')
    socket.emit('send', message)
    messageInput.value = "";
})