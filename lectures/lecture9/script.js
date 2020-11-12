// let myP = document.getElementById("myP");
// myP.innerHTML = 'I have been changed';

// let myBtnTwo = document.getElementById("myBtnTwo");
// let myErrorDiv = document.getElementById("error");
// let myDivBtn = document.getElementById("divBtn");
// let divContainer = document.getElementById("container");
// let myUl = document.getElementById("list");

// function btnClick() {
//     if (myP.className == 'myClassOne') {
//         myP.className = 'myClassTwo';
//         myP.innerHTML = "I am now classTwo";
//     } else {
//         myP.className = 'myClassOne';
//         myP.innerHTML = "I am now classOne";
//     }
// }

// myBtnTwo.addEventListener('click', () => {
//     myErrorDiv.hidden = !myErrorDiv.hidden;
// });

// myDivBtn.addEventListener('click', () => {
//     let newP = document.createElement('p');
//     newP.innerHTML = "I'm another P tag";
//     divContainer.appendChild(newP);
// });

// function addItem() {
//     let li = document.createElement('li');
//     li.innerHTML = 'I am a new item';
//     myUl.appendChild(li);
// }

let myForm = document.getElementById('myForm');
let textInput = document.getElementById('text_input');
let errorDiv = document.getElementById('error');
let myUl = document.getElementById('list');
let formLabel = document.getElementById("formLabel");

if (myForm) {
    myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (textInput.value) {
            errorDiv.hidden = true;
            formLabel.className = 'blackText';
            let li = document.createElement("li");
            li.innerHTML = textInput.value;
            myUl.appendChild(li);
            myForm.reset ();
            textInput.focus();
        } else {
            errorDiv.hidden=false;
            errorDiv.innerHTML = "You must enter a value";
            formLabel.className = 'error';
            textInput.focus();
        }
    });
}