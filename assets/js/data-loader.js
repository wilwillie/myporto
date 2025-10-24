let cachedProjects = []; // Ini sudah ada, pastikan tidak dihapus

function renderSidebar(info) {
  document.querySelector('.name').textContent = info.name;
  document.querySelector('.title').textContent = info.title;
  document.querySelector('.avatar-box img').src = info.avatar;

  const contacts = document.querySelectorAll('.contacts-list .contact-item');
  contacts[0].querySelector('.contact-link').textContent = info.contacts.email;
  contacts[0].querySelector('.contact-link').href = `mailto:${info.contacts.email}`;
  contacts[1].querySelector('.contact-link').textContent = info.contacts.mobileNumber;
  // Perbaikan: Pastikan link WhatsApp menggunakan format yang benar dan target _blank
  contacts[1].querySelector('.contact-link').href = `https://wa.me/${info.contacts.mobileNumber.replace(/\D/g,'')}`; // Hapus non-digit
  contacts[1].querySelector('.contact-link').target = "_blank";
  contacts[2].querySelector('.contact-link').textContent = info.contacts.personalInterest; // Menggunakan time tag
  contacts[3].querySelector('address').textContent = info.contacts.address;

  // Tombol download resume sudah ditambahkan di HTML, tidak perlu JavaScript di sini.

  const socialList = document.querySelector('.social-list');
  socialList.innerHTML = info.social.map(s => `
    <li class="social-item">
      <a href="${s.url}" class="social-link" target="_blank" rel="noopener noreferrer"><ion-icon name="${s.icon}"></ion-icon></a>
    </li>
  `).join('');
}

function renderAbout(aboutArray) {
  const section = document.querySelector('.about-text');
  section.innerHTML = aboutArray.map(p => `<p>${p}</p>`).join('');
}

function renderServices(services) {
  const list = document.querySelector('.service-list');
  list.innerHTML = services.map(s => `
    <li class="service-item">
      <div class="service-icon-box">
        <img src="${s.icon}" alt="${s.title}" width="40">
      </div>
      <div class="service-content-box">
        <h4 class="h4 service-item-title">${s.title}</h4>
        <p class="service-item-text">${s.description}</p>
      </div>
    </li>
  `).join('');
}

// Fungsi untuk render Testimonials
// function renderTestimonials(testimonials) {
//     const list = document.querySelector('.testimonials-list');
//     if (!list) return;
//     list.innerHTML = testimonials.map(t => `
//         <li class="testimonials-item" data-testimonials-item>
//             <div class="content-card">
//                 <figure class="testimonials-avatar-box">
//                     <img src="${t.avatar}" alt="${t.name}" width="60" data-testimonials-avatar>
//                 </figure>
//                 <h4 class="h4 testimonials-item-title" data-testimonials-title>${t.name}</h4>
//                 <div class="text" data-testimonials-text>
//                     <p>${t.text}</p>
//                 </div>
//             </div>
//         </li>
//     `).join('');
// }

function renderEducation(education) {
  const list = document.querySelector('.edu-list');
  if (!list) return;
  list.innerHTML = education.map(e => `
    <li class="timeline-item">
      <h4 class="h4 timeline-item-title">${e.school}</h4>
      <span>${e.years}</span>
      <p class="timeline-text">${e.major}${e.gpa ? `, GPA: ${e.gpa}` : ''}</p>
    </li>
  `).join('');
}

function renderExperience(experience) {
  const list = document.querySelector('.exp-list');
  if (!list) return;
  list.innerHTML = experience.map(e => `
    <li class="timeline-item">
      <h4 class="h4 timeline-item-title">${e.position} @ ${e.company}</h4>
      <span>${e.years}</span>
      <p class="timeline-text">${e.description}</p>
    </li>
  `).join('');
}

function renderSkills(skills) {
  const list = document.querySelector('.skills-list');
  if (!list) return;
  list.innerHTML = skills.map(s => `
    <li class="skills-item">
      <div class="title-wrapper">
        <h5 class="h5">${s.name}</h5>
        <data value="${s.level}">${s.level}%</data>
      </div>
      <div class="skill-progress-bg">
        <div class="skill-progress-fill" style="width: ${s.level}%"></div>
      </div>
    </li>
  `).join('');
}


// --- FUNGSI PROYEK BARU DENGAN PERBAIKAN ---

function renderProjects(projects) {
  cachedProjects = projects;
  const list = document.querySelector('.project-list');
  if (!list) return; // Pastikan elemen ada

  list.innerHTML = projects.map(p => `
    <li class="project-item" data-filter-item data-category="${p.type}" onclick="showProjectDetail('${p.name}')">
      <figure class="project-img">
        <div class="project-item-icon-box">
          <ion-icon name="eye-outline"></ion-icon>
        </div>
        <img src="./assets/images/projek/${p.thumb}" alt="${p.name}" loading="lazy">
      </figure>
      <h3 class="project-title">${p.name}</h3>
      <p class="project-category">${p.type}</p>
    </li>
  `).join('');

  filterFunc('all');
}

