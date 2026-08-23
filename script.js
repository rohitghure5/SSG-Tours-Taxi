document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll("#navMenu a").forEach((link) => {
      link.addEventListener("click", () => navMenu.classList.remove("active"));
    });
  }

  // 2. Navbar Scroll Style
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 30);
    }
  });

  // 3. Set Minimum Date on Date Input
  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
  }

  // 4. Luggage Size Option Selector
  const luggageBtns = document.querySelectorAll(".luggage-btn");
  const luggageSizeInput = document.getElementById("selectedLuggageSize");

  luggageBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      luggageBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (luggageSizeInput) {
        luggageSizeInput.value = btn.getAttribute("data-size");
      }
    });
  });

  // 5. Reviews Array & Dynamic Rendering
  const reviews = [
    { name: "David Miller (UK)", rating: 5, review: "Flawless airport pickup from Mopa. Driver was waiting with a clear sign and car was spotless.", date: "2026-07-14" },
    { name: "Pooja Hegde (Bangalore)", rating: 5, review: "Booked a full-day South Goa sightseeing trip. Transparent price and very courteous chauffeur.", date: "2026-07-22" },
    { name: "Alexei V. (Russia)", rating: 5, review: "Great communication on WhatsApp. Timely outstation drop to Gokarna.", date: "2026-08-05" }
  ];

  const reviewList = document.getElementById("reviewList");

  function renderReviews() {
    if (!reviewList) return;
    reviewList.innerHTML = reviews.map((r) => `
      <article class="review-card">
        <h3>${r.name}</h3>
        <div class="review-stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
        <p>${r.review}</p>
        <small style="color: #64748b; margin-top: 8px; display: block;">${r.date}</small>
      </article>
    `).join("");
  }
  renderReviews();

  // Review Form Submit Handler
  const reviewForm = document.getElementById("reviewForm");
  const trafficBtns = document.querySelectorAll(".traffic-btn");
  const reviewRatingInput = document.getElementById("reviewRating");

  trafficBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      trafficBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      reviewRatingInput.value = btn.getAttribute("data-rating");
    });
  });

  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("reviewName").value.trim();
      const rating = parseInt(reviewRatingInput.value);
      const text = document.getElementById("reviewText").value.trim();

      if (!name || !text) return;

      reviews.unshift({
        name,
        rating,
        review: text,
        date: new Date().toISOString().split("T")[0]
      });

      renderReviews();
      reviewForm.reset();
      alert("Thank you! Your review has been recorded.");
    });
  }

  // 6. International Quick Fare Form Submission → WhatsApp
  const fareForm = document.getElementById("fareForm");

  if (fareForm) {
    fareForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const clientPhone = document.getElementById("clientPhone").value.trim();
      const pickup = document.getElementById("pickup").value.trim();
      const drop = document.getElementById("drop").value.trim();
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const passengers = document.getElementById("passengers").value;
      const luggageQty = document.getElementById("luggageQty").value;
      const luggageSize = luggageSizeInput ? luggageSizeInput.value : "Standard";

      // International Phone Number Validation (E.164 standard / universal digits)
      const phoneRegex = /^[+]?[0-9\s\-()]{7,16}$/;
      if (!phoneRegex.test(clientPhone)) {
        alert("Please enter a valid phone number with country code (e.g., +91 9370590719 or +44...)");
        return;
      }

      // WhatsApp Message Payload
      const message =
        `*🚖 FARE ENQUIRY — SSG TOURS & TAXI*\n\n` +
        `*👤 Passenger:* ${firstName} ${lastName}\n` +
        `*📞 Contact No:* ${clientPhone}\n` +
        `*📍 Pickup Hub:* ${pickup}\n` +
        `*🏁 Destination:* ${drop}\n` +
        `*📅 Date:* ${date}\n` +
        `*⏰ Time:* ${time}\n` +
        `*👥 Passenger Count:* ${passengers}\n` +
        `*🧳 Luggage Details:* ${luggageQty} Bags (${luggageSize})\n\n` +
        `_Please confirm availability and the best fixed rate._`;

      const whatsappURL = `https://wa.me/919370590719?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");
    });
  }

  // 7. General Contact Form → WhatsApp
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("contactName").value.trim();
      const phone = document.getElementById("contactPhone").value.trim();
      const msg = document.getElementById("contactMessage").value.trim();

      const contactMsg =
        `*📩 DIRECT INQUIRY — SSG TOURS*\n\n` +
        `*Name:* ${name}\n` +
        `*Phone:* ${phone}\n` +
        `*Message:* ${msg}`;

      window.open(`https://wa.me/919370590719?text=${encodeURIComponent(contactMsg)}`, "_blank");
    });
  }

  // 8. Back to Top Button
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});