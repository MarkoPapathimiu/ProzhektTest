const fundetShprehjes = [
    "train hard.",
    "set new records.",
    "conquer your goals.",
    "go further than yesterday.",
    "become the best version of yourself."
];

let ePara = 0;

// Function to change the quote part
function ndryshoShprehjen() {
    const ndryshimet = document.getElementById('ndryshimet');
    ePara = (ePara + 1) % fundetShprehjes.length;
    ndryshimet.textContent = fundetShprehjes[ePara];
}

setInterval(ndryshoShprehjen, 3000);
