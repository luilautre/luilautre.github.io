window.onload = function() {
  alert("Bienvenue sur mon site !");
randomNumber=Math.floor(Math.random() * 100) + 1
document.body.innerHTML += "<p>Nombre aléatoire : " + randomNumber + "</p>";
};
