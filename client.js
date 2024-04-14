const socket=io('http://localhost:8000');
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector('.container');
const naam=prompt("Enter your name");
var music=new Audio("../pikachu.mp3");
socket.emit("new-user-joined",naam);
const append=(message,position)=>
{
 const messageElement=document.createElement('div');
 messageElement.innerText=message;
 messageElement.classList.add('message');
 messageElement.classList.add(position);
 messageContainer.append(messageElement);
 if(position=="left")
 music.play();
}
socket.on('user-joined',name=>{
    append(`${name} join the chat`,'green');
});
form.addEventListener('submit',(e)=>
{
    
    e.preventDefault();
    const message=messageInput.value ;
    if(message=="")
    alert("First !! Enter the message");
    else
    {
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";
    }

});

socket.on('receive',data=>{
    append(`${data.name} : ${data.message}`,'left');
});
socket.on('left',naam=>
{
    append(`${naam} left the chat`,'leave')
});
