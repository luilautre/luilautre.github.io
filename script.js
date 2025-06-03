window.onload = function() {
  // Exemple 1 : Phrase ou mot aléatoire
  let phrases = [
    "Bienvenue sur mon site !",
    "Aujourd'hui est une belle journée 🌞",
    "Restez créatif et curieux !",
    "N'oubliez pas de sourire 😊",
    "La vie est faite pour être vécue 🎉"
  ];

  let randomIndex = Math.floor(Math.random() * phrases.length);
  let randomPhrase = phrases[randomIndex];

  // Afficher la phrase dans un élément de la page
  let phraseElement = document.createElement("p");
  phraseElement.textContent = randomPhrase;
  phraseElement.style.fontSize = "24px";
  phraseElement.style.textAlign = "center";
  document.body.appendChild(phraseElement);

  // Exemple 2 : Image aléatoire (optionnel)
  let images = [
    "image1.png",
    "image2.png",
    "image3.png"
  ];
  let randomImage = images[Math.floor(Math.random() * images.length)];
  let imgElement = document.createElement("img");
  imgElement.src = randomImage;
  imgElement.alt = "Image aléatoire";
  imgElement.style.display = "block";
  imgElement.style.margin = "20px auto";
  imgElement.style.maxWidth = "300px";
  document.body.appendChild(imgElement);
};