function showProjectDetail(projectName) {
  const p = cachedProjects.find(x => x.name === projectName);
  if (!p) {
    console.error("Project not found:", projectName);
    return;
  }

  const projectListSection = document.querySelector('.portfolio .projects');
  const projectListUL = document.querySelector('.project-list');
  const filterList = document.querySelector('.filter-list');
  const filterSelectBox = document.querySelector('.filter-select-box');
  const detailView = document.querySelector('.project-detail-view'); // Gunakan class baru

  // Sembunyikan elemen daftar proyek dan filternya
  if (projectListUL) projectListUL.style.display = 'none';
  if (filterList) filterList.style.display = 'none';
  if (filterSelectBox) filterSelectBox.style.display = 'none';

  // Tampilkan elemen detail proyek
  if (detailView) detailView.style.display = 'block';

  let rolesHtml = '';
  if (p.role) {
    rolesHtml = `<p><strong>Roles:</strong> ${Array.isArray(p.role) ? p.role.join(', ') : p.role}</p>`;
  }

  let technologiesHtml = '';
  if (p.technologies && p.technologies.length > 0) {
    technologiesHtml = `<p><strong>Tech:</strong> ${p.technologies.join(', ')}</p>`;
  }

  let contributorsHtml = '';
  if (p.contributors && p.contributors.length > 0) {
    contributorsHtml = `<p><strong>Contributors:</strong> ${p.contributors.join(', ')}</p>`;
  }

  let galleryHtml = '';
  if (p.gallery && p.gallery.length > 0) {
    galleryHtml = `
      <div class="project-gallery-section">
        <div class="swiper project-swiper"> <div class="swiper-wrapper">
            ${p.gallery.map(img => `
              <div class="swiper-slide">
                <div class="image-wrapper"> <img src="./assets/images/projek/${img}" alt="Project image" loading="lazy">
                </div>
              </div>
            `).join('')}
          </div>
          <div class="swiper-pagination"></div>

          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>

          <div class="swiper-scrollbar"></div>
        </div>
      </div>
    `;
  }

  if (detailView) {
    detailView.innerHTML = `
      <button onclick="backToList()" class="back-to-list-btn">
        <ion-icon name="arrow-back-outline"></ion-icon> Back to list
      </button>
      <h2>${p.name}</h2>
      ${galleryHtml}
      ${rolesHtml}
      ${technologiesHtml}
      <p><strong>Description:</strong> ${p.longDescription || p.description}</p>
      ${contributorsHtml}
      ${p.source ? `<p><a href="${p.source}" target="_blank" rel="noopener noreferrer">Source Code / Live Demo</a></p>` : ''}
    `;
    window.scrollTo(0, 0); // Gulir ke atas halaman saat detail terbuka

    // --- INISIALISASI SWIPER DI SINI ---
  // Pastikan Swiper diinisialisasi HANYA JIKA ada galeri
  if (p.gallery && p.gallery.length > 0) {
    setTimeout(() => { // Gunakan setTimeout untuk memastikan DOM sudah terupdate
      const swiperElement = document.querySelector('.project-swiper');
      if (swiperElement) { // Pastikan elemen Swiper ditemukan
        new Swiper(swiperElement, {
          direction: 'horizontal',
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          scrollbar: {
            el: '.swiper-scrollbar',
          },
          autoplay: {
            delay: 3000, // Ganti slide setiap 3 detik
            disableOnInteraction: false,
          },
          // Responsif breakpoints (opsional, untuk tampilan berbeda di ukuran layar berbeda)
          breakpoints: {
            320: { // Ukuran mobile kecil
              slidesPerView: 1,
              spaceBetween: 10
            },
            768: { // Tablet
              slidesPerView: 1,
              spaceBetween: 20
            },
            1024: { // Desktop
              slidesPerView: 1,
              spaceBetween: 30
            }
          }
        });
      }
    }, 50); // Delay kecil untuk memastikan DOM sudah dirender
  }
  }
}

function backToList() {
  const projectListUL = document.querySelector('.project-list');
  const filterList = document.querySelector('.filter-list');
  const filterSelectBox = document.querySelector('.filter-select-box');
  const detailView = document.querySelector('.project-detail-view'); // Gunakan class baru

  // Sembunyikan elemen detail proyek
  if (detailView) detailView.style.display = 'none';

  // Tampilkan kembali elemen daftar proyek dan filternya
  if (projectListUL) projectListUL.style.display = 'grid'; // Pastikan kembali ke grid
  if (filterList) filterList.style.display = 'flex'; // Tampilkan kembali filter
  if (filterSelectBox) filterSelectBox.style.display = 'block'; // Tampilkan kembali filter dropdown
  window.scrollTo(0, 0); // Gulir ke atas halaman saat kembali ke daftar
}

// Fungsi filter (akan dipanggil dari script.js)
function filterFunc(selectedValue) {
  const projectItems = document.querySelectorAll('.project-item');
  projectItems.forEach(item => {
    const category = item.dataset.category ? item.dataset.category.toLowerCase() : '';
    if (selectedValue === 'all' || category === selectedValue) {
      item.style.display = 'block'; /* Biarkan display block, CSS global akan menangani grid */
    } else {
      item.style.display = 'none';
    }
  });
}