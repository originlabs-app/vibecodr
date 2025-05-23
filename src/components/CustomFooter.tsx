import React from "react";
import Footer from "./Footer"; // Chemin local
// import Link from 'next/link'; // Pas nécessaire ici si les liens sont dans Footer.tsx

// Définir le type pour les liens, doit correspondre à celui de Footer.tsx
interface FooterLink {
  key: string; // Pour la traduction du nom
  href: string;
  isExternal?: boolean;
  disabled?: boolean;
}

const CustomFooter: React.FC = () => {
  // Les liens spécifiques à la landing page sont passés ici
  // Les liens de base (FAQ, Blog, etc.) sont gérés dans Footer.tsx
  // On pourrait aussi choisir de tout gérer dans Footer.tsx et ne pas avoir CustomFooter
  // Pour l'instant, je garde la structure que vous aviez.
  const landingPageSpecificLinks: FooterLink[] = [
    // Exemple: Si vous voulez ajouter des liens spécifiques UNIQUEMENT pour la landing page
    // { key: "ourVisionDetailed", href: "/vision-detaillee" }, 
  ];

  return (
    <Footer 
      additionalLinks={landingPageSpecificLinks}
    />
  );
};

export default CustomFooter; 