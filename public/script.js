const socket = io('http://localhost:9000')
const messageInput = document.getElementById('messageInp')
const sendBtn = document.getElementById('sendbtn')
const allMessage = document.getElementById('allMessages')
const form = document.getElementById('send-container')
const centertext = document.querySelector('.center')

// Harry sir
// New user generated

const appendchild = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    allMessage.append(messageElement)
}

const names = prompt("Enter Your name to Join");
socket.emit('new-user-join', names);
socket.emit('diconnect')

centertext.innerHTML = `Welcome to the Chat App <b class="firstname">${names}</b>`

socket.on('user-joined', (names) => {
    appendchild(`<b class="firstname">${names}</b> Joined the chat`, 'center')
    console.log("New user coming", names);
})

socket.on('receive', data => {
    appendchild(`${data.name}: ${data.message}`, 'left')
})

socket.on('leave', name => {
    appendchild(`<b class="firstname">${name}</b> left the chat`, 'leave')
})

// Message sending
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendchild(`You : ${message}`, 'right')
    socket.emit('send', message)
    messageInput.value = "";
})