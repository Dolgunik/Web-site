function saveEmail(event) {	// saave email function
    event.preventDefault(); // Preventing default form submission

    var email = document.getElementById('email').value;

    // Executing an AJAX request to save mail
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_email.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            document.getElementById('message').innerHTML = response.message;
        }
    };
    xhr.send('email=' + encodeURIComponent(email));
}

function showEmails() {	// Function to retrieve and display emails
    var xmlhttp = new XMLHttpRequest(); // Create a new XMLHttpRequest object
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // Check if the request is complete and successful
            var response = JSON.parse(this.responseText); // Parse the response as JSON
            if (response.success) { 
                var emails = response.emails; 
                var emailsList = document.getElementById("emailsList"); // Get the element to display the emails
                emailsList.innerHTML = emails.join("<br>");
            } else {
                alert(response.message); 
            }
        }
    };
    xmlhttp.open("GET", "save_email.php", true); // Open a GET request to the "save_email.php" file
    xmlhttp.send(); 
}


