
var password = document.getElementById("passwordd");
var confirm_pass = document.getElementById("confirm_password");
var err_pass = document.getElementById("errormsgepassword");
var err_con_pass = document.getElementById("errormsgconfirmpassword");
function submittpass(event) {
    event.preventDefault(); 
    var pass = password.value;
    var con_pass = confirm_pass.value;
    var erorflag=false;
    var validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (pass.length ===0) {
        err_pass.textContent = "password is required"; 
        erorflag=true; 
    }
    else if (!validPassword.test(pass)) {
        err_pass.textContent = "password must be strong contain at least one special character and one upper letter and at least 8 char";
        erorflag=true; 
    } else {
        err_pass.textContent = ""; 
        erorflag=false; 

    }
    if (con_pass == "") {
        err_con_pass.textContent = "password is required"; 
        erorflag=true; 
    }
    else if (pass !== con_pass) {
        err_con_pass.textContent = "confirm password must match password field";
        erorflag = true;
    }
     else {
        err_con_pass.textContent = ""; 
        erorflag=false; 

    }
   console.log(pass,"hiiiiiiiii",con_pass);
   
    if (!erorflag) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        currentUser.password = pass;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        window.location.href = "registerpage3.html";    
     }

}

////////////////////////////////////////////////////////////////

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


/////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    let userlogin =localStorage.getItem("loggin")
    
    const navItems = document.querySelectorAll('nav ul>li'); 
    const loginItem = document.querySelector('li:nth-child(2)'); 
    const registerItem = document.querySelector('li:nth-child(3)'); 
    const saveItem = document.querySelector('li:nth-child(4)');
    const profileItem = document.querySelector('li:nth-child(5)'); 
    const logoutItem = document.querySelector('li:nth-child(6)'); 

    if (userlogin===true) {
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
