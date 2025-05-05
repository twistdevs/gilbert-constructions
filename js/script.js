// =======================
// Burger Menu & X Toggle
// =======================
const burger = document.getElementById('burger');
const navlinks = document.getElementById('navlinks');
const icon = burger.querySelector('i');
const overlay = document.getElementById('overlay');

burger.addEventListener('click', () => {
    navlinks.classList.toggle('show');
    overlay.classList.toggle('active');

    if (navlinks.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

//Overlay full page when navigation menu is open
// Close nav if overlay is clicked
overlay.addEventListener('click', () => {
    navlinks.classList.remove('show');
    overlay.classList.remove('active');
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
});


// =======================
// Work Slider Behaviour
// =======================
const slider = document.querySelector('.work-gallery');
let isDown = false;
let startX;
let scrollLeft;

if (slider) {
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    slider.scrollLeft = scrollLeft - walk;
  });
}



// =======================
// FAQ Button Behaviour
// =======================
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const answer = button.nextElementSibling;
        answer.classList.toggle("hidden");

        const icon = button.querySelector(".plus-minus i");
        icon.classList.toggle("fa-plus");
        icon.classList.toggle("fa-minus");
    });
});

// =======================
// Contact & Form Submission with Loading Indicator
// =======================
document.querySelector(".quote-form form").addEventListener("submit", function (event) {
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

// =======================
// Function to Display Error Messages
// =======================
function displayError(input, message) {
    const errorMsg = document.createElement("p");
    errorMsg.textContent = message;
    errorMsg.classList.add("error-message");
    errorMsg.style.color = "red";
    errorMsg.style.marginTop = "5px"; // Added margin for better spacing
    input.style.border = "2px solid red";
    input.insertAdjacentElement("afterend", errorMsg);
}

