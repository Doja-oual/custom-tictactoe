#  Tic Tac Toe Dynamique

##  Présentation du projet
**Nom du projet :** Tic Tac Toe Dynamique  
**Entreprise :** PlayInnovate  
**Objectif :** Créer un jeu de Tic Tac Toe évolutif où la taille de la grille (n x n) et le nombre d’alignements requis pour gagner (k) sont configurables. L’interface doit être intuitive, responsive et les scores persistants via `localStorage`.

---

##  Fonctionnalités principales
- Grille dynamique **n × n** configurable.  
- Deux joueurs alternent leurs tours (le joueur 1 commence).  
- Détection automatique du gagnant (horizontal, vertical, diagonal) selon **k**.  
- Gestion des matchs nuls.  
- Choix des symboles pour chaque joueur.  
- Affichage du joueur actif et des scores persistants.  
- Boutons :  
  -  Recommencer une partie  
  - Réinitialiser les scores  
- Responsive design (desktop, tablette, mobile).

---

##  Technologies utilisées
- **HTML5** – Structure de la page  
- **CSS3** – Styles et responsive design  
- **JavaScript Vanilla** – Logique du jeu, DOM et `localStorage`

---

##  Architecture du projet
tic-tac-toe-dynamique
 index.html → Page principale
 style.css → Styles et responsive
 script.js → Logique du jeu (DOM + localStorage)
 README.md → Documentation et instructions

 
---

##  Documentation technique

### 1. Logique du jeu
- Gestion des tours alternés (`currentPlayer`)  
- Placement de symboles sur la grille (case libre uniquement)  
- Vérification de la victoire après chaque coup :  
  - Horizontal  
  - Vertical  
  - Diagonales principales et secondaires  
- Détection du match nul (grille remplie sans gagnant)

### 2. Gestion des paramètres
- Taille de la grille **n** configurable  
- Nombre d’alignements pour gagner **k** configurable  
- Choix des symboles pour les joueurs (X ou O)

### 3. Persistance des données
- Scores et préférences sauvegardés dans `localStorage`  
- Chargement automatique des données au démarrage

### 4. UI et Responsive
- Grille générée dynamiquement selon n × n  
- Barre d’état : joueur actif, alignements nécessaires (k), scores  
- Boutons de contrôle pour recommencer ou réinitialiser le jeu  
- Design flexible via CSS Grid/Flexbox pour tous les écrans

### 5. Tests et validation
- Vérification des conditions de victoire pour différentes tailles de grille et valeurs de k  
- Cas limites : k > n, match nul, clic sur une case remplie  
- Test multi-support 

---

##  Installation et utilisation
1. Cloner le dépôt :  
```bash
git clone https://github.com/Doja-oual/custom-tictactoe.git
