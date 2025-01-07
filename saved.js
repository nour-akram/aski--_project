// Function to find the username by userId
function getUsername(userId, users) {
    const user = users.find(user => user.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "Unknown User";
  }
  
  
  // Function to render saved questions
  function renderSavedQuestions() {
    console.log("Rendering saved questions...");
  
    const savedQuestionsContainer = document.getElementById("saved-questions-container");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const allUsers = JSON.parse(localStorage.getItem("allUsers"));
  
    
    const savedQuestions = currentUser.savedQuestions;
  
    if (savedQuestions.length === 0) {
      console.log("No saved questions found.");
      savedQuestionsContainer.innerHTML = `
        <div id="no-saved">
          <img src="no-saved-questions.jpg" alt="No Saved Questions" />
          <p>No saved questions yet.</p>
        </div>
      `;
    } else {
      console.log("Saved questions found:", savedQuestions);
      savedQuestions.forEach(question => {
        const username = getUsername(question.userId, allUsers);
        const questionElement = document.createElement("div");
        questionElement.classList.add("saved-question");
  
        questionElement.innerHTML = `
          <h3>${question.title}</h3>
          <p>${question.content}</p>
          <p><strong>Posted by:</strong> ${username}</p>
          <p><strong>Likes:</strong> ${question.votes}</p>
          <div class="tags">${question.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
        `;
  
        savedQuestionsContainer.appendChild(questionElement);
      });
    }
  }
    
  renderSavedQuestions()
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
document.addEventListener("DOMContentLoaded", () => {
  
  document.querySelectorAll("ul>li").forEach(function(ele){
      ele.classList.remove("active");
  })
  // document.querySelectorAll("ul>li")[0].classList.add("active");
  
  // console.log(document.querySelectorAll("ul>li")[0],document.querySelectorAll("ul>li")[1]);
  
  const currentUser = localStorage.getItem("currentUser");

  const navItems = document.querySelectorAll("nav ul>li");
  const loginItem = document.querySelector("li:nth-child(2)");
  const registerItem = document.querySelector("li:nth-child(3)");
  const saveItem = document.querySelector("li:nth-child(4)");
  const profileItem = document.querySelector("li:nth-child(5)");
  const logoutItem = document.querySelector("li:nth-child(6)");

  

  if (currentUser) {
    saveItem.classList.remove("hidden");
    profileItem.classList.remove("hidden");
    logoutItem.classList.remove("hidden");

    loginItem.classList.add("hidden");
    registerItem.classList.add("hidden");

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

 

});