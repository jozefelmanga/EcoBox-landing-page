# Rapport de Projet

> Note: le projet a été mis à jour pour utiliser des modules ES (dossier `js/`). Le fichier legacy `script.js` a été neutralisé. Vous pouvez supprimer `script.js` si votre déploiement charge `js/main.js` via `type="module"` dans `index.html`.

## 1. Introduction

EcoBox – Sustainable Packaging Solutions est une page vitrine destinée aux petites et moyennes entreprises souhaitant adopter des emballages écoresponsables, 100 % biodégradables et personnalisables. Le projet met l’accent sur la valorisation d’une offre verte tout en appliquant les fondamentaux du développement front-end.

## 2. Cahier des charges / Objectifs

- Mettre en avant la mission écologique d’EcoBox et ses solutions d’emballages durables.
- Distinguer clairement les sections clés : À propos, Services, Équipe, Contact avec un accès rapide au devis en ligne.
- Appliquer une charte graphique naturelle (tons verts, textures organiques) pour refléter l’engagement environnemental.
- Assurer un rendu responsive, clair et minimaliste, facilement extensible pour de futures fonctionnalités.

## 3. Conception

**Structure du dossier**

```
/projet-html-css-js
├── index.html
├── styles.css
├── script.js
└── /images
```

**Structure HTML**
La page s’articule autour d’un `header` présentant la mission écologique, d’une `nav` ciblant les sections À propos, Services, Équipe et Contact, d’un `main` détaillant l’offre et d’un `footer` orienté vers le devis rapide et les coordonnées.

**Charte graphique**
Palette déclinée dans les verts (#2b9348, #55a630) pour évoquer la durabilité, associée à des beiges ou gris clairs rappelant des textures naturelles. Les titres adoptent une police sans empattement moderne à fort impact, tandis que le corps du texte reste sobre avec `Arial`, `Roboto` ou `Open Sans` pour renforcer la lisibilité.

**Outils utilisés**

- VS Code avec l’extension Live Server pour le rafraîchissement automatique.
- Navigateur web (Chrome, Firefox) pour les tests d’affichage.
- Outils de développement intégrés au navigateur pour l’inspection des éléments et le debug CSS.

## 4. Implémentation (Code et explications)

**Exemple de code HTML**

```html
<header>
  <h1>EcoBox – Sustainable Packaging Solutions</h1>
  <nav>
    <ul>
      <li><a href="#about">À propos</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#team">Équipe</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>
```

**Exemple de code CSS**

```css
header {
  background-color: #2b9348;
  color: #f6fff8;
  padding: 24px;
  background-image: linear-gradient(
    135deg,
    rgba(43, 147, 72, 0.95),
    rgba(85, 166, 48, 0.85)
  );
}

nav ul {
  list-style: none;
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}
```

## 5. Résultat final

- Intégrer des captures d’écran (desktop et mobile) dans `images/` montrant les textures naturelles et les sections clés.
- Documenter le comportement responsive : menus repliés, blocs de services empilés, lisibilité des appels à l’action.
- Optionnel : proposer un lien de démonstration (GitHub Pages, Netlify, Vercel) pour tester la navigation et la demande de devis en ligne.

## 6. Difficultés rencontrées et solutions

- Ajustement des contrastes entre les tons verts et les textures naturelles : résolu en testant plusieurs combinaisons de couleurs et en vérifiant l’accessibilité (WCAG AA).
- Intégration d’icônes et d’illustrations écologiques sans alourdir la page : optimisées en SVG compressés pour conserver la performance.
- Rendu mobile du menu : amélioré grâce à `display: flex`, à un bouton burger et à des media queries spécifiques.

## 7. Conclusion

Ce projet a renforcé la capacité à structurer un message de marque durable, à maîtriser la stylisation CSS autour d’une charte écoresponsable et à garantir une expérience responsive. Il pose les bases nécessaires pour enrichir EcoBox avec des fonctionnalités dynamiques (simulateur de devis, catalogue de matériaux) et ouvrir la voie à un futur développement web plus complet.
