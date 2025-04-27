// ============ Sabitler ============
const LOGIN_TC = "11111111111";      // sabit giriş bilgileri
const LOGIN_PASSWORD = "1234";
const DEFAULT_PROFILE = {
  name: "Oğuzhan Öğrenci",
  class: "5/A",
  tc: LOGIN_TC,
  email: "ogrenci@example.com",
  phone: "05550000000",
  parent: "05001112233"
};
const DEFAULT_GRADES = {
  term1: [
    {course:"Matematik", exam1:75, exam2:80, project:90},
    {course:"Türkçe", exam1:70, exam2:85, project:88},
    {course:"Fen", exam1:65, exam2:70, project:78},
    {course:"Sosyal", exam1:82, exam2:79, project:85},
    {course:"Robotik Kodlama", exam1:95, exam2:92, project:100},
    {course:"Yazılım", exam1:88, exam2:90, project:93},
    {course:"Endüstriyel Tasarım", exam1:80, exam2:83, project:87},
  ],
  term2: [
    {course:"Matematik", exam1:0, exam2:0, project:0},
    {course:"Türkçe", exam1:0, exam2:0, project:0},
    {course:"Fen", exam1:0, exam2:0, project:0},
    {course:"Sosyal", exam1:0, exam2:0, project:0},
    {course:"Robotik Kodlama", exam1:0, exam2:0, project:0},
    {course:"Yazılım", exam1:0, exam2:0, project:0},
    {course:"Endüstriyel Tasarım", exam1:0, exam2:0, project:0},
  ]
};

// ======== Yardımcı Fonksiyonlar ========
const LS = {
  getProfile: () => JSON.parse(localStorage.getItem("profile")) || DEFAULT_PROFILE,
  setProfile: (p) => localStorage.setItem("profile", JSON.stringify(p)),
  getGrades: () => JSON.parse(localStorage.getItem("grades")) || DEFAULT_GRADES,
  setGrades: (g) => localStorage.setItem("grades", JSON.stringify(g)),
};
const avg = (e1,e2,pr) => Math.round((e1+e2+pr)/3);

function renderProfile(){
  const p = LS.getProfile();
  document.getElementById("student-name").textContent = p.name;
  document.getElementById("profile-card").innerHTML = `
    <p><strong>Sınıf:</strong> ${p.class}</p>
    <p><strong>TC:</strong> ${p.tc}</p>
    <p><strong>Email:</strong> ${p.email}</p>
    <p><strong>Telefon:</strong> ${p.phone}</p>
    <p><strong>Veli:</strong> ${p.parent}</p>`;
}

function renderGrades(){
  const g = LS.getGrades();
  ["term1","term2"].forEach((term,i)=>{
    const tbody = document.querySelector(`#grades-table-${i+1} tbody`);
    tbody.innerHTML="";
    g[term].forEach(row=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.course}</td>
        <td>${row.exam1}</td>
        <td>${row.exam2}</td>
        <td>${row.project}</td>
        <td><strong>${avg(row.exam1,row.exam2,row.project)}</strong></td>`;
      tbody.appendChild(tr);
    });
  });
}

// ======== Giriş İşlemi ========
document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();
  const tc = document.getElementById("tc").value.trim();
  const pw = document.getElementById("password").value.trim();
  const err = document.getElementById("login-error");
  if(tc===LOGIN_TC && pw===LOGIN_PASSWORD){
    err.style.display="none";
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    // localStorage'a varsayılanlar
    if(!localStorage.getItem("profile")) LS.setProfile(DEFAULT_PROFILE);
    if(!localStorage.getItem("grades")) LS.setGrades(DEFAULT_GRADES);
    renderProfile();
    renderGrades();
  } else {
    err.style.display="block";
  }
});

// ======== Profil Modalı ========
const modal = document.getElementById("modal");
const openModal = () => {
  const p = LS.getProfile();
  ["name","class","tc","email","phone","parent"].forEach(k=>{
    document.getElementById(`p-${k}`).value = p[k];
  });
  modal.classList.remove("hidden");
};
const closeModal = () => modal.classList.add("hidden");

document.getElementById("actionBtn").addEventListener("click", openModal);
document.getElementById("close-modal").addEventListener("click", closeModal);

document.getElementById("profile-form").addEventListener("submit", e => {
  e.preventDefault();
  const updated = {
    ...LS.getProfile(),
    email: document.getElementById("p-email").value.trim(),
    phone: document.getElementById("p-phone").value.trim(),
    parent: document.getElementById("p-parent").value.trim(),
  };
  LS.setProfile(updated);
  renderProfile();
  closeModal();
});

// ======== Çıkış Yap ========
document.getElementById("logout-btn").addEventListener("click", () => {
  closeModal();
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
  document.getElementById("login-form").reset();
});
