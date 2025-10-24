'use strict';

// ==============================================================================
// 1. ELEMENT TOGGLE FUNCTION & SIDEBAR
// ==============================================================================

/**
 * element toggle function
 * @param {HTMLElement} elem - Element yang akan di-toggle class 'active'-nya.
 */
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}


// ==============================================================================
// 2. TESTIMONIALS MODAL
// ==============================================================================

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
    if (modalContainer) modalContainer.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < (testimonialsItem ? testimonialsItem.length : 0); i++) {
    testimonialsItem[i].addEventListener("click", function () {
        if (modalImg && modalTitle && modalText) {
            modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
            modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
            modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
            modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
            testimonialsModalFunc();
        }
    });
}

// add click event to modal close button
if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
// add click event to overlay
if (overlay) {
    overlay.addEventListener("click", testimonialsModalFunc);
}


// ==============================================================================
// 3. CONTACT FORM VARIABLES & VALIDATION
// ==============================================================================

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input fields for validation
for (let i = 0; i < (formInputs ? formInputs.length : 0); i++) {
    formInputs[i].addEventListener("input", function () {
        // Cek validitas semua input
        const isAllValid = Array.from(formInputs).every(input => input.checkValidity());

        if (formBtn) {
            if (isAllValid) {
                formBtn.removeAttribute("disabled");
            } else {
                formBtn.setAttribute("disabled", "");
            }
        }
    });
}


// ==============================================================================
// 4. CUSTOM ALERT SYSTEM (SOLUSI MASALAH ANDA)
// ==============================================================================

/**
 * Menampilkan notifikasi alert kustom.
 * @param {string} message - Pesan yang akan ditampilkan dalam notifikasi.
 * @param {string} icon - Nama ikon ionicons (e.g., 'checkmark-circle-outline').
 */
function showAlert(message, icon) {
    // Pastikan elemen alertBox ada di DOM
    const alertBox = document.querySelector("[data-alert]"); 
    
    if (!alertBox) {
        console.error("Elemen notifikasi tidak ditemukan. Pastikan Anda telah menambahkan elemen dengan [data-alert] di index.html.");
        return; 
    }

    // Perbarui konten notifikasi
    const alertIcon = alertBox.querySelector(".alert-icon");
    const alertMessage = alertBox.querySelector(".alert-message");

    // Lakukan pembaruan hanya jika elemen ada
    if (alertIcon) alertIcon.name = icon; 
    if (alertMessage) alertMessage.textContent = message;

    // Tampilkan notifikasi dengan menambahkan class 'active'
    alertBox.classList.add("active");

    // Sembunyikan notifikasi setelah 4 detik
    setTimeout(() => {
        alertBox.classList.remove("active");
    }, 4000); 
}


// ==============================================================================
// 5. CONTACT FORM SUBMISSION LOGIC (SOLUSI MASALAH ANDA)
// ==============================================================================

if (form && formBtn) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // 1. Tampilkan status loading
        formBtn.innerHTML = '<ion-icon name="sync-outline" class="loader"></ion-icon><span>Mengirim...</span>'; 
        formBtn.setAttribute("disabled", true);
        
        // Ambil data form
        const formData = new FormData(this);
        const formObject = Object.fromEntries(formData.entries());

        // CONTOH ASUMSI PENGGUNAAN FETCH API
        // GANTI DENGAN URL DAN OPSI PENGIRIMAN EMAIL ANDA YANG SEBENARNYA
        fetch("https://formspree.io/f/mrbynrzj", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Tambahkan header lain seperti API Key jika diperlukan
            },
            body: JSON.stringify(formObject),
        })
        .then(response => {
            // Cek apakah response sukses (status 200-299)
            if (response.ok) {
                // 2. Tampilkan notifikasi sukses
                showAlert("Your message has been sent successfully! Thank you.", "checkmark-circle-outline");
                this.reset(); // Reset form
                // Nonaktifkan tombol kembali
                formBtn.setAttribute("disabled", "");
            } else {
                // Jika response tidak OK, lempar error untuk ditangkap di blok catch
                throw new Error('Failed to send message. Status: ' + response.status);
            }
        })
        .catch(error => {
            console.error("Submission Error:", error);
            // 3. Tampilkan notifikasi error
            showAlert("Sorry, an error occurred while sending the message. Please try again.", "close-circle-outline");
        })
        .finally(() => {
            // 4. Kembalikan tampilan tombol ke normal
            formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
            // Catatan: Tombol akan tetap disabled sampai ada input baru atau jika submission gagal dan ingin diizinkan mencoba lagi.
            // Untuk mencoba lagi setelah gagal, Anda bisa menghapus disabled di sini:
            // if (!success) formBtn.removeAttribute("disabled"); 
        });
    });
}


// ==============================================================================
// 6. NAVIGATION & PAGE SWITCH
// ==============================================================================

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < (navigationLinks ? navigationLinks.length : 0); i++) {
    navigationLinks[i].addEventListener("click", function () {

        for (let j = 0; j < (pages ? pages.length : 0); j++) { 
            if (this.dataset.pageBtn === pages[j].dataset.page) { 
                pages[j].classList.add("active");
                window.scrollTo(0, 0); // Scroll ke atas
            } else {
                pages[j].classList.remove("active");
            }
        }
        
        // Perbaiki active state navbar link secara terpisah
        navigationLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');

        // Tambahan: Pastikan tampilan proyek kembali ke list saat berpindah halaman (jika ada)
        const detailView = document.querySelector('.project-detail-view');
        const projectListUL = document.querySelector('.project-list');
        const filterList = document.querySelector('.filter-list');
        const filterSelectBox = document.querySelector('.filter-select-box');

        if (detailView && projectListUL) {
            detailView.style.display = 'none';
            projectListUL.style.display = 'grid';
            if (filterList) filterList.style.display = 'flex';
            if (filterSelectBox) filterSelectBox.style.display = 'none';
        }
    });
}