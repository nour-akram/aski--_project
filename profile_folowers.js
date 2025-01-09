// const currentUserString = localStorage.getItem("currentUser");
// const usersString = localStorage.getItem("users");
// if (currentUserString) {
//     const currentUser = JSON.parse(currentUserString);

//     // const user_id = currentUser.id; 
//     const f_name = currentUser.firstName; 
//     const l_name = currentUser.lastName; 
//     // const mail = currentUser.email; 
//     const user_countery = currentUser.country; 
//     // const user_interests = currentUser.interests;
//     const user_flowers = currentUser.followers;
//     const user_image = currentUser.userImage;
//     const user_bio = currentUser.bio;
//     document.getElementById("welcomeMsg").textContent =`${f_name} ${l_name}`;
//     document.getElementById("userLocation").textContent = `${user_countery}`;
//     document.getElementById("profilePic").src = user_image;
//     document.getElementById("followersCount").textContent = user_flowers;



// const followBtn = document.querySelector(".follow-btn");
//     followBtn.addEventListener("click", () => {
//         user_flowers++;
//         document.getElementById("followersCount").textContent = user_flowers; 
//         currentUser.followers = user_flowers;
//         localStorage.setItem("currentUser", JSON.stringify(currentUser));
//     });}


const params = new URLSearchParams(window.location.search);
const targetUserId = parseInt(params.get("id"), 10); 

const allUsersString = localStorage.getItem("allUsers");

if (allUsersString) {
    const allUsers = JSON.parse(allUsersString);
    const targetUser = allUsers.find(user => user.id === targetUserId); 

    if (targetUser) {
        document.getElementById("welcomeMsg").textContent = `${targetUser.firstName} ${targetUser.lastName}`;
        document.getElementById("userLocation").textContent = targetUser.country ;
        document.getElementById("profilePic").src = targetUser.userImage ;
        document.getElementById("followersCount").textContent = targetUser.followers || 0;
        document.getElementById("userTitle").textContent = targetUser.bio; 

        const followBtn = document.querySelector(".follow-btn");
        followBtn.addEventListener("click", () => {
            targetUser.followers = (targetUser.followers || 0) + 1; 
            document.getElementById("followersCount").textContent = targetUser.followers;

            const userIndex = allUsers.findIndex(user => user.id === targetUserId);
            if (userIndex !== -1) {
                allUsers[userIndex] = targetUser;
                localStorage.setItem("allUsers", JSON.stringify(allUsers));
            }

            alert(`You followed ${targetUser.firstName} ${targetUser.lastName}!`);
        });
    } else {
        alert("User not found!");
    }
} else {
    alert("No users data found in localStorage.");
}
