document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userMenu = document.getElementById("userMenu");
    
    if (currentUser) {
        let profileImage = "";
        
        if (currentUser.photo && typeof currentUser.photo === "string") {
            profileImage = `<img src="${currentUser.photo}" alt="${currentUser.name}">`;
        } else {
            profileImage = `<div class="default-avatar">${currentUser.name.charAt(0).toUpperCase()}</div>`;
        }
        
        userMenu.innerHTML = `
            <div class="profile-img" id="profileBtn">
                ${profileImage}
            </div>
            <div class="dropdown-menu" id="dropdownMenu">
                <span>${currentUser.name}</span>
                <a href="logout.html" id="logoutBtn">Logout</a>
            </div>
        `;
        
        const profileBtn = document.getElementById("profileBtn");
        const dropdownMenu = document.getElementById("dropdownMenu");
        
        profileBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle("show");
        });
        
        document.getElementById("logoutBtn").addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("currentUser");
            window.location.href = "login.html";
        });
        
        document.addEventListener("click", (e) => {
            if (!userMenu.contains(e.target)) {
                dropdownMenu.classList.remove("show");
            }
        });
    } else {
        window.location.href = "login.html";
    }
    
    setTimeout(() => {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    }, 3600000);
});