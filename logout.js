
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
  /////////////////////////////////////////////////////////////////////////
  document.getElementById("btn").addEventListener("click",()=>{
    document.getElementById("dialog").showModal();
  })

  document.getElementById("btnLogout").addEventListener("click",()=>{
    localStorage.removeItem("currentUser");
    location.href="./index.html"
  })