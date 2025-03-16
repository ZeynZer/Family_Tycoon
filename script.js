// Initialisation des données
let argent = parseInt(localStorage.getItem('argent')) || 0;
let gainParClic = parseInt(localStorage.getItem('gainParClic')) || 1;
let upgradePrice = parseInt(localStorage.getItem('upgradePrice')) || 10;
let wheelPrice = parseInt(localStorage.getItem('wheelPrice')) || 1000;
let gainAuto = parseInt(localStorage.getItem('gainAuto')) || 0;
let autoIncomePrice = parseInt(localStorage.getItem('autoIncomePrice')) || 50;


function gainAutomatique() {
    argent += gainAuto; // Ajoute le gain automatique chaque seconde
    localStorage.setItem('argent', argent); // Sauvegarde l'argent
    updateDisplay(); // Met à jour l'affichage
}

// Fonction pour mettre à jour l'affichage des informations
function updateDisplay() {
    // Affiche l'argent, le gain par clic et le prix d'amélioration
    document.getElementById('argent').innerText = argent;
    document.getElementById('gain-par-clic').innerText = gainParClic;
    document.getElementById('upgrade-price').innerText = upgradePrice;
    document.getElementById('wheel-price').innerText = wheelPrice;
    document.getElementById('auto-income-price').innerText = autoIncomePrice;

    const autoIncomeBtn = document.getElementById('auto-income-btn');
    if (argent >= autoIncomePrice) {
        autoIncomeBtn.classList.remove('disabled');
        autoIncomeBtn.classList.add('enabled');
    } else {
        autoIncomeBtn.classList.remove('enabled');
        autoIncomeBtn.classList.add('disabled');
    }


    // Mise à jour de l'état du bouton d'amélioration
    const upgradeBtn = document.getElementById('upgrade-btn');
    if (argent >= upgradePrice) {
        upgradeBtn.classList.remove('disabled');
        upgradeBtn.classList.add('enabled');
    } else {
        upgradeBtn.classList.remove('enabled');
        upgradeBtn.classList.add('disabled');
    }

    // Mise à jour de l'état du bouton de la roue
    const wheelBtn = document.getElementById('wheel-btn');
    if (argent >= wheelPrice) {
        wheelBtn.classList.remove('disabled');
        wheelBtn.classList.add('enabled');
    } else {
        wheelBtn.classList.remove('enabled');
        wheelBtn.classList.add('disabled');
    }
    if (argent >= 1000000) {
        document.body.classList.add('bg-high-wealth');
    } else {
        document.body.classList.remove('bg-high-wealth');
    }
    if (argent >= 10000) {
        document.body.classList.add('bg-high-wealthe');
    } else {
        document.body.classList.remove('bg-high-wealthe');
    }
}

function acheterRevenuPassif() {
    if (argent >= autoIncomePrice) {
        argent -= autoIncomePrice; // Déduire l'argent
        gainAuto++; // Augmenter le gain automatique
        autoIncomePrice = Math.floor(autoIncomePrice * 1.5); // Augmenter le prix

        // Sauvegarde
        localStorage.setItem('argent', argent);
        localStorage.setItem('gainAuto', gainAuto);
        localStorage.setItem('autoIncomePrice', autoIncomePrice);

        updateDisplay(); // Mettre à jour l'affichage
    } else {
        alert("Vous n'avez pas assez d'argent pour acheter un revenu passif !");
    }
}


// Fonction de clic (ajouter de l'argent)
function clickAction() {
    argent += gainParClic; // Ajoute de l'argent selon le gain par clic
    localStorage.setItem('argent', argent); // Sauvegarde l'argent
    updateDisplay(); // Met à jour l'affichage
}

