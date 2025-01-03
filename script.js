
const xhr = new XMLHttpRequest();

xhr.open("GET", "./Data.json", true);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const jsonData = JSON.parse(xhr.responseText);
     console.log(jsonData);
     
      if(jsonData.users && jsonData.questions){
        addUsersToAllUsers(jsonData.users);
        addQuestionsToAllQuestions(jsonData.questions)
      }
    
  }
};

xhr.send();


function addUsersToAllUsers(newUsers) {
  const existingAllUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
  const updatedAllUsers = mergeUsers(existingAllUsers, newUsers);
  localStorage.setItem("allUsers", JSON.stringify(updatedAllUsers));
  console.log("Updated allUsers stored in localStorage:", updatedAllUsers);
}

function addQuestionsToAllQuestions(newQuestion) {
  const existingAllQuestions = JSON.parse(localStorage.getItem("allQuestions")) || [];
  const updatedAllQuestions = mergeUsers(existingAllQuestions, newQuestion);
  localStorage.setItem("allQuestions", JSON.stringify(updatedAllQuestions));
  console.log("Updated allQuestions stored in localStorage:", updatedAllQuestions);
}

function mergeUsers(existing, newUsers) {
  const existingIds = new Set(existing.map((e) => e.id)); 
  const uniqueNewUsers = newUsers.filter((user) => !existingIds.has(user.id)); 
  return [...existing, ...uniqueNewUsers]; 
}

function getAllUsers() {
  const data = localStorage.getItem("allUsers");
  if (data) {
    return JSON.parse(data);
  } else {
    console.error("No allUsers found in localStorage.");
    return [];
  }
}

function getAllQuestions() {
  const questions = localStorage.getItem("allQuestions");
  if (questions) {
    return JSON.parse(questions);
  } else {
    console.error("No qustions found in localStorage.");
    return [];
  }
}

// function loadData() {
//   const allUsers = getAllUsers(); 
//   const allQuestions=getAllQuestions();

//   if (allUsers && allQuestions) {
//     return {
//       users: allUsers, 
//       questions: allQuestions,
//     };
//   } else {
//     console.error("No questions found in localStorage or appData.");
//     return { users: allUsers, questions: [] }; 
//   }
// }



function getUsername(userId, users) {
  const user = users.find((user) => user.id === userId);
  console.log(users);
  
  return user ? user.firstName+"_"+user.lastName : "Unknown";
}


function showQuestions(questions, users) {
  const container = document.getElementById("question-box");
  container.innerHTML = "";

  questions.forEach((question) => {
    const username = getUsername(question.userId, users); 
    document.getElementById("numberOfQuestions").innerText = questions.length;
    const questionElement = document.createElement("div");
    questionElement.classList.add("question-content");
    questionElement.id = "question-content";
    const tagsHtml = question.tags
      ? question.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")
      : "";

    questionElement.innerHTML = `
      <div class="vote-answers">
        <p><span>${question.votes}</span> Votes</p>
        <p><span>${question.answers.length}</span> Answers</p>
      </div>
      <div class="question-items">
        <h2>${question.title}</h2>
        <p>
        ${question.content}
        </p>
        <div class="tags-and-user-data">
          <div class="tags">${tagsHtml}</div>
          <div class="question-user-data">
            <i class="fa-solid fa-user"></i><span>${username}</span>
            <i class="fa-regular fa-clock"></i> <span>${question.createdAt}</span>
          </div>
        </div>
      </div>`;
    container.appendChild(questionElement);
  });
}

function displayData() {
  // const data = loadData();
  showQuestions(getAllQuestions(), getAllUsers());
}

displayData();


document.querySelectorAll("ul>li").forEach(function(ele){
  console.log(ele);
    ele.classList.remove("active");
})
document.querySelectorAll("ul>li")[0].classList.add("active");

document.addEventListener("DOMContentLoaded", () => {
  
  document.querySelectorAll("ul>li").forEach(function(ele){
    console.log(ele);
      ele.classList.remove("active");
  })
  document.querySelectorAll("ul>li")[0].classList.add("active");
  
  console.log(document.querySelectorAll("ul>li"));
  
  const currentUser = localStorage.getItem("currentUser");

  const navItems = document.querySelectorAll("nav ul>li");
  const loginItem = document.querySelector("li:nth-child(2)");
  const registerItem = document.querySelector("li:nth-child(3)");
  const saveItem = document.querySelector("li:nth-child(4)");
  const profileItem = document.querySelector("li:nth-child(5)");
  const logoutItem = document.querySelector("li:nth-child(6)");

  let btn = document.getElementById("btn");

  if (currentUser) {
    saveItem.classList.remove("hidden");
    profileItem.classList.remove("hidden");
    logoutItem.classList.remove("hidden");

    loginItem.classList.add("hidden");
    registerItem.classList.add("hidden");

    btn.style.display = "block";
  } else {
    loginItem.classList.remove("hidden");
    registerItem.classList.remove("hidden");

    saveItem.classList.add("hidden");
    profileItem.classList.add("hidden");
    logoutItem.classList.add("hidden");
    btn.style.display = "none";
  }

  const activeIndex = localStorage.getItem("activeNavIndex");
  if (activeIndex !== null) {
    navItems[activeIndex].classList.add("active");
  }
  // console.log(activeIndex, "active index");
  // console.log(navItems, "nav items");

  navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      navItems.forEach((li) => li.classList.remove("active"));
      item.classList.add("active");

      localStorage.setItem("activeNavIndex", index);
    });
  });

  document.querySelector(".filter-box>span").classList.add("active")
  sortNewest();

});


document.addEventListener("DOMContentLoaded", () => {
  const allUsers = getAllUsers();
  console.log("All users from localStorage:", allUsers);
});

/////////////////////////////////////////////for popup of add question///////////////////////////////////

document.getElementById("btn").addEventListener("click",function(){
   window.location.href="./popup.html"
})
////////////////////////////////////////////////////////////////////////////////////////////////////////
const filterBox = document.querySelectorAll(".filter-box>span");
function sortNewest() {
  
  // getAllQuestions().forEach((e)=>{console.log(parseInt(e.createdAt));});
  
  const sortedQuestions = getAllQuestions().sort((a, b) => new Date(parseInt(a.createdAt)) - new Date(parseInt(b.createdAt)));
  console.log(sortNewest,"sortednewest");
  
  showQuestions(sortedQuestions,getAllUsers());
}


function sortHighestVotes() {
  const sortedQuestions = getAllQuestions().sort((a, b) => b.votes - a.votes);
  showQuestions(sortedQuestions,getAllUsers());
}


function showUnanswered() {
  const unansweredQuestions = getAllQuestions().filter(question => question.answers.length === 0);
  showQuestions(unansweredQuestions,getAllUsers());
}
filterBox.forEach((ele)=>{
  ele.addEventListener("click",()=>{
    filterBox.forEach((e)=>{e.classList.remove("active")})
    if (ele.dataset.sort === "newest") {
      ele.classList.add("active")
      sortNewest();
      console.log("newsest");
    } else if (ele.dataset.sort === "highestVotes") {
      ele.classList.add("active")
      sortHighestVotes();
    } else if (ele.dataset.sort === "unanswered") {
      ele.classList.add("active")
      showUnanswered();
    }
  })
})




showQuestions(getAllQuestions(),getAllUsers());