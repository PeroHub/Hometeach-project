// display image before content 
window.onload = function(){
    document.querySelector('.container').style.setProperty("overflow", "unset");
  
    document.getElementById('before-load-page').style.display = 'none'} 

let createAcctBtn = document.querySelector("button"),
    loginBtn = document.querySelector("form > button"),
    userRole = document.querySelector(".userRole select"),
    userEmail  = document.querySelector(".userEmail input"),
    userPassword = document.querySelector(".userPassword input"),
    passVisibility = document.querySelector(".userPassword i"),
    userLoginDetails,
    userProfileDetails;


    // createAcctBtn.addEventListener('click', () => {
    //     // e.preventDefault()
    //     storageLocal()
    // })

    // function storageLocal() {
    //     let loginEmail = userEmail.value.trim()
    //     let loginPassword = userPassword.value.trim()
    //     let getEmail = window.localStorage.setItem('email', emailValue)
    //     let getPass = window.localStorage.setItem('passwordconfirm', passConfirmValue)

    //     if(getEmail === loginEmail && getPass === loginPassword){
    //         alert("Correct input")
    //         console.log(`${loginEmail} and ${loginPassword}`)
    //     }
    // }

/************      Login Click   ****************/
loginBtn.addEventListener("click", function(e) {
    if(userRole.value && userEmail.value && userPassword.value) {
        e.preventDefault();
        userLoginDetails = {
            "email" : userEmail.value, 
            "password" : userPassword.value,
            "role": userRole.value
        }
        // console.log(userLoginDetails);
        getUserData(userLoginDetails);
    }
})

/*************  Password Visibility      *******************/
passVisibility.addEventListener("click", function() {
    if (this.getAttribute("class") == "far fa-eye-slash") {
        this.setAttribute("class", "far fa-eye")
        userPassword.setAttribute("type", "text")
    }
    else if (this.getAttribute("class") == "far fa-eye") {
        this.setAttribute("class", "far fa-eye-slash")
        userPassword.setAttribute("type", "password")
    }
})

/*************  Fetch All Users Data From The Backend ****************/
const getUserData = async () => {
    let response = await fetch("https://dapphome.herokuapp.com/api/login", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials:"same-origin",
        body: JSON.stringify(userLoginDetails)
    });
    let userData = await response.json();
    // console.log(userData);



    //if wrong user or wrong credentials signs in
    if (userData.message == "wrong credentials") {
        alert(`Wrong Credentials`);
        let redirectPage = () => {
            window.location.href = "./loginPage.html";
        };
        redirectPage();
    }

    /*  Get Current User Data Using The Find Method and Store in a Variable */

    let userArray = [];
    userArray.push(userData);


    userProfileDetails = userArray.find((user) => {
        console.log(user.user);
        return  user.user.email == userEmail.value &&  user.user.role == userRole.value;
    })
    console.log(userProfileDetails);
    if(userProfileDetails == {} || userProfileDetails == undefined ) {
        alert("User not found!")
    } else if(userProfileDetails.user.role == 'student') {
        // alert(`Successfully signed in as ${userProfileDetails.user.role}`.toUpperCase());
        let redirectPage = () => {
            window.location.href = "./std-homepage.html";
        };
        redirectPage();
    } else if(userProfileDetails.user.role == 'teacher') {
        // alert(`Successfully signed in as ${userProfileDetails.user.role}`.toUpperCase());
        let redirectPage = () => {
            window.location.href = "./teacher-homepage.html";
        };
        redirectPage();
    } else if (userProfileDetails.user.role != userRole.value) {
        alert(`User is registered as a ${userProfileDetails.user.role}`);
    }
    
}



// testing pusrpose

document.querySelector('.login-link').addEventListener('click', function(e){
    // e.preventDefault();

    const check = document.querySelector('.login-option-page').value;
    const directLink = document.querySelector('.login-link');

    if(check == 'student'){
        directLink.setAttribute('href', './std-homepage.html');
    }
    else if(check == 'teacher'){
        directLink.setAttribute('href', './teacher-homepage.html');
    }
    else{
        directLink.setAttribute('href', '#');
    }
})