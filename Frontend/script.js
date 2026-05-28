const BASE_URL = "http://job-portal-project-iv0v.onrender.com";

// =========================
// POPUP MESSAGE
// =========================

function showError(message){

    const error =
        document.getElementById("errorMessage");

    error.style.display = "block";

    error.innerText = message;

    setTimeout(() => {

        error.style.display = "none";

    }, 3000);
}

function showSuccess(message){

    const success =
        document.getElementById("successMessage");

    success.style.display = "block";

    success.innerText = message;

    setTimeout(() => {

        success.style.display = "none";

    }, 3000);
}

// =========================
// REGISTER VALIDATION
// =========================

function validateRegister(
    name,
    email,
    password,
    confirmPassword
){

    const emailPattern =
        /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    const passwordPattern =
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&+=]{6,}$/;

    if(name.trim() === ""){

        showError("Name is required");

        return false;
    }

    if(!emailPattern.test(email)){

        showError("Enter valid email");

        return false;
    }

    if(!passwordPattern.test(password)){

        showError(
            "Password must contain minimum 6 characters, one letter and one number"
        );

        return false;
    }

    if(password !== confirmPassword){

        showError("Passwords do not match");

        return false;
    }

    return true;
}

// =========================
// REGISTER
// =========================

async function register(){

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if(
        !validateRegister(
            name,
            email,
            password,
            confirmPassword
        )
    ){
        return;
    }

    const user = {
        name,
        email,
        password
    };

    try{

        const response = await fetch(
            `${BASE_URL}/auth/register`,
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(user)
            }
        );

        const message =
            await response.text();

        if(message === "Registration successful"){

            showSuccess(
                "Account created successfully"
            );

            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 1500);

        }else{

            showError(message);
        }

    }catch(error){

        console.log(error);

        showError("Registration failed");
    }
}

// =========================
// LOGIN VALIDATION
// =========================

function validateLogin(email, password){

    if(email.trim() === ""){

        showError("Email is required");

        return false;
    }

    if(password.trim() === ""){

        showError("Password is required");

        return false;
    }

    return true;
}

// =========================
// LOGIN
// =========================

async function login(){

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    if(!validateLogin(email, password)){

        return;
    }

    try{

        const response = await fetch(
            `${BASE_URL}/auth/login`,
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    email,
                    password
                })
            }
        );

        if(!response.ok){

            showError(
                "Invalid email or password"
            );

            return;
        }

        const user =
            await response.json();

        localStorage.setItem(
            "userId",
            user.id
        );

        localStorage.setItem(
            "role",
            user.role
        );

        localStorage.setItem(
            "userName",
            user.name
        );

        showSuccess("Login Successful");

        setTimeout(() => {

            if(user.role === "ADMIN"){

                window.location.href =
                    "admin.html";

            }else{

                window.location.href =
                    "user.html";
            }

        }, 1500);

    }catch(error){

        console.log(error);

        showError("Login Failed");
    }
}