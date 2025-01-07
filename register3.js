const interestInput = document.getElementById('interest_input');
const alltags = document.querySelector('.alltags');
const registerButton = document.getElementById('next');
const errInterestMsg = document.getElementById("errmsginterest");
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const interests = [];
let imageUrl = "";


interestInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const addedInterest = interestInput.value.trim();

        if (addedInterest && !interests.includes(addedInterest)) {
            interests.push(addedInterest);
            createTag(addedInterest);
        }

        interestInput.value = '';
    }
});

function createTag(text) {
    const tag = document.createElement('div');
    tag.classList.add('tag');
    tag.textContent = text;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'x';
    closeButton.addEventListener('click', () => {
        const index = interests.indexOf(text);
        if (index > -1) {
            interests.splice(index, 1);
        }
        alltags.removeChild(tag); 
    });

    tag.appendChild(closeButton);
    alltags.appendChild(tag); 
}

uploadButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            imageUrl = event.target.result; 
            console.log("Image URL:", imageUrl);
        };

        reader.readAsDataURL(file);
    }
});


registerButton.addEventListener('click', (event) => {
    event.preventDefault();

    var allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
    var currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

    const emailExists = allUsers.some(user => user.email === currentUser.email);

    if (interests.length === 0 ) {
        errInterestMsg.textContent = "It must be at least one interest.";
    } else if(emailExists){
        errInterestMsg.textContent = "Email is already registered.";
    }
    else {
        errInterestMsg.textContent = "";  
        var currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        currentUser.interests = interests; 
        currentUser.imageUrl = imageUrl;  
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

       
        allUsers.push(currentUser); 
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        console.log("Registration complete:", currentUser);
        localStorage.setItem("loggin",true)
        window.location.href = "./index.html";
    }
});
////////////////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', () => {
    // const currentUser = localStorage.getItem('currentUser'); 
    let userlogin = localStorage.getItem("loggin")
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

