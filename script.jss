console.log("JavaScript file loaded!");
// ===============================
// Portfolio JavaScript
// ===============================

// Mobile Menu
const menu = document.getElementById("menu");
const navLinks = document.querySelector(".nav-links");

menu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// ===============================
// Dark Mode
// ===============================

const darkMode = document.getElementById("darkMode");

darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        darkMode.classList.remove("fa-moon");
        darkMode.classList.add("fa-sun");
    }else{
        darkMode.classList.remove("fa-sun");
        darkMode.classList.add("fa-moon");
    }
});

// ===============================
// Typing Animation
// ===============================

const words = [
    "Web Developer",
    "Frontend Developer",
    "Programmer",
    "B.Tech Student"
];

let wordIndex = 0;
let letterIndex = 0;
let currentWord = "";
let isDeleting = false;

const typing = document.getElementById("typing");

function typeEffect(){

    currentWord = words[wordIndex];

    if(!isDeleting){

        typing.textContent = currentWord.substring(0, letterIndex + 1);

        letterIndex++;

        if(letterIndex === currentWord.length){

            isDeleting = true;

            setTimeout(typeEffect, 1200);

            return;
        }

    }else{

        typing.textContent = currentWord.substring(0, letterIndex - 1);

        letterIndex--;

        if(letterIndex === 0){

            isDeleting = false;

            wordIndex++;

            if(wordIndex === words.length){

                wordIndex = 0;
            }

        }

    }

    setTimeout(typeEffect, isDeleting ? 60 : 120);

}

typeEffect();

// ===============================
// Back To Top Button
// ===============================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){

        topBtn.style.display = "block";

    }else{

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// ===============================
// Active Navbar Link
// ===============================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", ()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.clientHeight;

        if(scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});

// ===============================
// Scroll Animation
// ===============================

const cards = document.querySelectorAll(
".skill-card,.project-card,.education-card,.certificate-card"
);

function reveal(){

    cards.forEach(card=>{

        const windowHeight = window.innerHeight;

        const revealTop = card.getBoundingClientRect().top;

        const revealPoint = 120;

        if(revealTop < windowHeight - revealPoint){

            card.classList.add("show");

        }

    });

}

window.addEventListener("scroll", reveal);

reveal();

// ===============================
// Contact Form
// ===============================


const form = document.querySelector("form");
console.log("Form found:", form);
 console.log("Submit listener attached!");


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted!");

    const formData = new FormData(form);

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message")
    };

    try {
        console.log("Sending data to API:", data);
        const response = await fetch("https://personal-portfolio-jnwj.onrender.com/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            document.getElementById("successPopup").classList.add("show");
            form.reset();
        } else {
            alert(result.message || "Failed to send message.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Server se connection nahi ho paaya. Please try again.");
    }
});


// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior:"smooth"

        });

    });

});
const successPopup = document.getElementById("successPopup");
const closePopup = document.getElementById("closePopup");
console.log("Popup element:", successPopup);
console.log("Close button:", closePopup);

closePopup.addEventListener("click", () => {
    successPopup.classList.remove("show");
});

successPopup.addEventListener("click", (e) => {
    if (e.target === successPopup) {
        successPopup.classList.remove("show");
    }
});

// ===============================
// Footer Year
// ===============================

const footer = document.querySelector("footer p");

const year = new Date().getFullYear();

footer.innerHTML = `© ${year} Palak | All Rights Reserved`;