// Améliorer la compétence (augmente le gain par clic)
function upgradeSkill() {
    if (argent >= upgradePrice) { // Si l'on a assez d'argent pour améliorer
        argent -= upgradePrice; // Déduit l'argent pour l'amélioration
        gainParClic++; // Augmente le gain par clic
        upgradePrice = Math.floor(upgradePrice * 1.2); // Augmente le prix d'amélioration de 20%

        // Augmenter le prix de la roue de manière aléatoire (par exemple, entre 10 et 100 €)
        wheelPrice += Math.floor(Math.random() * (100 - 10 + 1)) + 10;

        localStorage.setItem('argent', argent);
        localStorage.setItem('gainParClic', gainParClic);
        localStorage.setItem('upgradePrice', upgradePrice); // Sauvegarde le nouveau prix d'amélioration
        localStorage.setItem('wheelPrice', wheelPrice); // Sauvegarde le nouveau prix de la roue
        
        updateDisplay(); // Met à jour l'affichage
    } else {
        alert('Il vous faut plus d\'argent pour améliorer !');
    }
}

// Lancer la roue
function spinWheel() {
    if (argent >= wheelPrice) {
        argent -= wheelPrice; // Déduit le coût de la roue
        localStorage.setItem('argent', argent); // Sauvegarde l'argent
        
        wheelPrice = Math.round(wheelPrice * (Math.random() * (1.5 - 1.1) + 1.1));
        localStorage.setItem('wheelPrice', wheelPrice); // Sauvegarde le nouveau prix de la roue

        // Générer un gain aléatoire entre 10 et 10000 €
        const gain = Math.floor(Math.random() * (10000 - 10 + 1)) + 10;
        // Générer un bonus de clic aléatoire entre 1 et 10
        const clicBonus = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

        argent += gain; // Ajouter l'argent gagné
        gainParClic += clicBonus; // Ajouter le bonus au gain par clic

        localStorage.setItem('argent', argent);
        localStorage.setItem('gainParClic', gainParClic);

        // Affichage du message avec ce qu'on a gagné
        document.getElementById('message').innerText = `Vous avez gagné ${gain} € et ${clicBonus} € par clic !`;

        updateDisplay(); // Met à jour l'affichage après le gain

        // Masquer le bouton de la roue après qu'il soit cliqué
        document.getElementById('wheel-btn').style.display = 'none';
    } else {
        alert('Il vous faut plus d\'argent pour lancer la roue !');
    }
}


// Afficher le bouton de la roue toutes les minutes
function showWheelButton() {
    const wheelBtn = document.getElementById('wheel-btn');
    // Afficher le bouton seulement si l'on a assez d'argent pour la roue
    if (argent >= wheelPrice) {
        wheelBtn.style.display = 'inline-block';
    }
}



// Réinitialiser la progression
function resetProgress() {
    const confirmation = confirm("Êtes-vous sûr de vouloir réinitialiser la progression ? Cette action est irréversible.");
    if (confirmation) {
        // Supprimer les données sauvegardées dans localStorage
        localStorage.removeItem('argent');
        localStorage.removeItem('gainParClic');
        localStorage.removeItem('upgradePrice');
        localStorage.removeItem('wheelPrice');

        // Remettre les valeurs initiales
        argent = 0;
        gainParClic = 1;
        upgradePrice = 10;
        wheelPrice = 1000;

        // Sauvegarder les nouvelles valeurs dans localStorage
        localStorage.setItem('argent', argent);
        localStorage.setItem('gainParClic', gainParClic);
        localStorage.setItem('upgradePrice', upgradePrice);
        localStorage.setItem('wheelPrice', wheelPrice);

        updateDisplay(); // Mettre à jour l'affichage
    }
}

setInterval(gainAutomatique, 1000);
document.getElementById('auto-income-btn').addEventListener('click', acheterRevenuPassif);

// Ajouter un événement pour le bouton de réinitialisation
document.getElementById('reset-btn').addEventListener('click', resetProgress);
document.getElementById('click-btn').addEventListener('click', clickAction);
document.getElementById('upgrade-btn').addEventListener('click', upgradeSkill);
document.getElementById('wheel-btn').addEventListener('click', spinWheel);

// Met à jour l'affichage au démarrage
updateDisplay();

// Afficher le bouton de la roue chaque minute
setInterval(showWheelButton, 60000); // Appeler cette fonction toutes les 60 secondes
