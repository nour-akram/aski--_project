var fnamee = document.getElementById("fname");
var lnamee = document.getElementById("lname");
var emaill = document.getElementById("emaill");
var errorMessageFname = document.getElementById("errorMessageFname");
var errorMessageLname = document.getElementById("errorMessageLname");
var errorMessageEmail = document.getElementById("errorMessageEmail");
function onsubmitted(event) {
    event.preventDefault(); 
    var erorflag=false;
    var name=fnamee.value;
 var ls_name=lnamee.value;
 var mail=emaill.value;
 
    if (name == "") {
        errorMessageFname.textContent = "First name is required"; 
        erorflag=true; 
    } else if (name.length < 3) {
        errorMessageFname.textContent = "First name length must be more than 3"; 
        erorflag=true; 
    } else {
        errorMessageFname.textContent = ""; 
        erorflag=false; 

    }
    if (ls_name == "") {
        errorMessageLname.textContent = "last name is required";  
        erorflag=true; 

    } else if (ls_name.length < 3) {
        errorMessageLname.textContent = "last name length must be more than 3"; 
        erorflag=true; 
 
    } else {
        errorMessageLname.textContent = ""; 
        erorflag=false; 

    }

    var vaildemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (mail == "") {
        errorMessageEmail.textContent = "Email is required";
        erorflag = true;
    }  if(!vaildemail.test(mail)){
        errorMessageEmail.textContent = "please write valid email";
        erorflag = true;
         }else {
        errorMessageEmail.textContent = "";
        erorflag=false;
    }


    function generateUniqueId() {
        return 'user-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    }
    
    if (!erorflag) {
        var currentUser = {
            id: generateUniqueId(),
            firstName: name,
            lastName: ls_name,
            email: mail
        };

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem("loggin",false)
        window.location.href = "registerpage2.html";
    }
}


//////////////////////////////////////////////////////////////////////////////




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
