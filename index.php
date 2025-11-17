<!DOCTYPE html>
<?php
// #buttons <- div principale (ctrl+f, <div id="buttons">)
?>
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
  <title>luilautre | plusieurs jeux</title>
  <meta name="description" content="Bienvenue chez luilautre vous retrouverez des jeux-vidéos comme dessine ton jeu une messagerie gratuite et bien d'autres"/>
  <meta name="keywords" content="jeux-vidéos, dessine ton jeu, messagerie gratuite" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="style.css">
  <link rel="icon" href="favicon.png" type="image/x-icon">

<?php
// Liste d'événements (mois-jour)
$events = [
    ["date" => "10-31", "title" => "Joyeux halloween 🎃", "class" => "halloween-bg"],
    ["date" => "12-25", "title" => "Joyeux noël 🎄", "class" => "noel-bg"],
    ["date" => "01-01", "title" => "Joyeux nouvel an 🎆", "class" => "nouvelan-bg"]
];

$today = date("m-d");
$bgClass = 'default-bg';
$currentEvent = null;

// Recherche de l’événement du jour
foreach ($events as $event) {
    if ($event["date"] === $today) {
        $bgClass = $event["class"];
        $currentEvent = $event;
        break;
    }
}
?>

<style>
/* Fonds des événements */
body.default-bg { background: url('/blank.jpg') no-repeat center center fixed; background-size: cover; }
body.halloween-bg { background: url('/halloween.jpg') no-repeat center center fixed; background-size: cover; }
body.noel-bg { background: url('/noel.jpg') no-repeat center center fixed; background-size: cover; }
body.nouvelan-bg { background: url('/nAn.jpg') no-repeat center center fixed; background-size: cover; }

body {
  transition: background 0.6s ease-in-out, filter 0.6s ease-in-out;
}

/* Mode sombre */
body.dark {
  filter: brightness(0.5);
}
</style>

</head>
<body class="<?= $bgClass ?>">

  <h1>Bienvenue chez luilautre !</h1>

  <div id="buttons">
      <a href="/message.html"><p>messages</p></a>
      <a href="https://luilautre.github.io/share"><p>fichiers</p></a>
      <a href="https://luilautre.github.io/games"><p>Jeux</p></a>
      <a href="https://luilautre.github.io/scratch-site"><p>luilautre_code</p></a>
      <a href="https://juke-app-mh0q.onrender.com/"><p>luilautre_code</p></a>
  </div>

  <button id="theme-toggle" aria-label="Changer de thème">🌙</button>
  <p>par : Achille Boulanger</p><br>

  <script>
    // Toggle mode sombre
    const btn = document.getElementById('theme-toggle');
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
  </script>

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
    <?php if ($currentEvent): ?>
      <p><?= htmlspecialchars($currentEvent["title"]) ?></p>
    <?php endif; ?>
  </section>

</body>
</html>
