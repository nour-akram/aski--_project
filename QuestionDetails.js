document.addEventListener("DOMContentLoaded", () => {
  // Navigation logic
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
  }

  const activeIndex = localStorage.getItem("activeNavIndex");
  if (activeIndex !== null) {
    navItems.forEach((li) => li.classList.remove("active"));
    navItems[activeIndex].classList.add("active");
  }

  navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      navItems.forEach((li) => li.classList.remove("active"));
      item.classList.add("active");

      localStorage.setItem("activeNavIndex", index);
    });
  });
});
  // /////////////////////////////////////////////////////////////////////////////
  const currentQuestionDetails = JSON.parse(localStorage.getItem("currentQuestion"));
  console.log(currentQuestionDetails);
  document.addEventListener("DOMContentLoaded", () => {
    if (currentQuestionDetails) {
        document.getElementById("question-title").textContent = currentQuestionDetails.title;
        document.querySelector("#content > p").textContent = currentQuestionDetails.content;
        document.getElementById("noOfVotes").textContent=currentQuestionDetails.votes
        
        const tagsContainer = document.getElementById("tags");
        currentQuestionDetails.tags.forEach((tag, i) => {
            const div = document.createElement("div");
            div.id = `tag-${i}`;
            div.textContent = tag;
            tagsContainer.appendChild(div);
        });

       
        const allUsers = JSON.parse(localStorage.getItem("allUsers"));
        let userInfo = getUsername(currentQuestionDetails.userId,allUsers)
        if (userInfo) {
            document.getElementById("username").textContent = userInfo;
        }

        
        const timeDifferenceElement = document.querySelector(".time-difference");
        if (timeDifferenceElement) {
            timeDifferenceElement.setAttribute("data-created-at", currentQuestionDetails.createdAt);
            updateTimeDifferences();
        }

        
    }
});

