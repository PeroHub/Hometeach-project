
let createAcctBtn = document.querySelector("button"),
    loginBtn = document.querySelector("form > input"),
    userRole = document.querySelector(".userRole select"),
    userEmail  = document.querySelector(".userEmail input"),
    userPassword = document.querySelector(".userPassword input"),
    passVisibility = document.querySelector(".userPassword i"),
    userLoginDetails,
    userProfileDetails;

/************      Login Click   ****************/
loginBtn.addEventListener("click", function(e) {
    if(userRole.value && userEmail.value && userPassword.value) {
        e.preventDefault();
        userLoginDetails = {
            "email" : userEmail.value, 
            "password" : userPassword.value,
            "role": userRole.value
        }
        getUserData();
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
    let response = await fetch(/**URL from backend goes here**/);
    let userData = await response.json();

    /*  Get Current User Data Using The Filter Method and Store in a Variable */
    userProfileDetails = userData.filter((user) => {
        return userEmail.value == user.email && userRole.value == user.role;
    })
    if(userProfileDetails.length < 1) {
        alert("User not found!")
    }
}

