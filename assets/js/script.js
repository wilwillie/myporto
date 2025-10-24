'use strict';


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);


// filter variables (Dipastikan ini tidak konflik dengan data-loader.js)
const filterButtons = document.querySelectorAll("[data-filter-btn]");
const filterSelect = document.querySelector("[data-select]");
const selectValue = document.querySelector("[data-selecct-value]");
const selectList = document.querySelector("[data-select-list]");
// const projectItems = document.querySelectorAll("[data-filter-item]"); // Tidak lagi diperlukan di sini

// add event in all filter button items for large screen
let lastClickedBtn = filterButtons[0];

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    // Memastikan filterFunc dari data-loader.js sudah tersedia
    if (typeof filterFunc === 'function') {
        filterFunc(selectedValue);
    }
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// add event in all filter select item for small screen
if (filterSelect && selectList) { // Periksa keberadaan elemen sebelum menambahkan event
  filterSelect.addEventListener("click", function () { elementToggleFunc(selectList); });

  // Menggunakan children untuk item dalam select-list
  // Pastikan filterFunc dari data-loader.js sudah tersedia
  for (let i = 0; i < selectList.children.length; i++) {
    selectList.children[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      if (typeof filterFunc === 'function') {
        filterFunc(selectedValue);
      }
      elementToggleFunc(selectList); // Tutup dropdown setelah memilih
    });
  }
}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field for validation check
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// =============================
// CUSTOM ALERT SYSTEM
// =============================
function showAlert(message, icon = "checkmark-circle-outline") {
  let alertBox = document.getElementById("customAlert");

  // Buat elemen jika belum ada di DOM
  if (!alertBox) {
    alertBox = document.createElement("div");
    alertBox.id = "customAlert";
    alertBox.className = "custom-alert";
    alertBox.innerHTML = `
      <div class="custom-alert-content">
        <ion-icon class="alert-icon" name="${icon}"></ion-icon>
        <p id="alertMessage">${message}</p>
        <button id="alertCloseBtn" class="alert-close-btn">OK</button>
      </div>
    `;
    document.body.appendChild(alertBox);
  } else {
    alertBox.querySelector(".alert-icon").setAttribute("name", icon);
    alertBox.querySelector("#alertMessage").textContent = message;
  }

  alertBox.classList.add("active");

  const closeBtn = alertBox.querySelector("#alertCloseBtn");
  closeBtn.onclick = () => {
    alertBox.classList.remove("active");
  };

  // Auto close setelah 3 detik
  setTimeout(() => {
    alertBox.classList.remove("active");
  }, 3000);
}

// FUNGSI KIRIM EMAIL DENGAN FORMSPREE
if (form) { // Memastikan form elemen ada
  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah form submit default (page refresh)

    // Reset tombol ke disabled saat mulai pengiriman
    formBtn.setAttribute("disabled", "");
    formBtn.querySelector("span").textContent = "Sending..."; // Ubah teks tombol

    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });

    fetch(form.action, {
      method: form.method,
      headers: {
        'Content-Type': 'application/json', // Penting untuk Formspree dengan JSON
        'Accept': 'application/json'
      },
      body: JSON.stringify(object)
    })
    .then(response => {
      if (response.ok) {
        showAlert("Message sent successfully. Thank you!", "checkmark-circle-outline");
        form.reset(); // Bersihkan form
        formBtn.querySelector("span").textContent = "Send Message"; // Kembalikan teks tombol
        // Tombol tetap disabled karena form kosong
      } else {
        response.json().then(data => {
          if (Object.hasOwnProperty.call(data, 'errors')) {
            showAlert("Oops! There was a problem sending the message: " + data["errors"].map(error => error["message"]).join(", "), "alert-circle-outline");
          } else {
            showAlert("Oops! There was a problem sending your message.", "alert-circle-outline");
          }
        }).catch(() => {
          showAlert("Oops! Server error while sending your message.", "alert-circle-outline");
        });
        formBtn.removeAttribute("disabled"); // Aktifkan kembali tombol jika gagal
        formBtn.querySelector("span").textContent = "Send Message"; // Kembalikan teks tombol
      }
    })
    .catch(error => {
      showAlert("Oops! There is a connection problem: " + error.message, "alert-circle-outline");
      formBtn.removeAttribute("disabled"); // Aktifkan kembali tombol jika ada error jaringan
      formBtn.querySelector("span").textContent = "Send Message"; // Kembalikan teks tombol
    });
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let j = 0; j < pages.length; j++) { // Ganti i dengan j untuk loop pages
      if (this.dataset.pageBtn === pages[j].dataset.page) { // Gunakan data-page-btn
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active"); // Ini mungkin perlu disesuaikan jika index nav dan page tidak sama
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
      }
    }
    // Perbaiki active state navbar link secara terpisah
    navigationLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');

    // Tambahan: Pastikan tampilan proyek kembali ke list saat berpindah halaman
    const detailView = document.querySelector('.project-detail-view');
    const projectListUL = document.querySelector('.project-list');
    const filterList = document.querySelector('.filter-list');
    const filterSelectBox = document.querySelector('.filter-select-box');

    if (detailView && projectListUL) {
        detailView.style.display = 'none';
        projectListUL.style.display = 'grid';
        if (filterList) filterList.style.display = 'flex';
        if (filterSelectBox) filterSelectBox.style.display = 'block';
    }

  });
}