///////////////////////////////////////////////////////////////////////
function getUsername(userId, allusers) {
  const user = allusers.find((user) => user.id === userId);
  return user ? user.firstName+"_"+user.lastName : "Unknown";
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function formatTimeDifference(timestamp) {
  const date = new Date(timestamp);
  const currentDate = new Date();

  const timeDifference = currentDate - date;
  const totalSeconds = Math.floor(timeDifference / 1000);

  const months = Math.floor(totalSeconds / (30.44 * 24 * 3600));
  const daysLeftAfterMonths = totalSeconds % (30.44 * 24 * 3600);
  const days = Math.floor(daysLeftAfterMonths / (24 * 3600)); 
  const hours = Math.floor((daysLeftAfterMonths % (24 * 3600)) / 3600);
  const minutes = Math.floor((daysLeftAfterMonths % 3600) / 60); 
  const seconds = daysLeftAfterMonths % 60; 

  if (months > 0) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
}



function updateTimeDifferences() {
  const timeElements = document.querySelectorAll(".time, .time-difference");
  setInterval(() => {
    timeElements.forEach((element) => {
      const createdAt = element.dataset.createdAt;
      if (createdAt) {
        const formattedTime = formatTimeDifference(createdAt);
        element.textContent = formattedTime;
      }
    });
  }, 1000);
}



///////////////////////////handelIncreament votes///////////
let increament = document.getElementById("increament");
let decreament = document.getElementById("decreament");
let voteCountElement = document.getElementById("noOfVotes");
/////////////////
let increamentAnswer = document.getElementById("increamentanswer");
let decreamentAnswer = document.getElementById("decreamentanswer");
let voteCountElementAnswer = document.getElementById("noOfVotesAnswer");
///////////////////////////////////////////incre decre votes question/////////////////////////////////////////////
let allQuestions = JSON.parse(localStorage.getItem("allQuestions")) || [];
let currentQuestionToUpdate = allQuestions.find((question) => question.id === currentQuestionDetails.id);

increament.addEventListener("click", function () {
  const questionId = currentQuestionDetails.id;
  const incrementClickedKey = `incrementClicked-${questionId}`;
  const decrementClickedKey = `decrementClicked-${questionId}`;

  const incrementClicked = localStorage.getItem(incrementClickedKey) === "true";
  const decrementClicked = localStorage.getItem(decrementClickedKey) === "true";
  const wasClicked = this.classList.toggle("clicked");

  if (wasClicked && !incrementClicked) {
    currentQuestionDetails.votes++;
    localStorage.setItem(incrementClickedKey, "true");
    localStorage.setItem(decrementClickedKey, "false");
    decreament.classList.remove("clicked");
  }
   else if (!wasClicked && incrementClicked){
    currentQuestionDetails.votes--; 
    localStorage.setItem(incrementClickedKey, "false");
  }

  voteCountElement.textContent = currentQuestionDetails.votes;

  if (currentQuestionToUpdate) {
    currentQuestionToUpdate.votes = currentQuestionDetails.votes;
  }
  
  localStorage.setItem("currentQuestion", JSON.stringify(currentQuestionDetails));
  localStorage.setItem("allQuestions", JSON.stringify(allQuestions));
});
/////////////////////////////////////////////////////////////
decreament.addEventListener("click", function () {
  const questionId = currentQuestionDetails.id; 
  const incrementClickedKey = `incrementClicked-${questionId}`;
  const decrementClickedKey = `decrementClicked-${questionId}`;

  const incrementClicked = localStorage.getItem(incrementClickedKey) === "true";
  const decrementClicked = localStorage.getItem(decrementClickedKey) === "true";
  const wasClicked = this.classList.toggle("clicked");

  if (wasClicked && !decrementClicked) {
    currentQuestionDetails.votes--; 
    localStorage.setItem(decrementClickedKey, "true");
    localStorage.setItem(incrementClickedKey, "false"); 
    increament.classList.remove("clicked");
  } else if (!wasClicked && decrementClicked) {
    currentQuestionDetails.votes++; 
    localStorage.setItem(decrementClickedKey, "false");
  }

  voteCountElement.textContent = currentQuestionDetails.votes;

  if (currentQuestionToUpdate) {
    currentQuestionToUpdate.votes = currentQuestionDetails.votes;
  }

 
  localStorage.setItem("currentQuestion", JSON.stringify(currentQuestionDetails));
  localStorage.setItem("allQuestions", JSON.stringify(allQuestions));
});



document.addEventListener("DOMContentLoaded", () => {
  const questionId = currentQuestionDetails.id; 
  const incrementClickedKey = `incrementClicked-${questionId}`;
  const decrementClickedKey = `decrementClicked-${questionId}`;

  const incrementClicked = localStorage.getItem(incrementClickedKey) === "true";
  const decrementClicked = localStorage.getItem(decrementClickedKey) === "true";

  if (incrementClicked) {
    increament.classList.add("clicked");
  } else {
    increament.classList.remove("clicked");
  }

  if (decrementClicked) {
    decreament.classList.add("clicked");
  } else {
    decreament.classList.remove("clicked");
  }

  const storedVoteCount = currentQuestionDetails.votes;
  voteCountElement.textContent = storedVoteCount;
});

//////////////////////////////////////////////////saved///////////////////////////////////////////////////
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
console.log(currentUser, "currentuser");
console.log(currentQuestionDetails, "currentquestion");

const bookmarkButton = document.getElementById("bookmark");

if (currentUser?.savedQuestions?.some((q) => q.id === currentQuestionDetails.id)) {
  bookmarkButton.classList.add("fa-solid", "active");
  bookmarkButton.classList.remove("fa-regular");
} else {
  bookmarkButton.classList.add("fa-regular");
  bookmarkButton.classList.remove("fa-solid", "active");
}

bookmarkButton.addEventListener("click", function () {
  const isActive = this.classList.toggle("active"); 
  this.classList.toggle("fa-regular", !isActive); 
  this.classList.toggle("fa-solid", isActive);

  if (!currentUser.savedQuestions) {
    currentUser.savedQuestions = [];
  }

  if (isActive) {
    currentUser.savedQuestions.push(currentQuestionDetails);
  } else {
    currentUser.savedQuestions = currentUser.savedQuestions.filter((question) => question.id !== currentQuestionDetails.id);
  }

  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  const userIndex = allUsers.findIndex((user) => user.id === currentUser.id);
  if (userIndex !== -1) {
    allUsers[userIndex] = currentUser;
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
  }
});
/////////////////////////////////////////////////////to add answer//////////////////////////////////////////////////////////////
let form = document.getElementById("form");
let contentanswerinput=document.getElementById("contentanswer");
let btnPostAnswer =document.getElementById("btnPostAnswer");
//////////////////////////// button show
document.getElementById("showpostanswer").addEventListener("click", function () {
  if (form.classList.contains("show")) {
    form.classList.remove("show");
    this.innerHTML = `
      <p>Add Answer</p>
      <i class="fa-solid fa-circle-plus"></i>
    `;
  } else {
    form.classList.add("show");
    this.innerHTML = `
      <p>Cancel</p>
      <i class="fa-solid fa-circle-xmark"></i>
    `;
  }
});
//////////////////////////button handel send answer
btnPostAnswer.addEventListener("click",(e)=>{
  e.preventDefault();
  if(contentanswerinput.value.trim()){
    const newAnswer = {
      content: contentanswerinput.value,
      userId: currentUser.id,
      createdAt: new Date(),
      votes: 0,
      replies: [],
    };

    currentQuestionDetails.answers.push(newAnswer);

    const questionIndex = allQuestions.findIndex((q) => q.id === currentQuestionDetails.id);
    if (questionIndex !== -1) {
      allQuestions[questionIndex].answers.push(newAnswer);
    }

    localStorage.setItem("currentQuestion", JSON.stringify(currentQuestionDetails));
    localStorage.setItem("allQuestions", JSON.stringify(allQuestions));

    contentanswerinput.value = "";
    form.classList.remove("show");
    document.getElementById("showpostanswer").innerHTML = `
      <p>Add Answer</p>
      <i class="fa-solid fa-circle-plus"></i>
    `;
    
    ////////////////////////render////////////////////
       
    window.location.href = window.location.href;

    ////////////////////////////////////////////////////
     
  }
})


//////////////////////////////////////////////////answers////////////////////////////////////////////////////////////////
let answers = currentQuestionDetails?.answers;
let answersContainer = document.getElementById("answers-Container");

answers?.forEach((answer, index) => {
  let repliesHTML = '';

  if (answer.replies && Array.isArray(answer.replies)) {
    repliesHTML = answer.replies.map((reply, replyIndex) => `
      <div class="reply" id="reply-${index}-${replyIndex}">
        <div class="replyContent">
          <p>${reply.content}</p>
          <div class="userInforeply">
            <div class="left">
              <div class="user">
                <i class="fa-solid fa-user"></i>
                <p id="replyUsername">${getUsername(reply.userId, allUsers)}</p>
              </div>
              <div class="time" data-created-at="${reply.createdAt}">
                Calculating...
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join("");
  }

  answersContainer.innerHTML += `
    <div class="answeranditsReplies"> 
      <div class="answer" id="answer-${index}">
        <div class="votes">
          <i class="fa-solid fa-play increamentanswer" id="increamentanswer-${index}" data-index="${index}"></i>
          <span id="noOfVotesAnswer-${index}">${answer.votes}</span>
          <i class="fa-solid fa-play decreamentanswer" id="decreamentanswer-${index}" data-index="${index}"></i>
        </div>
        <div id="content">
          <p>${answer.content}</p>
          <div class="userInfo">
            <div class="left">
              <div class="user">  
                <i class="fa-solid fa-user"></i>
                <p id="username">${getUsername(answer.userId, allUsers)}</p>
              </div>
              <div class="time" data-created-at="${answer.createdAt}">
                Calculating...
              </div>
            </div>
            <div class="right">
              <button class="handelshowreply" data-answer-index="${index}">
                <p>Reply</p>
                <i class="fa-solid fa-reply-all"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="replies" id="replies-${index}">
        ${repliesHTML}
      </div>
    </div>
  `;
});

updateTimeDifferences();
///////////////////////////////////////////handel add reply/////////////////////////////
////////show
let existingForm =null
answersContainer.addEventListener("click", (event) => {
  if (event.target.closest(".handelshowreply")) {
    // console.log("yeeeeeeees");
    
    const button = event.target.closest(".handelshowreply");
    const index = button.dataset.answerIndex;
    const repliesContainer = document.getElementById(`replies-${index}`);

    existingForm = repliesContainer.querySelector(`#form2-${index}`);
    if (existingForm) {
      existingForm.remove();
    } else {
      const replyFormHTML = `
        <form action="" id="form2-${index}" class="reply-form">
          <input type="text" placeholder="Write your reply" id="contentreply-${index}" autofocus>
          <button type="submit" id="btnPostreply-${index}">
            <p>Post your reply</p>
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      `;
      repliesContainer.insertAdjacentHTML("afterbegin", replyFormHTML);
    }
  }
});
/////////////////////////////////////////////add reply
answersContainer.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.target;
  const answerIndex = form.id.split("-")[1]; 
  const input = form.querySelector("input");
  const replyContent = input.value.trim();

  if (replyContent) {
    const newReply = {
      content: replyContent,
      userId: currentUser.id,
      createdAt: new Date(),
    };

    currentQuestionDetails.answers[answerIndex].replies.push(newReply);

    const questionIndex = allQuestions.findIndex((q) => q.id === currentQuestionDetails.id);
    if (questionIndex !== -1) {
      allQuestions[questionIndex].answers[answerIndex].replies.push(newReply);
    }
    localStorage.setItem("currentQuestion", JSON.stringify(currentQuestionDetails));
    localStorage.setItem("allQuestions", JSON.stringify(allQuestions));

    input.value = "";
    if (existingForm) {
      existingForm.remove();
      existingForm = null; 
    }
    window.location.href=window.location.href;
  }
});

