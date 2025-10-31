<!DOCTYPE html>
<html lang="fr">
<head>
  <span id="wts2195503"></span>
  <script>var wts=document.createElement('script');wts.async=true;
  wts.src='https://app.ardalio.com/wts7.js';document.head.appendChild(wts);
  wts.onload = function(){ wtsl7(2195503,18); };
  </script><noscript><img src="https://app.ardalio.com/7/18/2195503.png"></noscript>
  <meta charset="utf-8">
  <title>luilautre | messagerie gratuite et plusieurs jeux</title>
  <meta name="description" content="Bienvenue chez luilautre vous retrouverez des jeux-vidéos comme dessine ton jeu une messagerie gratuite et bien d'autres"/>
  <meta name="keywords" content="jeux-vidéos, dessine ton jeu, messagerie gratuite" />
  <script>
    (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "tankwn4e84");
  </script>
  <meta name="google-site-verification" content="a4bNKJnqP5jE35HIOj76BRI37Bf-ibiU4Ek9nKkpwsk" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="style.css">
  <link rel="icon" href="favicon.png" type="image/x-icon">
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
    <script src="script.js"><a href="/comments.html">bug</a></script>
    <?php
      $heure = date("H");
      if ($heure < 16) {
        echo "<p>Bonjour, ";
      } else {
        echo "<p>Bonsoir, ";
      }
      echo "aujourd'hui, nous sommes le " . date("d/m/Y") . ".</p>";
    ?>
<?php
// Liste d'événements
$events = [
    ["date" => "2025-10-31", "title" => "Halloween 🎃"],
    ["date" => "2025-11-01", "title" => "Toussaint 🕯️"],
    ["date" => "2025-12-25", "title" => "Noël 🎄"],
    ["date" => "2026-01-01", "title" => "Nouvel an 🎆"]
];

$today = date("Y-m-d");

// On cherche l’événement du jour
$currentEvent = null;
foreach ($events as $event) {
    if ($event["date"] === $today) {
        $currentEvent = $event;
        break;
    }
}
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
