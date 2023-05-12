window.addEventListener('load', function() {
    var canvas = document.getElementById('myChart');
    canvas.width = 200;
    canvas.height = 200;

    var context = canvas.getContext('2d');
    var chart = null;

    // Function for updating the graph with new data
    function updateChart(emailAddresses) {
        var gmailCount = 0;
        for (var i = 0; i < emailAddresses.length; i++) {
            if (emailAddresses[i].endsWith('@gmail.com')) {
                gmailCount++;
            }
        }

        if (chart !== null) {
            chart.destroy(); // Destroying the existing schedule
        }

        var chartOptions = {
            responsive: false, // Disabling automatic chart scaling
            width: 200, 
            height: 200 
        };

        chart = new Chart(context, {
            type: 'doughnut',
            data: {
                labels: ['@gmail.com', 'Other Domains'],
                datasets: [{
                    data: [gmailCount, emailAddresses.length - gmailCount],
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(192, 75, 75, 0.2)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(192, 75, 75, 1)'],
                    borderWidth: 1
                }]
            },
            options: chartOptions
        });
    }

    // Getting a list of email addresses and updating the schedule
	function getEmailsAndDrawChart() {
		var xmlhttp = new XMLHttpRequest(); // Create a new XMLHttpRequest object
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) { // Check if the request is complete and successful
				var response = JSON.parse(this.responseText); // Parse the response as JSON
				if (response.success) { 
					var emailAddresses = response.emails; 
					updateChart(emailAddresses); 
				} else {
					alert(response.message); 
				}
			}
		};
		xmlhttp.open("GET", "save_email.php", true); // Open a GET request to the "save_email.php" file
		xmlhttp.send(); 
	}

	getEmailsAndDrawChart();
});