////////////////////////////////////////////////////////////////////////////////////
answers.forEach((answer, index) => {
  const incrementButton = document.getElementById(`increamentanswer-${index}`);
  const decrementButton = document.getElementById(`decreamentanswer-${index}`);
  const voteCountElementAnswer = document.getElementById(`noOfVotesAnswer-${index}`);

  incrementButton.addEventListener("click", function () {
      const wasClicked = this.classList.toggle("clicked");
      let currentAnswerVotes = answer.votes;

      if (wasClicked) {
          currentAnswerVotes++;

          localStorage.setItem(`decrementClicked-answer-${index}`, "false");
          decrementButton.classList.remove("clicked");
      } else {
          currentAnswerVotes--;
      }

      voteCountElementAnswer.textContent = currentAnswerVotes;
      answer.votes = currentAnswerVotes;

      localStorage.setItem(`incrementClicked-answer-${index}`, wasClicked ? "true" : "false");

      const updatedAllQuestions = allQuestions.map((question) => {
        if (question.id === currentQuestionDetails.id) {
            question.answers[index] = answer;
        }
        return question;
    });
      localStorage.setItem(`allQuestions`, JSON.stringify(updatedAllQuestions));
      localStorage.setItem(`currentQuestion`, JSON.stringify(currentQuestionDetails));
  });


  //////////////////////////////////////////////////
  decrementButton.addEventListener("click", function () {
      const wasClicked = this.classList.toggle("clicked");
      let currentAnswerVotes = answer.votes;

      if (wasClicked) {
          currentAnswerVotes--;
          localStorage.setItem(`incrementClicked-answer-${index}`, "false");
          incrementButton.classList.remove("clicked");
      } else {
          currentAnswerVotes++;
      }
      voteCountElementAnswer.textContent = currentAnswerVotes;
      answer.votes = currentAnswerVotes;

      localStorage.setItem(`decrementClicked-answer-${index}`, wasClicked ? "true" : "false");

      const updatedAllQuestions = allQuestions.map((question) => {
        if (question.id === currentQuestionDetails.id) {
            question.answers[index] = answer;
        }
        return question;
    });
      localStorage.setItem(`allQuestions`, JSON.stringify(updatedAllQuestions));
      localStorage.setItem(`currentQuestion`, JSON.stringify(currentQuestionDetails));
  });




  const incrementClicked = localStorage.getItem(`incrementClicked-answer-${index}`) === "true";
  const decrementClicked = localStorage.getItem(`decrementClicked-answer-${index}`) === "true";

  if (incrementClicked) {
      incrementButton.classList.add("clicked");
  } else {
      incrementButton.classList.remove("clicked");
  }

  if (decrementClicked) {
      decrementButton.classList.add("clicked");
  } else {
      decrementButton.classList.remove("clicked");
  }

  voteCountElementAnswer.textContent = answer.votes;
});
