const socket = io('http://localhost:3000');
const msgBox = document.getElementById('exampleFormControlTextarea1');
const msgCont = document.getElementById('data-container');
const email = document.getElementById('email');
 
const messages = [];
function getMessages() {
 fetch('http://localhost:3002/api/chat')
   .then((response) => response.json())
   .then((data) => {
     loadDate(data);
     data.forEach((el) => {
       messages.push(el);
     });
   })
   .catch((err) => console.error(err));
}
getMessages();
 
msgBox.addEventListener('keydown', (e) => {
 if (e.keyCode === 13) {
   sendMessage({ email: email.value, text: e.target.value });
   e.target.value = '';
 }
});
 
function loadDate(data) {
 let messages = '';
 data.map((message) => {
   messages += ` <li class="bg-primary p-2 rounded mb-2 text-light">
      <span class="fw-bolder">${message.email}</span>
      ${message.text}
    </li>`;
 });
 msgCont.innerHTML = messages;
}
 
function sendMessage(message) {
 socket.emit('sendMessage', message);
}
socket.on('recMessage', (message) => {
 messages.push(message);
 loadDate(messages);
})