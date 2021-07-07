// display image before content 
window.onload = function(){
    document.querySelector('.container').style.setProperty("overflow", "unset");
  
    document.getElementById('before-load-page').style.display = 'none';
    changeImage(); 
}  


let authen = document.querySelector("#email")
let password = document.querySelector("#password")
let passwordConfirm = document.querySelector("#password-confirm")
let submit = document.querySelector("#submit")
let student = document.querySelector("#stud")
let teach = document.querySelector("#teach")
let users = document.querySelector("#users")
let signUp = document.querySelector(".sign-up")
let form = document.querySelector(".signup")
let replace = document.querySelector(".btn-already-have-account a")

let emailErr = document.querySelector("#emailErr")
let passwordErr = document.querySelector("#passwordErr")
let passwordReconfirmErr = document.querySelector("#passwordReconfirmErr")

submit.addEventListener('click', (e) => {
    e.preventDefault()

    grabValue()
})

function grabValue() {
    let emailValue = authen.value.trim()
    let passValue = password.value.trim()
    let passConfirmValue =passwordConfirm.value.trim()
    let usersValue = users.value.trim()
    
    if(emailValue == ""){
        emailErr.innerHTML = "Email cannot be blank!";
        emailErr.classList.add("email");
        authen.classList.add('warning-border');

        setTimeout(function(){
            emailErr.innerHTML = " ";
            authen.classList.remove('warning-border')
            emailErr.classList.remove("email")}, 5000);
    }
    else if(!notValidEmail(emailValue)){
        emailErr.innerHTML = "Not a valid email!"
        emailErr.classList.add("email");
        authen.classList.add('warning-border');

        setTimeout(function(){
            emailErr.innerHTML = " ";
            authen.classList.remove('warning-border');
            emailErr.classList.remove("email")}, 5000);
    }

    else if(passValue == ""){
        passwordErr.innerHTML = "Password cannot be blank!"
        passwordErr.classList.add("password")
        password.classList.add('warning-border');

        setTimeout(function(){
            passwordErr.innerHTML = " ";
            password.classList.remove('warning-border');
            passwordErr.classList.remove("password")}, 5000);
    }

    else if(passConfirmValue == ""){
        passwordReconfirmErr.innerHTML = "Password2 cannot be blank!"
        passwordReconfirmErr.classList.add("passwordconfirm")
        passwordConfirm.classList.add('warning-border');

        setTimeout(function(){
            passwordReconfirmErr.innerHTML = " ";
            passwordConfirm.classList.remove('warning-border');
            passwordReconfirmErr.classList.remove("passwordconfirm")}, 5000);
        
    } 
    else if(passValue !== passConfirmValue){
        passwordReconfirmErr.innerHTML = "Passwords does not match"
        passwordReconfirmErr.classList.add("passwordconfirm");
        passwordConfirm.classList.add('warning-border');

        setTimeout(function(){
            passwordReconfirmErr.innerHTML = " ";
            passwordConfirm.classList.remove('warning-border');
            passwordReconfirmErr.classList.remove("passwordconfirm")}, 5000);
    }

    
    else{
        // Making a POST request to the API
    fetch('https://dapphome.herokuapp.com/api/register', {
        method: 'POST',
        body: JSON.stringify({
            email: emailValue,
            password: passValue,
            password_confirmation: passValue,
            role: usersValue
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json'
        },
    })
    .then((response) => response.json())
    .then((message) => {
        // sending the return fetch data to the localStorage
        localStorage.setItem('value', JSON.stringify(message))

        // Creating a success message to be displayed on the screen
        // let createNew = document.createElement("div")
        // const newContent = document.createTextNode("Sign up successful!! tap on login to proceed")
        // createNew.appendChild(newContent)
        // form.appendChild(createNew)
        // createNew.classList.add("move")

        const successMessage = document.querySelector('.success-signup-box');
        successMessage.classList.remove('remove-message');
        successMessage.classList.add('animation-intro');
        authen.value = "";
        password.value = '';
        passwordConfirm.value = '';  
        // Replace the button for already have account
        // replace.innerHTML = "Login"
    

        let getItem = localStorage.getItem('value')
        let anArray = JSON.parse(getItem)
        console.log(anArray.user.role)
        console.log(anArray.user.email)
        console.log(anArray.user.updated_at)
        console.log(anArray.user.created_at)
        console.log(anArray.user.id)
        console.log(anArray.user.token)
        console.log(getItem);

    })
    // Checking if there is an error
    .catch(error => {
        console.error('Error:', error);
    });
    }
}

// Check if email is accurate
function notValidEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// animation controller
// window.onload = function (){
//     changeImage();
// }
setInterval(() => {
    changeImage();
}, 45000);

const firstImg = document.querySelector('.img-1');
const secondImg = document.querySelector('.img-2');
const thirdImg = document.querySelector('.img-3');
const line = document.querySelector('.slide-line');

const changeImage = function(){
    // at first time
    firstImg.classList.remove('translateForward');
    firstImg.classList.add('translateNormal');
    secondImg.classList.remove('translateBackward');
    secondImg.classList.add('translateForward');
    thirdImg.classList.remove('translateNormal');
    thirdImg.classList.add('translateBackward');
    line.classList.remove('slide-three');
    line.classList.add('slide-one');

    // second time
    setTimeout(() => {
        firstImg.classList.remove('translateNormal');
        firstImg.classList.add('translateBackward');
        secondImg.classList.remove('translateForward');
        secondImg.classList.add('translateNormal');
        thirdImg.classList.remove('translateBackward');
        thirdImg.classList.add('translateForward');
        line.classList.remove('slide-one');
        line.classList.add('slide-two');
    }, 15000);

     // third time
     setTimeout(() => {
        firstImg.classList.add('translateForward');
        firstImg.classList.remove('.translateBackward');
        secondImg.classList.remove('translateNormal');
        secondImg.classList.add('translateBackward');
        thirdImg.classList.remove('translateForward');
        thirdImg.classList.add('translateNormal');
        line.classList.remove('slide-two');
        line.classList.add('slide-three');       
    }, 30000);

}
// slid animation controller
// remove success box event and function controller
document.querySelector('.remove-success-box-icon').addEventListener('click', function(){
    const successMessage = document.querySelector('.success-signup-box');
    successMessage.classList.add('remove-message');
    successMessage.classList.remove('animation-intro');
})