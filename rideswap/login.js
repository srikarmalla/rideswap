document.addEventListener("DOMContentLoaded", function() {
    let loginForm = document.getElementById("loginForm");
    let registerForm = document.getElementById("registerForm");
    let toggleLink = document.getElementById("toggleLink");
    let toggleText = document.getElementById("toggleText");
    let loginError = document.getElementById("loginError");
    let registerError = document.getElementById("registerError");

    let loginEmail = document.getElementById("loginEmail");
    loginEmail.addEventListener("input", function() {
      this.value = this.value.toLowerCase();
    });

    let regEmail = document.getElementById("regEmail");
    regEmail.addEventListener("input", function() {
      this.value = this.value.toLowerCase();
    });

    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }
  

    toggleLink.addEventListener("click", function() {
      loginForm.classList.toggle("hidden");
      registerForm.classList.toggle("hidden");

      if (loginForm.classList.contains("hidden")) {
        toggleText.textContent = "Already have an account? ";
        toggleLink.textContent = "Login here";
      } else {
        toggleText.textContent = "Don't have an account? ";
        toggleLink.textContent = "Register here";
      }

      loginError.textContent = "";
      registerError.textContent = "";
    });

    loginForm.addEventListener("submit", function(e) {
      e.preventDefault(); 

      let email = loginEmail.value.trim();
      let password = document.getElementById("loginPassword").value;

      if (!email || !password) {
        loginError.textContent = "Please enter both email and password";
        return;
      }

      let users = JSON.parse(localStorage.getItem("users"));
      let foundUser = null;

      for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
          foundUser = users[i];
          break;
        }
      }
  
      if (!foundUser) {
        loginError.textContent = "Wrong email or password. Try again?";
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      window.location.href = "home.html";
    });

    registerForm.addEventListener("submit", function(e) {
      e.preventDefault();

      let name = document.getElementById("regName").value.trim();
      let phone = document.getElementById("regPhone").value.trim();
      let email = regEmail.value.trim();
      let password = document.getElementById("regPassword").value;
      let confirmPass = document.getElementById("regConfirmPassword").value;
      let photoInput = document.getElementById("regPhoto");
            
      if (!name || !phone || !email || !password) {
        registerError.textContent = "Fill out all the required fields";
        return;
      }

      if (phone.length != 10 || isNaN(phone)) {
        registerError.textContent = "Phone must be 10 digits";
        return;
      }
  
      if (password.length < 6 || password.length > 8) {
        registerError.textContent = "Password must be 6-8 characters";
        return;
      }

      if (password != confirmPass) {
        registerError.textContent = "Passwords don't match";
        return;
      }

      let users = JSON.parse(localStorage.getItem("users") || "[]");
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
          registerError.textContent = "Email already registered";
          return;
        }
      }

      let newUser = {
        name: name,
        phone: phone,
        email: email,
        password: password,
        photo: null
      };
  
      if (photoInput.files.length > 0) {
        let file = photoInput.files[0];
        let reader = new FileReader();

        reader.onload = function(e) {
          newUser.photo = e.target.result;
 
          users.push(newUser);
          localStorage.setItem("users", JSON.stringify(users));

          registerError.textContent = "";
          alert("Account created! Please sign in.");
          toggleLink.click();
        };

        reader.readAsDataURL(file);
      } else {
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        
        registerError.textContent = "";
        alert("Account created! Please sign in.");
        toggleLink.click();
      }
    });
  });