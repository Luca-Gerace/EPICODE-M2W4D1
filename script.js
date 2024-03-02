/*
PARTE 1: 
Oggi analizzeremo un problema molto comune: realizzare algoritmi di ricerca.
Il tuo compito è creare una funzione che cercherà per posizione lavorativa E posizione geografica. Questi due valori verranno passati come parametri
Ti abbiamo fornito un array chiamato "jobs" in fondo al file, NON modificarlo in alcun modo.
L'algoritmo che devi realizzare cercherà SIA per posizione lavorativa che per posizione geografica.
Prendi queste tre inserzioni ad esempio:

      job1:  location: "NY, US",     title: "java dev"
      job2:  location: "Genoa, IT"   title: "web dev"
      job3:  location: "US"      title: "dev"

Cercando contemporaneamente come posizione lavorativa "dev" e posizione geografica "US", dovresti ottenere come risultato solamente job1 e job3,
in quanto job2 non soddisfa la condizione posta sulla posizione geografica.

REQUISITI:
- il tuo algoritmo deve tornare i risultati nella seguente forma:
{
  result: [], <-- inserisci qui le inserzioni che rispecchiano la posizione lavorativa e la posizione geografica richiesta
  count: 0 <-- inserisci qui il numero totale delle inserzioni trovate
}

- la tua ricerca deve essere "case insensitive" (non deve essere influenzata da lettere maiuscole o minuscole nelle parole cercate). Questo e' possibile trasformando tutto in lettere minuscole con .toLowerCase()


PARTE 2: 
Nella pagina HTML, inserisci 2 input di tipo testo (uno per la location e uno per il titolo lavorativo, ricordati di diversificarli con un id) e un bottone con valore “cerca”

Al click del bottone, il codice deve raccogliere i valori dei due input e darli in pasto alla funzione che hai creato nella parte 1. 

Dopo aver raccolto ed elaborato i dati, e’ il momento di mostrare i risultati sulla pagina: 
    Puoi scegliere tu se utilizzare un semplice ul / li oppure una tabella 
    Vai passo per passo e usa molti console.log per capire eventualmente dove sbagli
    SUGGERIMENTO: ti servira’ un ciclo for!

*/

// NON MODIFICARE QUESTO ARRAY!
const jobs = [
  { title: "Marketing Intern", location: "US, NY, New York" },
  {
    title: "Customer Service - Cloud Video Production",
    location: "NZ, Auckland",
  },
  {
    title: "Commissioning Machinery Assistant (CMA)",
    location: "US, IA, Wever",
  },
  {
    title: "Account Executive - Washington DC",
    location: "US, DC, Washington",
  },
  { title: "Bill Review Manager", location: "US, FL, Fort Worth" },
  { title: "Accounting Clerk", location: "US, MD," },
  { title: "Head of Content (m/f)", location: "DE, BE, Berlin" },
  {
    title: "Lead Guest Service Specialist",
    location: "US, CA, San Francisco",
  },
  { title: "HP BSM SME", location: "US, FL, Pensacola" },
  {
    title: "Customer Service Associate - Part Time",
    location: "US, AZ, Phoenix",
  },
  {
    title: "ASP.net Developer Job opportunity at United States,New Jersey",
    location: "US, NJ, Jersey City",
  },
  {
    title: "Talent Sourcer (6 months fixed-term contract)",
    location: "GB, LND, London",
  },
  {
    title: "Applications Developer, Digital",
    location: "US, CT, Stamford",
  },
  { title: "Installers", location: "US, FL, Orlando" },
  { title: "Account Executive - Sydney", location: "AU, NSW, Sydney" },
  {
    title: "VP of Sales - Vault Dragon",
    location: "SG, 01, Singapore",
  },
  { title: "Hands-On QA Leader", location: "IL, Tel Aviv, Israel" },
  {
    title: "Southend-on-Sea Traineeships Under NAS 16-18 Year Olds Only",
    location: "GB, SOS, Southend-on-Sea",
  },
  { title: "Visual Designer", location: "US, NY, New York" },
  {
    title: "Process Controls Engineer - DCS PLC MS Office - PA",
    location: "US, PA, USA Northeast",
  },
  { title: "Marketing Assistant", location: "US, TX, Austin" },
  { title: "Front End Developer", location: "NZ, N, Auckland" },
  { title: "Engagement Manager", location: "AE," },
  {
    title: "Vice President, Sales and Sponsorship (Businessfriend.com)",
    location: "US, CA, Carlsbad",
  },
  { title: "Customer Service", location: "GB, LND, London" },
  { title: "H1B SPONSOR FOR L1/L2/OPT", location: "US, NY, New York" },
  { title: "Marketing Exec", location: "SG," },
  {
    title: "HAAD/DHA Licensed Doctors Opening in UAE",
    location: "AE, AZ, Abudhabi",
  },
  {
    title: "Talent Management Process Manager",
    location: "US, MO, St. Louis",
  },
  { title: "Customer Service Associate", location: "CA, ON, Toronto" },
  {
    title: "Customer Service Technical Specialist",
    location: "US, MA, Waltham",
  },
  { title: "Software Applications Specialist", location: "US, KS," },
  { title: "Craftsman Associate", location: "US, WA, Everett" },
  { title: "Completion Engineer", location: "US, CA, San Ramon" },
  { title: "I Want To Work At Karmarama", location: "GB, LND," },
  {
    title: "English Teacher Abroad",
    location: "US, NY, Saint Bonaventure",
  },
]

/* --------- VARIABLES --------- */

