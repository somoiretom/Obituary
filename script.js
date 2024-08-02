document.getElementById('obituaryForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const dateOfBirth = document.getElementById('date_of_birth').value;
    const dateOfDeath = document.getElementById('date_of_death').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;

    // Validate the dates
    if (new Date(dateOfBirth) >= new Date(dateOfDeath)) {
        alert('Date of Death must be after Date of Birth.');
        return; // Exit the function if validation fails
    }

    // Create a data object to send
    const formData = {
        name: name,
        date_of_birth: dateOfBirth,
        date_of_death: dateOfDeath,
        content: content,
        author: author,
    };

    // Send the data using Fetch API
    fetch('/submit_obituary/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'), // Include CSRF token if using Django
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Parse the JSON response
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        alert('Obituary submitted successfully!'); // Handle success
        // Optionally redirect or update the UI
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});

// Function to get CSRF token (if using Django)
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Check if this cookie string begins with the name we want
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}