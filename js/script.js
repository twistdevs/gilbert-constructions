

// FAQ button behaviour
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const answer = button.nextElementSibling;
        answer.classList.toggle("hidden");
        button.querySelector(".plus-minus").textContent = answer.classList.contains("hidden") ? "+" : "-";
    });
});


//Contact & From Submission
document.querySelector(".quote-form form").addEventListener("submit", function(event) {
    event.preventDefault();

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
    document.querySelectorAll("input, textarea, select").forEach(input => {
        input.style.border = "1px solid #ccc";
    });

    if (!fullName || !email || !phone || !service || !message) {
        alert("Please fill in all fields.");
        valid = false;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        this.email.style.border = "2px solid red";
        valid = false;
    }

    if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number.");
        this.phone.style.border = "2px solid red";
        valid = false;
    }

    if (!valid) return;

    responseMessage.textContent = "Thank you for your request! We will get back to you soon.";
    responseMessage.style.color = "green";

    setTimeout(() => {
        responseMessage.textContent = "";
    }, 5000);

    this.reset();
});
