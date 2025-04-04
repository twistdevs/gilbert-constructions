// FAQ button behaviour
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const answer = button.nextElementSibling;
        answer.classList.toggle("hidden");

        const icon = button.querySelector(".plus-minus i");
        icon.classList.toggle("fa-plus");
        icon.classList.toggle("fa-minus");
    });
});


// Contact & Form Submission with Loading Indicator
document.querySelector(".quote-form form").addEventListener("submit", function(event) {
    event.preventDefault();

    document.getElementById("loading-indicator").style.display = "block";  // Show loading indicator

    const fullName = this.fullName.value.trim();
    const email = this.email.value.trim();
    const phone = this.phone.value.trim();
    const service = this.service.value;
    const message = this.message.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]+$/;
    const responseMessage = document.querySelector(".response-message");

    let valid = true;

    // Reset previous error styles
    document.querySelectorAll(".error-message").forEach(msg => msg.remove());
    document.querySelectorAll("input, textarea, select").forEach(input => {
        input.style.border = "1px solid #ccc";
    });

    // Validate fields
    if (!fullName || !email || !phone || !service || !message) {
        valid = false;
        displayError(this.fullName, "Please fill in all fields.");
    }

    if (!emailPattern.test(email)) {
        valid = false;
        displayError(this.email, "Please enter a valid email address.");
    }

    if (!phonePattern.test(phone)) {
        valid = false;
        displayError(this.phone, "Please enter a valid phone number.");
    }

    if (!valid) {
        document.getElementById("loading-indicator").style.display = "none"; // Hide loading indicator on error
        return;
    }

    responseMessage.textContent = "Thank you for your request! We will get back to you soon.";
    responseMessage.style.color = "green";

    // Hide loading indicator and show response message
    document.getElementById("loading-indicator").style.display = "none";

    setTimeout(() => {
        responseMessage.textContent = "";
    }, 5000);

    this.reset();
});

// Function to display error messages
function displayError(input, message) {
    const errorMsg = document.createElement("p");
    errorMsg.textContent = message;
    errorMsg.classList.add("error-message");
    errorMsg.style.color = "red";
    errorMsg.style.marginTop = "5px"; // Added margin for better spacing
    input.style.border = "2px solid red";
    input.insertAdjacentElement("afterend", errorMsg);
}
