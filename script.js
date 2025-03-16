// Initialisation des données
let argent = parseInt(localStorage.getItem('argent')) || 0;
let gainParClic = parseInt(localStorage.getItem('gainParClic')) || 1;
let upgradePrice = parseInt(localStorage.getItem('upgradePrice')) || 10;
let wheelPrice = parseInt(localStorage.getItem('wheelPrice')) || 1000;


// Fonction pour mettre à jour l'affichage des informations
function updateDisplay() {
    document.getElementById('argent').innerText = argent;
    document.getElementById('gain-par-clic').innerText = gainParClic;
    document.getElementById('upgrade-price').innerText = upgradePrice;
    document.getElementById('wheel-price').innerText = wheelPrice;

    const upgradeBtn = document.getElementById('upgrade-btn');
    if (argent >= upgradePrice) {
        upgradeBtn.classList.remove('disabled');
        upgradeBtn.classList.add('enabled');
    } else {
        upgradeBtn.classList.remove('enabled');
        upgradeBtn.classList.add('disabled');
    }

    const wheelBtn = document.getElementById('wheel-btn');
    if (argent >= wheelPrice) {
        wheelBtn.classList.remove('disabled');
        wheelBtn.classList.add('enabled');
    } else {
        wheelBtn.classList.remove('enabled');
        wheelBtn.classList.add('disabled');
    }

    if (argent >= 1000000 || argent >= 10000) {
        document.body.classList.add('bg-high-wealth');
    } else {
        document.body.classList.remove('bg-high-wealth');
    }
}

// Fonction de clic (ajout de l'argent)
function clickAction() {
    argent += gainParClic;
    localStorage.setItem('argent', argent);
    updateDisplay();
}

// Améliorer la compétence (augmente le gain par clic)
function upgradeSkill() {
    if (argent >= upgradePrice) {
        argent -= upgradePrice;
        gainParClic++;
        upgradePrice = Math.floor(upgradePrice * 1.2);
        wheelPrice += Math.floor(Math.random() * (100 - 10 + 1)) + 10;
        
        localStorage.setItem('argent', argent);
        localStorage.setItem('gainParClic', gainParClic);
        localStorage.setItem('upgradePrice', upgradePrice);
        localStorage.setItem('wheelPrice', wheelPrice);
        
        updateDisplay();
    } else {
        alert('Il vous faut plus d\'argent pour améliorer !');
    }
}

// Lancer la roue
function spinWheel() {
    if (argent >= wheelPrice) {
        argent -= wheelPrice;
        localStorage.setItem('argent', argent);
        wheelPrice = Math.round(wheelPrice * (Math.random() * (1.5 - 1.1) + 1.1));
        localStorage.setItem('wheelPrice', wheelPrice);
        
        const gain = Math.floor(Math.random() * (10000 - 10 + 1)) + 10;
        const clicBonus = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        argent += gain;
        gainParClic += clicBonus;
        
        localStorage.setItem('argent', argent);
        localStorage.setItem('gainParClic', gainParClic);
        
        document.getElementById('message').innerText = `Vous avez gagné ${gain} € et ${clicBonus} € par clic !`;
        updateDisplay();
        document.getElementById('wheel-btn').style.display = 'none';
    } else {
        alert('Il vous faut plus d\'argent pour lancer la roue !');
    }
}

// Afficher le bouton de la roue toutes les minutes
function showWheelButton() {
    const wheelBtn = document.getElementById('wheel-btn');
    if (argent >= wheelPrice) {
        wheelBtn.style.display = 'inline-block';
    }
}

// Réinitialiser la progression
function resetProgress() {
    const confirmation = confirm("Êtes-vous de vouloir réinitialiser la progression ? Cette action est irréversible.");
    if (confirmation) {
        localStorage.removeItem('argent');
        localStorage.removeItem('gainParClic');
        localStorage.removeItem('upgradePrice');
        localStorage.removeItem('wheelPrice');
        
        argent = 0;
        gainParClic = 1;
        upgradePrice = 10;
        wheelPrice = 1000;
        
        localStorage.setItem('argent', argent);
        localStorage.setItem('gainParClic', gainParClic);
        localStorage.setItem('upgradePrice', upgradePrice);
        localStorage.setItem('wheelPrice', wheelPrice);
        
        updateDisplay();
    }
}

// Ajouter des événements
document.getElementById('reset-btn').addEventListener('click', resetProgress);
document.getElementById('click-btn').addEventListener('click', clickAction);
document.getElementById('upgrade-btn').addEventListener('click', upgradeSkill);
document.getElementById('wheel-btn').addEventListener('click', spinWheel);

// Met à jour l'affichage au démarrage
updateDisplay();

// Afficher le bouton de la roue chaque minute
setInterval(showWheelButton, 60000);
