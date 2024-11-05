// Check if there is color in local storage
if (window.localStorage.getItem("color_option") !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("color_option")
  );

  // Remove Active Class from colors-list li
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add Active Class To current li
    if (localStorage.getItem("color_option") == element.dataset.color) {
      element.classList.add("active");
    }
  });
}

// Random background option
let backgroundOption = true;

// Variable to control the background Interval
let backgroundInterval;

// check if random background local storage no empty
if (localStorage.getItem("background_option") !== null) {
  if (localStorage.getItem("background_option") == "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // Remove Active class From all spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  // Add active class to current target
  if (localStorage.getItem("background_option") === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Toggle spin class
document.querySelector(".toggle-setting").onclick = function () {
  // Toggle open setting box
  document.querySelector(".setting-box").classList.toggle("open");
};

window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    document.querySelector(".setting-box").classList.remove("open");
  }
});

// Select the settingBox element
const settingBox = document.querySelector(".setting-box");

// Add a click event listener to the window
window.addEventListener("click", (e) => {
  // Check if the click target is outside the settingBox
  if (!settingBox.contains(e.target)) {
    settingBox.classList.remove("open"); // Close the settingBox
  }
});

// Switch Colors
let colorsLis = document.querySelectorAll(".colors-list li");

// Loop on all lis
colorsLis.forEach((li) => {
  // Click on every li
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color in local Storage
    window.localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// Switch random background
let randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop on all lis
randomBackEl.forEach((span) => {
  // Click on every span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

// Select Element landing page
let landingPage = document.querySelector(".landing-page");

// Get Array From imgs
let imgsArr = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function randomizeImgs() {
  if (backgroundOption) {
    // Change Background
    backgroundInterval = setInterval(() => {
      let randomValue = Math.floor(Math.random() * imgsArr.length);

      landingPage.style.backgroundImage =
        "url('imgs/" + imgsArr[randomValue] + "')";
    }, 10000);
  }
}

randomizeImgs();

// Select skills
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills offsetTop الجزء اللى فوق السكشن بتاعنا
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills OuterHeight الارتفاع بتاع السكشن
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height  zoom الارتفاع بتاع الويندوا بتغير حسب
  let windowHeight = window.innerHeight;

  // Window ScrollTop الجزء اللى عملت ليه سكرول
  let windowScrollTop = window.scrollY; // == window.pageYOffset

  // if (windowScrollTop >= skillsOffsetTop + skillsOuterHeight - windowHeight) {
  if (window.scrollY >= ourSkills.offsetTop - 100) {
    let skillsAll = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    skillsAll.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Pop up with image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", function () {
    // Create Overlay
    let overlay = document.createElement("div");

    // Add Class to overlay
    overlay.className = "popup-overlay";

    // Add Element to body
    document.body.appendChild(overlay);

    // Create popup box
    let popupBox = document.createElement("div");

    // Add class to popup box
    popupBox.className = "popup-box";

    if (img.alt !== "") {
      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create Heading Text
      let imgHeadingText = document.createTextNode(img.alt);

      // Append text to img h3
      imgHeading.appendChild(imgHeadingText);

      // append imgHeading to popup box
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupimage = document.createElement("img");

    // Set Image Source
    popupimage.src = img.src;

    // Add Image To popup Box
    popupBox.appendChild(popupimage);

    // Add popup box to body
    document.body.appendChild(popupBox);

    // Create Close Button span
    let closeButton = document.createElement("span");

    // Create Text to close button
    let closeText = document.createTextNode("X");

    // Add Class to close button
    closeButton.className = "popup-close";

    // Append close text to close button
    closeButton.appendChild(closeText);

    // Append close button to popup box
    popupBox.appendChild(closeButton);
  });
});

// Close popup When click close Button
document.addEventListener("click", function (e) {
  if (e.target.className == "popup-close") {
    // // Remove current popup
    // e.target.parentElement.remove();
    document.querySelector(".popup-box").remove();

    // // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Close popup When click overlay
document.addEventListener("click", function (e) {
  if (e.target.className == "popup-overlay") {
    // // Remove current popup
    // e.target.parentElement.remove();
    document.querySelector(".popup-box").remove();

    // // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomeWhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

// Handle Active state

function handleActive(ev) {
  // Remove Active Class from all lis
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add active class to current element
  ev.target.classList.add("active");
}

let bulletsSpans = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

if (window.localStorage.getItem("bullets_option") !== null) {
  bulletsSpans.forEach((span) => {
    span.classList.remove("active");
  });

  if (window.localStorage.getItem("bullets_option") === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpans.forEach((span) => {
  span.addEventListener("click", function (e) {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";

      window.localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";

      window.localStorage.setItem("bullets_option", "none");
    }

    handleActive(e);
  });
});

// Rest button
document.querySelector(".rest-options").onclick = function () {
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("color_option");

  // Reload Window
  window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".bars");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function () {
  // Toggle Class "open" To Links
  tLinks.classList.toggle("open");
};

// Add a click event listener to the window
window.addEventListener("click", (e) => {
  // Check if the click target is outside the toggle menu
  if (!toggleBtn.contains(e.target) && !tLinks.contains(e.target)) {
    tLinks.classList.remove("open"); // Close the links
  }
});
