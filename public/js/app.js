// Fetch api is a browser based API(i.e can't used in backend side)
// console.log("Client side js is loaded!");
// fetch('http://localhost:3000/weather?address=!').then((response) => {
// response.json().then((data) => {
// if (data.error) {
// console.log(data.error)
// } else {
// console.log(data.address)
// console.log(data.weather.condition)
// }
// })
// })

const weatherform= document.querySelector('form');
const search= document.querySelector('input');
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');

// messageOne.textContent="Feom src/app.js"
// messageOne.textContent=""
// messageTwo.textContent=""



weatherform.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location=search.value;
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
response.json().then((data) => {
if (data.error) {
    messageOne.textContent=""
messageTwo.textContent=""
    messageOne.textContent=data.error;
} else {
// console.log(data.address)
// console.log(data.weather.condition)
messageOne.textContent=""
messageTwo.textContent=""
    messageOne.textContent=data.address;
    messageTwo.textContent=`The weather is ${data.weather.temperature} and the weather condition is ${data.weather.condition}`;
}
})
})
})


