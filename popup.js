document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("questionForm");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const tagInput = document.getElementById("tagInput");
  const tagBox = document.getElementById("tagBox");

  const titleError = document.getElementById("titleError");
  const contentError = document.getElementById("contentError");
  const tagsError = document.getElementById("tagsError");

  const tags = [];

  // Handle tag addition
  tagInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tag = tagInput.value.trim();
      if (tag && !tags.includes(tag)) {
        tags.push(tag);
        renderTags();
        tagInput.value = "";
        tagsError.textContent = "";
      }
    }
  });

  // Render tags in the tag box
  function renderTags() {
    tagBox.innerHTML = "";
    tags.forEach((tag, index) => {
      const tagElement = document.createElement("div");
      tagElement.className = "tag";
      tagElement.innerHTML = `${tag} <i class="fa-solid fa-times" data-index="${index}"></i>`;
      tagBox.appendChild(tagElement);
    });

    // Add event listeners to remove tags
    document.querySelectorAll(".tag i").forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        tags.splice(index, 1);
        renderTags();
      });
    });
  }

  // Format the time as "X time ago"
  function formatTimeAgo(createdAt) {
      const now = new Date();
      const timeDifference = now - new Date(createdAt);
      
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) {
          return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
      } else if (minutes < 60) {
          return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      } else if (hours < 24) {
          return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
      } else {
          return `${days} day${days !== 1 ? 's' : ''} ago`;
      }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    if (titleInput.value.length === 0) {
      titleError.textContent = "Title is required";
      isValid = false;
    } else if (titleInput.value.trim().length < 3) {
      titleError.textContent = "Title must be at least 3 characters long.";
      isValid = false;
    } else {
      titleError.textContent = "";
    }

    if (contentInput.value.length === 0) {
      contentError.textContent = "Content field is required";
      isValid = false;
    } else if (contentInput.value.trim().length < 15) {
      contentError.textContent = "Content must be at least 15 characters long.";
      isValid = false;
    } else {
      contentError.textContent = "";
    }

    if (tags.length === 0) {
      tagsError.textContent = "You must add at least one tag.";
      isValid = false;
    } else {
      tagsError.textContent = "";
    }

    if (isValid) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const userId = currentUser ? currentUser.id : null;

      // Get the current time and format it using the formatTimeAgo function
      // const createdAt = new Date();
      // const formattedTime = formatTimeAgo(createdAt);

      const question = {
        id: Date.now(), 
        title: titleInput.value.trim(),
        content: contentInput.value.trim(),
        tags: [...tags],
        saved: false,
        userId: userId,
        createdAt: new Date(),
        votes: 0,
        answers: [],
      };

      saveQuestionToLocalStorage(question);

      // alert("Question posted successfully!");
      form.reset();
      tags.length = 0;
      renderTags();
      window.location.href = "index.html";
    }
  });

  function saveQuestionToLocalStorage(question) {
    const allQuestions = JSON.parse(localStorage.getItem("allQuestions")) || [];
    allQuestions.push(question);
    localStorage.setItem("allQuestions", JSON.stringify(allQuestions));
    console.log("Saved question to localStorage:", allQuestions);
  }
});

  //////////////////////////////////////////////////////////////////////////////////
  
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

  // document.querySelector(".filter-box>span").classList.add("active")
  // sortNewest();

});
