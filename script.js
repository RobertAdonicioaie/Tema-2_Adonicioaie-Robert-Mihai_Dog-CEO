// 1. Selectarea Elementelor din DOM
const dogImage = document.getElementById('dog-image');
const fetchBtn = document.getElementById('fetch-btn');
const historyTableBody = document.querySelector('#history-table tbody');

// URL-ul API-ului
const API_URL = "https://dog.ceo/api/breeds/image/random";

// Variabilă pentru contorizarea cererilor (ID în tabel)
let searchCount = 0;

// 2. Funcția Asincronă Principală
async function fetchDog() {
    // Clean Code: Logăm începutul operațiunii
    console.log("--- Începere cerere API ---");

    try {
        // A. Trimiterea cererii (Fetch)
        const response = await fetch(API_URL);

        // Verificăm dacă serverul a răspuns cu succes (status 200-299)
        if (!response.ok) {
            throw new Error(`Eroare HTTP: ${response.status}`);
        }

        // B. Transformarea răspunsului în JSON
        const data = await response.json();
        console.log("Date primite cu succes:", data); // Log pentru debug

        // C. Actualizarea Interfeței (Imaginea)
        dogImage.src = data.message;

        // D. Extragerea Rasei din URL
        // URL-ul arată cam așa: https://images.dog.ceo/breeds/beagle/n02088364_112.jpg
        // Folosim split('/') pentru a sparge textul. Rasa este de obicei al 5-lea element (index 4).
        const urlParts = data.message.split('/');
        const breedName = urlParts[4] || "Necunoscut";

        // E. Adăugarea în Istoric
        addToTable(breedName, data.status);

    } catch (error) {
        // Gestionarea Erorilor
        console.error("A apărut o problemă:", error);
        alert("Nu am putut încărca imaginea. Verifică conexiunea la internet.");
    }
}

// 3. Funcție Helper pentru actualizarea tabelului
function addToTable(breed, status) {
    searchCount++; // Incrementăm ID-ul

    // Creăm un rând nou (tr)
    const row = document.createElement('tr');

    // Construim HTML-ul rândului
    // Folosim style="text-transform: capitalize;" pentru a face prima literă a rasei mare
    row.innerHTML = `
        <td>${searchCount}</td>
        <td style="text-transform: capitalize;">${breed}</td>
        <td><span style="color: green; font-weight: bold;">${status}</span></td>
    `;

    // Adăugăm rândul la începutul tabelului (prepend) ca să vedem ultima căutare sus
    historyTableBody.prepend(row);
    
    console.log(`Tabel actualizat: ID ${searchCount} - Rasa ${breed}`);
}

// 4. Evenimente
// Ascultăm click-ul pe buton
fetchBtn.addEventListener('click', fetchDog);

// Opțional: Încărcăm un câine automat când se deschide pagina
document.addEventListener('DOMContentLoaded', fetchDog);