document.addEventListener("DOMContentLoaded", () => {
    const recommendationsBtn = document.getElementById("recommendations-btn");
    const recommendationsDropdown = document.getElementById(
        "recommendations-dropdown"
    );
    const fillFormLink = document.getElementById("fill-form-link");
    const infoLink = document.getElementById("info-link");
    const homeLink = document.getElementById("home-link");
    const aboutLink = document.getElementById("about-link");
    const helpLink = document.getElementById("help-link");
    const ctaButton = document.getElementById("cta-button");
    const submitBtn = document.getElementById("submit-btn");

    const homeSection = document.getElementById("home-section");
    const formSection = document.getElementById("form-section");
    const infoSection = document.getElementById("info-section");
    const aboutSection = document.getElementById("about-section");
    const helpSection = document.getElementById("help-section");
    const resultsSection = document.getElementById("results-section");
    const loadingSection = document.getElementById("loading-section");

    const emailModal = document.getElementById("email-modal");
    const emailInput = document.getElementById("email-input");
    const sendOtpBtn = document.getElementById("send-otp-btn");
    const emailError = document.getElementById("email-error");

    const otpModal = document.getElementById("otp-modal");
    const otpInput = document.getElementById("otp-input");
    const verifyOtpBtn = document.getElementById("verify-otp-btn");
    const otpError = document.getElementById("otp-error");
    const hardcodedOtp = "123456";

    const statusModal = document.getElementById("status-modal");
    const statusIcon = document.getElementById("status-icon");
    const statusTitle = document.getElementById("status-title");
    const statusMessage = document.getElementById("status-message");
    const statusOkBtn = document.getElementById("status-ok-btn");

    const mainSections = [
        homeSection,
        formSection,
        infoSection,
        aboutSection,
        helpSection,
        resultsSection,
        loadingSection,
    ];

    function showSection(sectionToShow) {
        mainSections.forEach((section) => {
            if (section.id === sectionToShow.id) {
                section.classList.remove("hidden");
            } else {
                section.classList.add("hidden");
            }
        });
    }

    function showModal(modal) {
        modal.classList.remove("hidden");
        setTimeout(() => {
            modal.querySelector("div").classList.remove("scale-95", "opacity-0");
            modal.querySelector("div").classList.add("scale-100", "opacity-100");
        }, 10);
    }

    function hideModal(modal) {
        modal.querySelector("div").classList.remove("scale-100", "opacity-100");
        modal.querySelector("div").classList.add("scale-95", "opacity-0");
        setTimeout(() => {
            modal.classList.add("hidden");
        }, 300);
    }

    function showStatusModal(title, message, icon) {
        statusTitle.textContent = title;
        statusMessage.textContent = message;
        statusIcon.innerHTML = icon;
        showModal(statusModal);
    }

    // Toggle dropdown visibility
    recommendationsBtn.addEventListener("click", () => {
        const isHidden = recommendationsDropdown.classList.contains("hidden");
        recommendationsDropdown.classList.toggle("hidden", !isHidden);
        recommendationsDropdown.classList.toggle("scale-100", isHidden);
        recommendationsDropdown.classList.toggle("scale-95", !isHidden);
        recommendationsDropdown.classList.toggle("opacity-100", isHidden);
        recommendationsDropdown.classList.toggle("opacity-0", !isHidden);
    });

    // Handle navigation links
    homeLink.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(homeSection);
    });
    aboutLink.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(aboutSection);
    });
    helpLink.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(helpSection);
    });
    ctaButton.addEventListener("click", () => {
        showSection(formSection);
    });
    fillFormLink.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(formSection);
        recommendationsDropdown.classList.add("hidden");
    });
    infoLink.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(infoSection);
        recommendationsDropdown.classList.add("hidden");
    });

    // Handle form submission: show email modal
    submitBtn.addEventListener("click", () => {
        showModal(emailModal);
    });

    // Handle "Send OTP" button click
    sendOtpBtn.addEventListener("click", () => {
        const email = emailInput.value;
        if (!email || !email.includes("@")) {
            emailError.classList.remove("hidden");
            return;
        }
        emailError.classList.add("hidden");

        showStatusModal(
            "Sending OTP...",
            "Please wait while we send the code to your email.",
            `<div class="spinner w-12 h-12 border-4 border-t-4 border-t-indigo-500 border-gray-200 rounded-full mx-auto"></div>`
        );

        setTimeout(() => {
            hideModal(statusModal);
            showModal(otpModal);
        }, 1500); // Simulate network delay
    });

    // Handle "Verify OTP" button click
    verifyOtpBtn.addEventListener("click", () => {
        const otp = otpInput.value;
        if (otp === hardcodedOtp) {
            hideModal(otpModal);
            showSection(loadingSection);
            setTimeout(() => {
                showSection(resultsSection);
            }, 1500); // 1.5-second delay
        } else {
            otpError.textContent = "Invalid OTP. Please try again.";
            otpError.classList.remove("hidden");
        }
    });

    // Handle status modal OK button
    statusOkBtn.addEventListener("click", () => {
        hideModal(statusModal);
    });

    // Hide modals on outside click
    window.addEventListener("click", (event) => {
        if (!recommendationsBtn.contains(event.target) &&
            !recommendationsDropdown.contains(event.target)
        ) {
            recommendationsDropdown.classList.add("hidden");
            recommendationsDropdown.classList.remove("scale-100", "opacity-100");
            recommendationsDropdown.classList.add("scale-95", "opacity-0");
        }
        if (event.target === emailModal) {
            hideModal(emailModal);
        }
        if (event.target === otpModal) {
            hideModal(otpModal);
        }
        if (event.target === statusModal) {
            hideModal(statusModal);
        }
    });

    // Handle sector interest selection
    const sectorInterests = document.querySelectorAll(".sector-interest");
    sectorInterests.forEach((sector) => {
        sector.addEventListener("click", () => {
            sector.classList.toggle("selected");
        });
    });
});
