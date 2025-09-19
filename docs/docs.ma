#  Documentation du projet : Tic Tac Toe dynamique

## 1. Présentation du projet

Ce projet est une version améliorée du jeu **Tic Tac Toe**.
Contrairement à la version classique (3×3 et alignement de 3 symboles), ce jeu permet :

* de personnaliser la taille de la grille (entre 3×3 et 10×10),
* de choisir le nombre de symboles alignés nécessaires pour gagner,
* de modifier les symboles des joueurs,
* de sauvegarder les scores et la configuration dans le **localStorage**,
* d’afficher des messages interactifs et une interface modale de configuration.

---

## 2. Variables globales

```js
var gridSize = 3;             
var winCondition = 3;        
var player1Symbol = 'X';      
var player2Symbol = 'O';      
var currentPlayer = 1;        
var gameBoard = [];           
var gameOver = false;         
var scores = { player1: 0, player2: 0 };
```

---

## 3. Fonctions principales

###  `initGame()`

* But : Initialiser le jeu au chargement.
* Actions :

  * Charger les données sauvegardées (`loadGameData`),
  * Créer la grille (`createGameBoard`),
  * Mettre à jour les infos (`updateGameInfo` et `updateScoreDisplay`),
  * Configurer les événements (`setupEvents`).

---

###  `setupEvents()`

* But : Attacher les événements aux boutons de l’interface.
* Exemple :

  * `apply-config` → appliquer une configuration rapide,
  * `new-game` → commencer une nouvelle partie,
  * `reset-scores` → réinitialiser les scores,
  * Gestion de l’ouverture/fermeture du modal de paramètres.

---

###  `createGameBoard()`

* But : Générer la grille dynamique.
* Étapes :

  1. Réinitialiser `gameBoard`.
  2. Créer un tableau vide de taille `gridSize`.
  3. Générer dynamiquement des boutons `<button>` représentant chaque cellule.
  4. Associer un événement `onclick` à chaque cellule → `playMove(row, col)`.

---

###  `playMove(row, col)`

* But : Gérer le coup joué par un joueur.
* Étapes :

  1. Vérifier si la partie est terminée ou la cellule déjà remplie.
  2. Ajouter le symbole du joueur (`X` ou `O`).
  3. Vérifier une victoire (`checkWin`).
  4. Vérifier une égalité (`isBoardFull`).
  5. Sinon → changer de joueur et mettre à jour l’affichage.

---

###  `checkWin(row, col)`

* But : Vérifier si le dernier coup a permis de gagner.
* Logique :

  * Vérifie dans **4 directions** (horizontal, vertical, diagonale ↘ et diagonale ↙).
  * Compte le nombre de symboles alignés.
  * Si `count >= winCondition`, alors victoire → met en surbrillance (`highlightWinningCells`).

---

###  `highlightWinningCells(cells)`

* But : Ajouter la classe CSS `winning` aux cellules gagnantes.

---

###  `isBoardFull()`

* Vérifie si toutes les cases sont occupées → retourne `true` si égalité.

---

###  `endGame(winner)`

* Termine la partie :

  * `winner = 0` → match nul,
  * `winner = 1 ou 2` → victoire du joueur.
* Met à jour les scores + sauvegarde (`saveGameData`) + message de victoire.

---

###  `newGame()`

* Réinitialise la partie sans réinitialiser les scores.

---

###  `applyConfiguration()`

* Applique une nouvelle configuration saisie dans les champs principaux :

  * Vérifie la validité (taille, condition de victoire, symboles),
  * Met à jour `gridSize`, `winCondition`, `player1Symbol`, `player2Symbol`,
  * Sauvegarde et redémarre une partie.

---

###  `openModal()` et `closeModal()`

* Ouvrir et fermer la fenêtre modale de paramètres.

---

###  `applyModalSettings()`

* Même logique que `applyConfiguration()`, mais via la fenêtre modale.
* Synchronise les champs principaux avec les nouvelles valeurs.

---

###  `resetScores()`

* Réinitialise les scores après confirmation utilisateur.
* Met à jour l’affichage et sauvegarde.

---

###  `updateGameInfo()`

* Met à jour l’interface :

  * Joueur actuel,
  * Taille de la grille,
  * Condition de victoire.

---

###  `updateScoreDisplay()`

* Met à jour l’affichage des scores et des symboles.

---

###  `showMessage(text, type)`

* Affiche un message (succès, erreur, victoire, match nul).
* Masque automatiquement si c’est un succès.

---

###  `hideMessage()`

* Cache le message affiché.

---

###  `saveGameData()` et `loadGameData()`

* Utilise **localStorage** pour sauvegarder/restaurer :

  * Taille de la grille,
  * Condition de victoire,
  * Symboles,
  * Scores.

---

## 4. Cycle de fonctionnement du jeu

1. Chargement de la page → `initGame()`.
2. L’utilisateur joue → `playMove()`.
3. Vérification → victoire (`checkWin`) ou égalité (`isBoardFull`).
4. Mise à jour des scores et affichages.
5. Configuration possible via boutons ou modal.
6. Données persistantes grâce à `localStorage`.

---

## 5. Améliorations possibles

* Ajouter un mode **joueur vs ordinateur (IA)**,
* Ajouter un **mode en ligne multijoueur**,
* Rendre l’interface plus responsive,
* Ajouter des animations de victoire plus avancées.

---

## 6. Conclusion

Ce projet illustre un **Tic Tac Toe dynamique, configurable et interactif** en JavaScript.
Il combine :

* **Manipulation DOM** (création dynamique d’éléments),
* **Gestion des événements**,
* **Logique algorithmique** (conditions de victoire),
* **Stockage persistant** (localStorage).
