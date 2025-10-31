<!DOCTYPE html>
<html lang="fr">
<head>
  <span id="wts2195503"></span>
  <script>
    var wts=document.createElement('script');wts.async=true;
    wts.src='https://app.ardalio.com/wts7.js';document.head.appendChild(wts);
    wts.onload = function(){ wtsl7(2195503,18); };
  </script>
  <noscript><img src="https://app.ardalio.com/7/18/2195503.png"></noscript>

  <meta charset="utf-8">
  <title>luilautre | messagerie gratuite et plusieurs jeux</title>
  <meta name="description" content="Bienvenue chez luilautre vous retrouverez des jeux-vidéos comme dessine ton jeu une messagerie gratuite et bien d'autres"/>
  <meta name="keywords" content="jeux-vidéos, dessine ton jeu, messagerie gratuite" />
  <meta name="google-site-verification" content="a4bNKJnqP5jE35HIOj76BRI37Bf-ibiU4Ek9nKkpwsk" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="style.css">
  <link rel="icon" href="favicon.png" type="image/x-icon">

<?php
// Liste d'événements (au format mois-jour)
$events = [
    ["date" => "10-31", "title" => "Halloween 🎃", "background" => "/halloween.png"],
    ["date" => "11-01", "title" => "Toussaint 🕯️", "background" => "/toussaint.png"],
    ["date" => "12-25", "title" => "Noël 🎄", "background" => "/noel.png"],
    ["date" => "01-01", "title" => "Nouvel an 🎆", "background" => "/nAn.png"]
];

$today = date("m-d");

// Fond par défaut
$background = "/blank.png";
$currentEvent = null;

// Recherche de l’événement du jour
foreach ($events as $event) {
    if ($event["date"] === $today) {
        $background = $event["background"];
        $currentEvent = $event;
        break;
    }
}
?>

<style>
body {
  background: url('<?= htmlspecialchars($background) ?>') no-repeat center center fixed;
  background-size: cover;
  transition: background 0.6s ease-in-out;
}
</style>

</head>
<body>
  <h1>Bienvenue chez luilautre !</h1>

  <div id="buttons">
      <a href="/message.html"><p>messages</p></a>
      <a href="/share"><p>fichiers</p></a>
      <a href="/games"><p>Jeux</p></a>
      <a href="/scratch-site"><p>luilautre_code</p></a>
  </div>

  <button id="theme-toggle" aria-label="Changer de thème">🌙</button>
  <p>par : Achille Boulanger</p><br>

  <script src="script.js"></script>

  <?php
    $heure = date("H");
    if ($heure < 16) {
      echo "<p>Bonjour, ";
    } else {
      echo "<p>Bonsoir, ";
    }
    echo "aujourd'hui, nous sommes le " . date("d/m/Y") . ".</p>";
  ?>

  <section>
    <h2>Événement du jour</h2>
    <?php if ($currentEvent): ?>
      <p><?= htmlspecialchars($currentEvent["title"]) ?></p>
    <?php else: ?>
      <p>Aucun événement prévu aujourd’hui.</p>
    <?php endif; ?>
  </section>

</body>
</html>
