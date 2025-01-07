const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById("eyeIcon");


function showError(inputElement, message) {
    const errorElement = document.createElement('small');
    errorElement.textContent = message;
    errorElement.style.color = '#8D2E46';
    errorElement.classList.add('error-message');

    
    const parentElement = inputElement.closest('.form-group');
    parentElement.appendChild(errorElement);
}


function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
}

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
       
        clearErrors();

        let isValid = true;

        
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required.');
            isValid = false;
        } else {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Not a valid email.');
                isValid = false;
            }
        }

        if (passwordInput.value.trim() === '') {
            showError(passwordInput, 'Password is required.');
            isValid = false;
        }

       
        if (isValid) {
            login(emailInput.value.trim(), passwordInput.value.trim());
            window.location.href="index.html"
        }
    });

    ///////////////////////////////////////////////////////
    eyeIcon.addEventListener("click", function () {
        this.classList.toggle("fa-eye-slash");
        this.classList.toggle("fa-eye");
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    });
});


function login(email, password) {
    const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
    const user = allUsers.find(user => user.email === email && user.password === password);
   
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log("Login successful. User ID:", user.id);
        
    } else {
        showError(passwordInput, 'Invalid email or password.');
    }
}
///////////////////////////////////////////////nav//////////////////////////////////////////////////////



document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser'); 
    
    const navItems = document.querySelectorAll('nav ul>li'); 
    const loginItem = document.querySelector('li:nth-child(2)'); 
    const registerItem = document.querySelector('li:nth-child(3)'); 
    const saveItem = document.querySelector('li:nth-child(4)');
    const profileItem = document.querySelector('li:nth-child(5)'); 
    const logoutItem = document.querySelector('li:nth-child(6)'); 

    if (currentUser) {
        saveItem.classList.remove('hidden');
        profileItem.classList.remove('hidden');
        logoutItem.classList.remove('hidden');

        loginItem.classList.add('hidden');
        registerItem.classList.add('hidden');
    } else {
        loginItem.classList.remove('hidden');
        registerItem.classList.remove('hidden');

        saveItem.classList.add('hidden');
        profileItem.classList.add('hidden');
        logoutItem.classList.add('hidden');
    }


    const activeIndex = localStorage.getItem('activeNavIndex'); 
    if (activeIndex !== null) {
        navItems[activeIndex].classList.add('active');
    }
    console.log(activeIndex,"active index");
    console.log(navItems,"nav items");
    
    

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            navItems.forEach(li => li.classList.remove('active'));
            item.classList.add('active');

            localStorage.setItem('activeNavIndex', index);
        });
    });
});






