const signUpForm = document.querySelector("#signUpForm");
const signInBtn = document.querySelector("#signInBtn");
const signUpBtn = document.querySelector("#signUpBtn");
const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
const password = document.querySelector("#password");
const userBranch = document.querySelector("#userBranch");
const userRole = document.querySelector("#userRole");


signInBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    //navigating to login page  as sign in button is clicked
    window.location.href = '/'

})

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let userInfo = {
        userName: userName.value,
        userEmail: userEmail.value,
        password: password.value,
        userBranch: userBranch.value,
        userRole: userRole.value,
    }

    if (userName.value && userEmail.value && password.value) {
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }

        let data = await fetch('/createAccount', options);
        let response = await data.json();
        alert(response.message)

        if (data.ok) {

            window.location.href = '/'
        }

    }

})

