const socket=io('https://i-chat-server.herokuapp.com/');

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInput');
const messageContainer=document.querySelector(".container")

const append =(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

}
const name1 = prompt("Enter Your name to join");
socket.emit('new-user-joined',name1);


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})

socket.on('user-joined', name =>{
    append(`${name} : joined the chat`,'mid')
})

socket.on('receive', data =>{
    append(` ${data.name} : ${data.message} `,'left')
})
socket.on('left', data =>{
    append(` ${data} : left the chat `,'mid')
})