// Puntatori
const btn = document.getElementById("searchButton");
const errorMessage = document.getElementById("errorMessage");
const jobCounter = document.getElementById("jobCounter");
const jobLocationInput = document.getElementById("jobLocation");
const jobTitleInput = document.getElementById("jobTitle");
const orderAsList = document.getElementById("orderAsList");
const orderAsGrid = document.getElementById("orderAsGrid");
const searchFilter = document.getElementById("searchFilter");
const resultImg = document.getElementById("resultImg");
const resultsList = document.getElementById("resultsList");

// Inizializzo oggetto con conteggio e array risultati annunci
let jobsResearch = {
  count: 0,
  result: []
};

/* --------- FUNCTIONS --------- */

// Funzione di ricerca annunci
function searchJobs(title, location) {

  // Trasformo in lower case i value inseriti dall'utente
  let jobTitleValue = title.toLowerCase();
  let jobLocationValue = location.toLowerCase();

  // Controllo se i caratteri inseriti dall'utente > 2 altrimenti esco dalla funzione di ricerca ritornando un errore
  if (jobTitleValue.length < 2 && jobLocationValue.length < 2) {
    jobTitleInput.classList.add("error");
    jobLocationInput.classList.add("error");
    errorMessage.textContent = "Please enter at least 2 characters to start a search.";

    return;
  }

  // Resetto l'html della lista degli annunci per la prossima ricerca
  resultsList.innerHTML = '';

  // Resetto jobsResearch per la prossima ricerca
  jobsResearch = {
    count: 0,
    result: []
  };

  // Booleano di controllo per verificare che ci siano annunci
  let foundResults = false;

  // Ciclo sull'array jobs
  for (let i = 0; i < jobs.length; i++) {

    // Trasformo in lower case i valori dell'array jobs
    let title = jobs[i].title.toLowerCase();
    let location = jobs[i].location.toLowerCase();

    // Controllo se i valori dell'array sono inclusi nei valori inseriti dall'utente
    if (title.includes(jobTitleValue) && location.includes(jobLocationValue)) {
      
      // Pusho l'oggetto job nell'array jobsResearch
      jobsResearch.result.push(jobs[i])

      // Aggiorno il conteggio degli annunci
      jobsResearch.count++;

      // Parte la funzione che crea le card con gli annunci
      createJobCard(jobs[i]);

      // Parte la funzione che conteggia gli annunci
      updateCounter(jobsResearch.count);

      // Aggiorno il booleano di controllo a true se trovo annunci
      foundResults = true;
    }
  }
  
  // Se non trovo annunci lancio la funzione di conteggio con 0 annunci
  if (!foundResults) {
    updateCounter(0);
  }

  // Check per capire quale layout utilizzare
  if (orderAsGrid.classList.contains("active")) {
    cardsLayout(true);
  } else {
    cardsLayout(false);
  }
}

// Funzione per la gestione del layout delle cards
function cardsLayout(isGrid) {
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    if (isGrid) {
      cards[i].classList.add("grid");
    } else {
      cards[i].classList.remove("grid");
    }
  }
}

// Funzione per ripulire gli errori su input e rimuovere il messaggio d'errore
function clearError() {
  jobTitleInput.classList.remove("error");
  jobLocationInput.classList.remove("error");
  errorMessage.textContent = "";
}

// Funzione per creare la card con l'annuncio di lavoro
function createJobCard(job) {
  let li = document.createElement("li");
  li.classList.add("card", "flex", "col", "jcsb", "gap-xs");

  let titleElement = document.createElement("h3");
  titleElement.textContent = job.title;
  li.appendChild(titleElement);

  let locationElement = document.createElement("p");
  locationElement.textContent = job.location;
  li.appendChild(locationElement);

  resultsList.appendChild(li);
}

// Funzione di update conteggio numero annunci
function updateCounter(n) {

  // Pulisce l'area dei risultati
  jobCounter.innerHTML = '';

  const h4 = document.createElement("h4");

  // Check sul Counter per mostrare il numero di annunci
  if (n) {
    const listing = n > 1 ? "listings" : "listing";
    h4.innerHTML = `<span class="primary">${n}</span> job ${listing} of your <span class="primary">dreams</span> found`;
    // nascondo div con illustrazione
    resultImg.classList.add("none");
  } else {
    h4.innerHTML = `No results found`;
    // mostro illustrazione no results
    resultImg.classList.remove("none")
    resultImg.classList.add("no-results-img");
  }

  jobCounter.appendChild(h4);
}

/* --------- EVENT LISTENER --------- */

// Event listener per iniziare una ricerca di annunci di lavoro
btn.addEventListener("click", function() {

  // Parte la funzione di ricerca annunci
  searchJobs(jobTitleInput.value, jobLocationInput.value);

  // Console log dell'oggetto jobsResearch
  console.log(jobsResearch);
});

// Event listener per impostare il layout delle card a lista
orderAsList.addEventListener("click", function() {
  orderAsList.classList.add("active");
  orderAsGrid.classList.remove("active");
  resultsList.classList.add("col");
  cardsLayout(false);
});

// Event listener per impostare il layout delle card a griglia
orderAsGrid.addEventListener("click", function() {
  orderAsList.classList.remove("active");
  orderAsGrid.classList.add("active");
  resultsList.classList.remove("col");
  cardsLayout(true);
});

// Event listener che lancia la funzione di rimozione degli errori
jobTitleInput.addEventListener("focus", clearError)
jobLocationInput.addEventListener("focus", clearError)