document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
  
    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;
  
    // Make a POST request to the login endpoint
    fetch("https://www.fulek.com/data/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.data,'data');
      if (data.isSuccess) {
        // Successful login, store the JWT token

        var token = data.data.token;
        console.log(token, 'token');
        // Store the token in localStorage
        localStorage.setItem("token", token);
  
        // Display a success message to the user or perform any other desired actions
        alert("Login successful!");
  
        // Redirect to index.html
        window.location.href = "index.html";
      } else {
        // Login failed, display an error message to the user
        alert("Login failed. Please check your username and password.");
      }
    })
    .catch(error => {
      // An error occurred during the login process
      console.error("Login error:", error);
    });
  });
  
  document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
  
    var username = document.getElementById("regUsername").value;
    var password = document.getElementById("regPassword").value;
  
    // Make a POST request to the registration endpoint
    fetch("https://www.fulek.com/data/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data, 'data');
      if (data.isSuccess) {
        // Successful registration, display a success message to the user
        alert("Registration successful! You can now login with your credentials.");
      } else {
        // Registration failed, display an error message to the user
        alert("Registration failed. Please try again.");
      }
    })
    .catch(error => {
        // An error occurred during the registration process
        console.error("Registration error:", error);
        alert("Registration failed. " + error.message); // Display the specific error message
      });
      
  });
  