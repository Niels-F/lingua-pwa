import React, { useState, useEffect } from 'react';

const CONTENT_INDEX_URL = 'https://raw.githubusercontent.com/Niels-F/lingua-content/main/index.json';

// A1-A2 Italian ↔ French content
const VOCAB = [
  // Greetings & Social
  { id: 1, it: 'Ciao', fr: 'Salut', cat: 'greetings' },
  { id: 2, it: 'Buongiorno', fr: 'Bonjour', cat: 'greetings' },
  { id: 3, it: 'Buonasera', fr: 'Bonsoir', cat: 'greetings' },
  { id: 4, it: 'Buonanotte', fr: 'Bonne nuit', cat: 'greetings' },
  { id: 5, it: 'Arrivederci', fr: 'Au revoir', cat: 'greetings' },
  { id: 6, it: 'Grazie', fr: 'Merci', cat: 'greetings' },
  { id: 7, it: 'Prego', fr: 'De rien', cat: 'greetings' },
  { id: 8, it: 'Scusa', fr: 'Excuse-moi', cat: 'greetings' },
  { id: 9, it: 'Per favore', fr: 'S\'il vous plaît', cat: 'greetings' },
  { id: 10, it: 'Sì', fr: 'Oui', cat: 'greetings' },
  { id: 11, it: 'No', fr: 'Non', cat: 'greetings' },
  { id: 12, it: 'Bene', fr: 'Bien', cat: 'greetings' },
  { id: 13, it: 'Male', fr: 'Mal', cat: 'greetings' },
  { id: 14, it: 'Così così', fr: 'Comme ci comme ça', cat: 'greetings' },
  // Numbers
  { id: 15, it: 'Uno', fr: 'Un', cat: 'numbers' },
  { id: 16, it: 'Due', fr: 'Deux', cat: 'numbers' },
  { id: 17, it: 'Tre', fr: 'Trois', cat: 'numbers' },
  { id: 18, it: 'Quattro', fr: 'Quatre', cat: 'numbers' },
  { id: 19, it: 'Cinque', fr: 'Cinq', cat: 'numbers' },
  { id: 20, it: 'Sei', fr: 'Six', cat: 'numbers' },
  { id: 21, it: 'Sette', fr: 'Sept', cat: 'numbers' },
  { id: 22, it: 'Otto', fr: 'Huit', cat: 'numbers' },
  { id: 23, it: 'Nove', fr: 'Neuf', cat: 'numbers' },
  { id: 24, it: 'Dieci', fr: 'Dix', cat: 'numbers' },
  { id: 25, it: 'Venti', fr: 'Vingt', cat: 'numbers' },
  { id: 26, it: 'Trenta', fr: 'Trente', cat: 'numbers' },
  { id: 27, it: 'Cento', fr: 'Cent', cat: 'numbers' },
  // Colors
  { id: 28, it: 'Rosso', fr: 'Rouge', cat: 'colors' },
  { id: 29, it: 'Blu', fr: 'Bleu', cat: 'colors' },
  { id: 30, it: 'Verde', fr: 'Vert', cat: 'colors' },
  { id: 31, it: 'Giallo', fr: 'Jaune', cat: 'colors' },
  { id: 32, it: 'Nero', fr: 'Noir', cat: 'colors' },
  { id: 33, it: 'Bianco', fr: 'Blanc', cat: 'colors' },
  { id: 34, it: 'Arancione', fr: 'Orange', cat: 'colors' },
  { id: 35, it: 'Rosa', fr: 'Rose', cat: 'colors' },
  { id: 36, it: 'Viola', fr: 'Violet', cat: 'colors' },
  { id: 37, it: 'Marrone', fr: 'Marron', cat: 'colors' },
  // Family
  { id: 38, it: 'Madre', fr: 'Mère', cat: 'family' },
  { id: 39, it: 'Padre', fr: 'Père', cat: 'family' },
  { id: 40, it: 'Fratello', fr: 'Frère', cat: 'family' },
  { id: 41, it: 'Sorella', fr: 'Sœur', cat: 'family' },
  { id: 42, it: 'Nonno', fr: 'Grand-père', cat: 'family' },
  { id: 43, it: 'Nonna', fr: 'Grand-mère', cat: 'family' },
  { id: 44, it: 'Figlio', fr: 'Fils', cat: 'family' },
  { id: 45, it: 'Figlia', fr: 'Fille', cat: 'family' },
  { id: 46, it: 'Marito', fr: 'Mari', cat: 'family' },
  { id: 47, it: 'Moglie', fr: 'Femme', cat: 'family' },
  { id: 48, it: 'Zio', fr: 'Oncle', cat: 'family' },
  { id: 49, it: 'Zia', fr: 'Tante', cat: 'family' },
  { id: 50, it: 'Cugino', fr: 'Cousin', cat: 'family' },
  { id: 51, it: 'Famiglia', fr: 'Famille', cat: 'family' },
  { id: 52, it: 'Amico', fr: 'Ami', cat: 'family' },
  // Body
  { id: 53, it: 'Testa', fr: 'Tête', cat: 'body' },
  { id: 54, it: 'Occhio', fr: 'Œil', cat: 'body' },
  { id: 55, it: 'Naso', fr: 'Nez', cat: 'body' },
  { id: 56, it: 'Bocca', fr: 'Bouche', cat: 'body' },
  { id: 57, it: 'Orecchio', fr: 'Oreille', cat: 'body' },
  { id: 58, it: 'Mano', fr: 'Main', cat: 'body' },
  { id: 59, it: 'Piede', fr: 'Pied', cat: 'body' },
  { id: 60, it: 'Braccio', fr: 'Bras', cat: 'body' },
  { id: 61, it: 'Gamba', fr: 'Jambe', cat: 'body' },
  { id: 62, it: 'Cuore', fr: 'Cœur', cat: 'body' },
  { id: 63, it: 'Schiena', fr: 'Dos', cat: 'body' },
  // Food & Drink
  { id: 64, it: 'Acqua', fr: 'Eau', cat: 'food' },
  { id: 65, it: 'Pane', fr: 'Pain', cat: 'food' },
  { id: 66, it: 'Pasta', fr: 'Pâtes', cat: 'food' },
  { id: 67, it: 'Pizza', fr: 'Pizza', cat: 'food' },
  { id: 68, it: 'Carne', fr: 'Viande', cat: 'food' },
  { id: 69, it: 'Pesce', fr: 'Poisson', cat: 'food' },
  { id: 70, it: 'Formaggio', fr: 'Fromage', cat: 'food' },
  { id: 71, it: 'Frutta', fr: 'Fruit', cat: 'food' },
  { id: 72, it: 'Verdura', fr: 'Légumes', cat: 'food' },
  { id: 73, it: 'Caffè', fr: 'Café', cat: 'food' },
  { id: 74, it: 'Vino', fr: 'Vin', cat: 'food' },
  { id: 75, it: 'Birra', fr: 'Bière', cat: 'food' },
  { id: 76, it: 'Latte', fr: 'Lait', cat: 'food' },
  { id: 77, it: 'Uovo', fr: 'Œuf', cat: 'food' },
  { id: 78, it: 'Burro', fr: 'Beurre', cat: 'food' },
  { id: 79, it: 'Zucchero', fr: 'Sucre', cat: 'food' },
  { id: 80, it: 'Sale', fr: 'Sel', cat: 'food' },
  { id: 81, it: 'Riso', fr: 'Riz', cat: 'food' },
  { id: 82, it: 'Pollo', fr: 'Poulet', cat: 'food' },
  { id: 83, it: 'Mela', fr: 'Pomme', cat: 'food' },
  { id: 84, it: 'Arancia', fr: 'Orange', cat: 'food' },
  { id: 85, it: 'Pomodoro', fr: 'Tomate', cat: 'food' },
  // Places
  { id: 86, it: 'Casa', fr: 'Maison', cat: 'places' },
  { id: 87, it: 'Scuola', fr: 'École', cat: 'places' },
  { id: 88, it: 'Ufficio', fr: 'Bureau', cat: 'places' },
  { id: 89, it: 'Negozio', fr: 'Magasin', cat: 'places' },
  { id: 90, it: 'Ristorante', fr: 'Restaurant', cat: 'places' },
  { id: 91, it: 'Ospedale', fr: 'Hôpital', cat: 'places' },
  { id: 92, it: 'Farmacia', fr: 'Pharmacie', cat: 'places' },
  { id: 93, it: 'Banca', fr: 'Banque', cat: 'places' },
  { id: 94, it: 'Albergo', fr: 'Hôtel', cat: 'places' },
  { id: 95, it: 'Stazione', fr: 'Gare', cat: 'places' },
  { id: 96, it: 'Aeroporto', fr: 'Aéroport', cat: 'places' },
  { id: 97, it: 'Spiaggia', fr: 'Plage', cat: 'places' },
  { id: 98, it: 'Montagna', fr: 'Montagne', cat: 'places' },
  { id: 99, it: 'Città', fr: 'Ville', cat: 'places' },
  { id: 100, it: 'Supermercato', fr: 'Supermarché', cat: 'places' },
  { id: 101, it: 'Parco', fr: 'Parc', cat: 'places' },
  { id: 102, it: 'Biblioteca', fr: 'Bibliothèque', cat: 'places' },
  // Transport
  { id: 103, it: 'Macchina', fr: 'Voiture', cat: 'transport' },
  { id: 104, it: 'Autobus', fr: 'Bus', cat: 'transport' },
  { id: 105, it: 'Treno', fr: 'Train', cat: 'transport' },
  { id: 106, it: 'Aereo', fr: 'Avion', cat: 'transport' },
  { id: 107, it: 'Bicicletta', fr: 'Vélo', cat: 'transport' },
  { id: 108, it: 'Metro', fr: 'Métro', cat: 'transport' },
  { id: 109, it: 'Taxi', fr: 'Taxi', cat: 'transport' },
  { id: 110, it: 'Nave', fr: 'Bateau', cat: 'transport' },
  // Clothes
  { id: 111, it: 'Camicia', fr: 'Chemise', cat: 'clothes' },
  { id: 112, it: 'Pantaloni', fr: 'Pantalon', cat: 'clothes' },
  { id: 113, it: 'Gonna', fr: 'Jupe', cat: 'clothes' },
  { id: 114, it: 'Vestito', fr: 'Robe', cat: 'clothes' },
  { id: 115, it: 'Scarpe', fr: 'Chaussures', cat: 'clothes' },
  { id: 116, it: 'Cappello', fr: 'Chapeau', cat: 'clothes' },
  { id: 117, it: 'Giacca', fr: 'Veste', cat: 'clothes' },
  { id: 118, it: 'Borsa', fr: 'Sac', cat: 'clothes' },
  { id: 119, it: 'Occhiali', fr: 'Lunettes', cat: 'clothes' },
  // Weather
  { id: 120, it: 'Sole', fr: 'Soleil', cat: 'weather' },
  { id: 121, it: 'Pioggia', fr: 'Pluie', cat: 'weather' },
  { id: 122, it: 'Vento', fr: 'Vent', cat: 'weather' },
  { id: 123, it: 'Neve', fr: 'Neige', cat: 'weather' },
  { id: 124, it: 'Nuvola', fr: 'Nuage', cat: 'weather' },
  { id: 125, it: 'Caldo', fr: 'Chaud', cat: 'weather' },
  { id: 126, it: 'Freddo', fr: 'Froid', cat: 'weather' },
  { id: 127, it: 'Temporale', fr: 'Orage', cat: 'weather' },
  // Time
  { id: 128, it: 'Giorno', fr: 'Jour', cat: 'time' },
  { id: 129, it: 'Notte', fr: 'Nuit', cat: 'time' },
  { id: 130, it: 'Mattina', fr: 'Matin', cat: 'time' },
  { id: 131, it: 'Sera', fr: 'Soir', cat: 'time' },
  { id: 132, it: 'Settimana', fr: 'Semaine', cat: 'time' },
  { id: 133, it: 'Mese', fr: 'Mois', cat: 'time' },
  { id: 134, it: 'Anno', fr: 'An', cat: 'time' },
  { id: 135, it: 'Oggi', fr: 'Aujourd\'hui', cat: 'time' },
  { id: 136, it: 'Ieri', fr: 'Hier', cat: 'time' },
  { id: 137, it: 'Domani', fr: 'Demain', cat: 'time' },
  { id: 138, it: 'Adesso', fr: 'Maintenant', cat: 'time' },
  { id: 139, it: 'Sempre', fr: 'Toujours', cat: 'time' },
  { id: 140, it: 'Mai', fr: 'Jamais', cat: 'time' },
  { id: 141, it: 'Presto', fr: 'Tôt / Bientôt', cat: 'time' },
  // Days
  { id: 142, it: 'Lunedì', fr: 'Lundi', cat: 'days' },
  { id: 143, it: 'Martedì', fr: 'Mardi', cat: 'days' },
  { id: 144, it: 'Mercoledì', fr: 'Mercredi', cat: 'days' },
  { id: 145, it: 'Giovedì', fr: 'Jeudi', cat: 'days' },
  { id: 146, it: 'Venerdì', fr: 'Vendredi', cat: 'days' },
  { id: 147, it: 'Sabato', fr: 'Samedi', cat: 'days' },
  { id: 148, it: 'Domenica', fr: 'Dimanche', cat: 'days' },
  // Adjectives
  { id: 149, it: 'Grande', fr: 'Grand', cat: 'adjectives' },
  { id: 150, it: 'Piccolo', fr: 'Petit', cat: 'adjectives' },
  { id: 151, it: 'Bello', fr: 'Beau', cat: 'adjectives' },
  { id: 152, it: 'Brutto', fr: 'Laid', cat: 'adjectives' },
  { id: 153, it: 'Buono', fr: 'Bon', cat: 'adjectives' },
  { id: 154, it: 'Cattivo', fr: 'Mauvais', cat: 'adjectives' },
  { id: 155, it: 'Nuovo', fr: 'Nouveau', cat: 'adjectives' },
  { id: 156, it: 'Vecchio', fr: 'Vieux', cat: 'adjectives' },
  { id: 157, it: 'Caro', fr: 'Cher', cat: 'adjectives' },
  { id: 158, it: 'Economico', fr: 'Pas cher', cat: 'adjectives' },
  { id: 159, it: 'Facile', fr: 'Facile', cat: 'adjectives' },
  { id: 160, it: 'Difficile', fr: 'Difficile', cat: 'adjectives' },
  { id: 161, it: 'Alto', fr: 'Grand / Haut', cat: 'adjectives' },
  { id: 162, it: 'Basso', fr: 'Petit / Bas', cat: 'adjectives' },
  { id: 163, it: 'Stanco', fr: 'Fatigué', cat: 'adjectives' },
  { id: 164, it: 'Contento', fr: 'Content', cat: 'adjectives' },
  { id: 165, it: 'Triste', fr: 'Triste', cat: 'adjectives' },
  { id: 166, it: 'Arrabbiato', fr: 'En colère', cat: 'adjectives' },
  { id: 167, it: 'Simpatico', fr: 'Sympa', cat: 'adjectives' },
  { id: 168, it: 'Gentile', fr: 'Gentil', cat: 'adjectives' },
  // House
  { id: 169, it: 'Camera', fr: 'Chambre', cat: 'house' },
  { id: 170, it: 'Cucina', fr: 'Cuisine', cat: 'house' },
  { id: 171, it: 'Bagno', fr: 'Salle de bain', cat: 'house' },
  { id: 172, it: 'Salotto', fr: 'Salon', cat: 'house' },
  { id: 173, it: 'Giardino', fr: 'Jardin', cat: 'house' },
  { id: 174, it: 'Tavolo', fr: 'Table', cat: 'house' },
  { id: 175, it: 'Sedia', fr: 'Chaise', cat: 'house' },
  { id: 176, it: 'Letto', fr: 'Lit', cat: 'house' },
  { id: 177, it: 'Porta', fr: 'Porte', cat: 'house' },
  { id: 178, it: 'Finestra', fr: 'Fenêtre', cat: 'house' },
  // Animals
  { id: 179, it: 'Cane', fr: 'Chien', cat: 'animals' },
  { id: 180, it: 'Gatto', fr: 'Chat', cat: 'animals' },
  { id: 181, it: 'Cavallo', fr: 'Cheval', cat: 'animals' },
  { id: 182, it: 'Uccello', fr: 'Oiseau', cat: 'animals' },
  { id: 183, it: 'Coniglio', fr: 'Lapin', cat: 'animals' },
  { id: 184, it: 'Mucca', fr: 'Vache', cat: 'animals' },
  { id: 185, it: 'Maiale', fr: 'Cochon', cat: 'animals' },
  // Emotions
  { id: 186, it: 'Amore', fr: 'Amour', cat: 'emotions' },
  { id: 187, it: 'Paura', fr: 'Peur', cat: 'emotions' },
  { id: 188, it: 'Gioia', fr: 'Joie', cat: 'emotions' },
  { id: 189, it: 'Rabbia', fr: 'Colère', cat: 'emotions' },
  { id: 190, it: 'Sorpresa', fr: 'Surprise', cat: 'emotions' },
  { id: 191, it: 'Felicità', fr: 'Bonheur', cat: 'emotions' },
  // Work & Basics
  { id: 192, it: 'Lavoro', fr: 'Travail', cat: 'work' },
  { id: 193, it: 'Soldi', fr: 'Argent', cat: 'work' },
  { id: 194, it: 'Riunione', fr: 'Réunion', cat: 'work' },
  { id: 195, it: 'Collega', fr: 'Collègue', cat: 'work' },
  { id: 196, it: 'Capo', fr: 'Chef', cat: 'work' },
  { id: 197, it: 'Tempo', fr: 'Temps', cat: 'basics' },
  { id: 198, it: 'Cosa', fr: 'Chose', cat: 'basics' },
  { id: 199, it: 'Uomo', fr: 'Homme', cat: 'basics' },
  { id: 200, it: 'Donna', fr: 'Femme', cat: 'basics' },
  { id: 201, it: 'Bambino', fr: 'Enfant', cat: 'basics' },
  { id: 202, it: 'Ragazzo', fr: 'Garçon', cat: 'basics' },
  { id: 203, it: 'Ragazza', fr: 'Fille', cat: 'basics' },
  { id: 204, it: 'Parola', fr: 'Mot', cat: 'basics' },
  { id: 205, it: 'Lingua', fr: 'Langue', cat: 'basics' },
  { id: 206, it: 'Mondo', fr: 'Monde', cat: 'basics' },
  { id: 207, it: 'Vita', fr: 'Vie', cat: 'basics' },
  { id: 208, it: 'Nome', fr: 'Prénom', cat: 'basics' },
  { id: 209, it: 'Paese', fr: 'Pays / Village', cat: 'basics' },
  { id: 210, it: 'Numero', fr: 'Numéro', cat: 'basics' },
];

const VERBS = [
  { id: 1, it: 'Essere', fr: 'Être', en: 'to be', conj: { present: { it: ['sono', 'sei', 'è', 'siamo', 'siete', 'sono'], fr: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'] }, past: { it: ['ero', 'eri', 'era', 'eravamo', 'eravate', 'erano'], fr: ['étais', 'étais', 'était', 'étions', 'étiez', 'étaient'] }, future: { it: ['sarò', 'sarai', 'sarà', 'saremo', 'sarete', 'saranno'], fr: ['serai', 'seras', 'sera', 'serons', 'serez', 'seront'] }}},
  { id: 2, it: 'Avere', fr: 'Avoir', en: 'to have', conj: { present: { it: ['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno'], fr: ['ai', 'as', 'a', 'avons', 'avez', 'ont'] }, past: { it: ['avevo', 'avevi', 'aveva', 'avevamo', 'avevate', 'avevano'], fr: ['avais', 'avais', 'avait', 'avions', 'aviez', 'avaient'] }, future: { it: ['avrò', 'avrai', 'avrà', 'avremo', 'avrete', 'avranno'], fr: ['aurai', 'auras', 'aura', 'aurons', 'aurez', 'auront'] }}},
  { id: 3, it: 'Fare', fr: 'Faire', en: 'to do/make', conj: { present: { it: ['faccio', 'fai', 'fa', 'facciamo', 'fate', 'fanno'], fr: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'] }, past: { it: ['facevo', 'facevi', 'faceva', 'facevamo', 'facevate', 'facevano'], fr: ['faisais', 'faisais', 'faisait', 'faisions', 'faisiez', 'faisaient'] }, future: { it: ['farò', 'farai', 'farà', 'faremo', 'farete', 'faranno'], fr: ['ferai', 'feras', 'fera', 'ferons', 'ferez', 'feront'] }}},
  { id: 4, it: 'Andare', fr: 'Aller', en: 'to go', conj: { present: { it: ['vado', 'vai', 'va', 'andiamo', 'andate', 'vanno'], fr: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'] }, past: { it: ['andavo', 'andavi', 'andava', 'andavamo', 'andavate', 'andavano'], fr: ['allais', 'allais', 'allait', 'allions', 'alliez', 'allaient'] }, future: { it: ['andrò', 'andrai', 'andrà', 'andremo', 'andrete', 'andranno'], fr: ['irai', 'iras', 'ira', 'irons', 'irez', 'iront'] }}},
  { id: 5, it: 'Venire', fr: 'Venir', en: 'to come', conj: { present: { it: ['vengo', 'vieni', 'viene', 'veniamo', 'venite', 'vengono'], fr: ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'] }, past: { it: ['venivo', 'venivi', 'veniva', 'venivamo', 'venivate', 'venivano'], fr: ['venais', 'venais', 'venait', 'venions', 'veniez', 'venaient'] }, future: { it: ['verrò', 'verrai', 'verrà', 'verremo', 'verrete', 'verranno'], fr: ['viendrai', 'viendras', 'viendra', 'viendrons', 'viendrez', 'viendront'] }}},
  { id: 6, it: 'Stare', fr: 'Rester / Être', en: 'to stay/be', conj: { present: { it: ['sto', 'stai', 'sta', 'stiamo', 'state', 'stanno'], fr: ['reste', 'restes', 'reste', 'restons', 'restez', 'restent'] }, past: { it: ['stavo', 'stavi', 'stava', 'stavamo', 'stavate', 'stavano'], fr: ['restais', 'restais', 'restait', 'restions', 'restiez', 'restaient'] }, future: { it: ['starò', 'starai', 'starà', 'staremo', 'starete', 'staranno'], fr: ['resterai', 'resteras', 'restera', 'resterons', 'resterez', 'resteront'] }}},
  { id: 7, it: 'Parlare', fr: 'Parler', en: 'to speak', conj: { present: { it: ['parlo', 'parli', 'parla', 'parliamo', 'parlate', 'parlano'], fr: ['parle', 'parles', 'parle', 'parlons', 'parlez', 'parlent'] }, past: { it: ['parlavo', 'parlavi', 'parlava', 'parlavamo', 'parlavate', 'parlavano'], fr: ['parlais', 'parlais', 'parlait', 'parlions', 'parliez', 'parlaient'] }, future: { it: ['parlerò', 'parlerai', 'parlerà', 'parleremo', 'parlerete', 'parleranno'], fr: ['parlerai', 'parleras', 'parlera', 'parlerons', 'parlerez', 'parleront'] }}},
  { id: 8, it: 'Capire', fr: 'Comprendre', en: 'to understand', conj: { present: { it: ['capisco', 'capisci', 'capisce', 'capiamo', 'capite', 'capiscono'], fr: ['comprends', 'comprends', 'comprend', 'comprenons', 'comprenez', 'comprennent'] }, past: { it: ['capivo', 'capivi', 'capiva', 'capivamo', 'capivate', 'capivano'], fr: ['comprenais', 'comprenais', 'comprenait', 'comprenions', 'compreniez', 'comprenaient'] }, future: { it: ['capirò', 'capirai', 'capirà', 'capiremo', 'capirete', 'capiranno'], fr: ['comprendrai', 'comprendras', 'comprendra', 'comprendrons', 'comprendrez', 'comprendront'] }}},
  { id: 9, it: 'Mangiare', fr: 'Manger', en: 'to eat', conj: { present: { it: ['mangio', 'mangi', 'mangia', 'mangiamo', 'mangiate', 'mangiano'], fr: ['mange', 'manges', 'mange', 'mangeons', 'mangez', 'mangent'] }, past: { it: ['mangiavo', 'mangiavi', 'mangiava', 'mangiavamo', 'mangiavate', 'mangiavano'], fr: ['mangeais', 'mangeais', 'mangeait', 'mangions', 'mangiez', 'mangeaient'] }, future: { it: ['mangerò', 'mangerai', 'mangerà', 'mangeremo', 'mangerete', 'mangeranno'], fr: ['mangerai', 'mangeras', 'mangera', 'mangerons', 'mangerez', 'mangeront'] }}},
  { id: 10, it: 'Bere', fr: 'Boire', en: 'to drink', conj: { present: { it: ['bevo', 'bevi', 'beve', 'beviamo', 'bevete', 'bevono'], fr: ['bois', 'bois', 'boit', 'buvons', 'buvez', 'boivent'] }, past: { it: ['bevevo', 'bevevi', 'beveva', 'bevevamo', 'bevevate', 'bevevano'], fr: ['buvais', 'buvais', 'buvait', 'buvions', 'buviez', 'buvaient'] }, future: { it: ['berrò', 'berrai', 'berrà', 'berremo', 'berrete', 'berranno'], fr: ['boirai', 'boiras', 'boira', 'boirons', 'boirez', 'boiront'] }}},
  { id: 11, it: 'Dormire', fr: 'Dormir', en: 'to sleep', conj: { present: { it: ['dormo', 'dormi', 'dorme', 'dormiamo', 'dormite', 'dormono'], fr: ['dors', 'dors', 'dort', 'dormons', 'dormez', 'dorment'] }, past: { it: ['dormivo', 'dormivi', 'dormiva', 'dormivamo', 'dormivate', 'dormivano'], fr: ['dormais', 'dormais', 'dormait', 'dormions', 'dormiez', 'dormaient'] }, future: { it: ['dormirò', 'dormirai', 'dormirà', 'dormiremo', 'dormirete', 'dormiranno'], fr: ['dormirai', 'dormiras', 'dormira', 'dormirons', 'dormirez', 'dormiront'] }}},
  { id: 12, it: 'Lavorare', fr: 'Travailler', en: 'to work', conj: { present: { it: ['lavoro', 'lavori', 'lavora', 'lavoriamo', 'lavorate', 'lavorano'], fr: ['travaille', 'travailles', 'travaille', 'travaillons', 'travaillez', 'travaillent'] }, past: { it: ['lavoravo', 'lavoravi', 'lavorava', 'lavoravamo', 'lavoravate', 'lavoravano'], fr: ['travaillais', 'travaillais', 'travaillait', 'travaillions', 'travailliez', 'travaillaient'] }, future: { it: ['lavorerò', 'lavorerai', 'lavorerà', 'lavoreremo', 'lavorerete', 'lavoreranno'], fr: ['travaillerai', 'travailleras', 'travaillera', 'travaillerons', 'travaillerez', 'travailleront'] }}},
  { id: 13, it: 'Studiare', fr: 'Étudier', en: 'to study', conj: { present: { it: ['studio', 'studi', 'studia', 'studiamo', 'studiate', 'studiano'], fr: ['étudie', 'étudies', 'étudie', 'étudions', 'étudiez', 'étudient'] }, past: { it: ['studiavo', 'studiavi', 'studiava', 'studiavamo', 'studiavate', 'studiavano'], fr: ['étudiais', 'étudiais', 'étudiait', 'étudiions', 'étudiiez', 'étudiaient'] }, future: { it: ['studierò', 'studierai', 'studierà', 'studieremo', 'studierete', 'studieranno'], fr: ['étudierai', 'étudieras', 'étudiera', 'étudierons', 'étudierez', 'étudieront'] }}},
  { id: 14, it: 'Leggere', fr: 'Lire', en: 'to read', conj: { present: { it: ['leggo', 'leggi', 'legge', 'leggiamo', 'leggete', 'leggono'], fr: ['lis', 'lis', 'lit', 'lisons', 'lisez', 'lisent'] }, past: { it: ['leggevo', 'leggevi', 'leggeva', 'leggevamo', 'leggevate', 'leggevano'], fr: ['lisais', 'lisais', 'lisait', 'lisions', 'lisiez', 'lisaient'] }, future: { it: ['leggerò', 'leggerai', 'leggerà', 'leggeremo', 'leggerete', 'leggeranno'], fr: ['lirai', 'liras', 'lira', 'lirons', 'lirez', 'liront'] }}},
  { id: 15, it: 'Scrivere', fr: 'Écrire', en: 'to write', conj: { present: { it: ['scrivo', 'scrivi', 'scrive', 'scriviamo', 'scrivete', 'scrivono'], fr: ['écris', 'écris', 'écrit', 'écrivons', 'écrivez', 'écrivent'] }, past: { it: ['scrivevo', 'scrivevi', 'scriveva', 'scrivevamo', 'scrivevate', 'scrivevano'], fr: ['écrivais', 'écrivais', 'écrivait', 'écrivions', 'écriviez', 'écrivaient'] }, future: { it: ['scriverò', 'scriverai', 'scriverà', 'scriveremo', 'scriverete', 'scriveranno'], fr: ['écrirai', 'écriras', 'écrira', 'écrirons', 'écrirez', 'écriront'] }}},
  { id: 16, it: 'Vedere', fr: 'Voir', en: 'to see', conj: { present: { it: ['vedo', 'vedi', 'vede', 'vediamo', 'vedete', 'vedono'], fr: ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'] }, past: { it: ['vedevo', 'vedevi', 'vedeva', 'vedevamo', 'vedevate', 'vedevano'], fr: ['voyais', 'voyais', 'voyait', 'voyions', 'voyiez', 'voyaient'] }, future: { it: ['vedrò', 'vedrai', 'vedrà', 'vedremo', 'vedrete', 'vedranno'], fr: ['verrai', 'verras', 'verra', 'verrons', 'verrez', 'verront'] }}},
  { id: 17, it: 'Sentire', fr: 'Entendre', en: 'to hear', conj: { present: { it: ['sento', 'senti', 'sente', 'sentiamo', 'sentite', 'sentono'], fr: ['entends', 'entends', 'entend', 'entendons', 'entendez', 'entendent'] }, past: { it: ['sentivo', 'sentivi', 'sentiva', 'sentivamo', 'sentivate', 'sentivano'], fr: ['entendais', 'entendais', 'entendait', 'entendions', 'entendiez', 'entendaient'] }, future: { it: ['sentirò', 'sentirai', 'sentirà', 'sentiremo', 'sentirete', 'sentiranno'], fr: ['entendrai', 'entendras', 'entendra', 'entendrons', 'entendrez', 'entendront'] }}},
  { id: 18, it: 'Prendere', fr: 'Prendre', en: 'to take', conj: { present: { it: ['prendo', 'prendi', 'prende', 'prendiamo', 'prendete', 'prendono'], fr: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'] }, past: { it: ['prendevo', 'prendevi', 'prendeva', 'prendevamo', 'prendevate', 'prendevano'], fr: ['prenais', 'prenais', 'prenait', 'prenions', 'preniez', 'prenaient'] }, future: { it: ['prenderò', 'prenderai', 'prenderà', 'prenderemo', 'prenderete', 'prenderanno'], fr: ['prendrai', 'prendras', 'prendra', 'prendrons', 'prendrez', 'prendront'] }}},
  { id: 19, it: 'Dare', fr: 'Donner', en: 'to give', conj: { present: { it: ['do', 'dai', 'dà', 'diamo', 'date', 'danno'], fr: ['donne', 'donnes', 'donne', 'donnons', 'donnez', 'donnent'] }, past: { it: ['davo', 'davi', 'dava', 'davamo', 'davate', 'davano'], fr: ['donnais', 'donnais', 'donnait', 'donnions', 'donniez', 'donnaient'] }, future: { it: ['darò', 'darai', 'darà', 'daremo', 'darete', 'daranno'], fr: ['donnerai', 'donneras', 'donnera', 'donnerons', 'donnerez', 'donneront'] }}},
  { id: 20, it: 'Sapere', fr: 'Savoir', en: 'to know', conj: { present: { it: ['so', 'sai', 'sa', 'sappiamo', 'sapete', 'sanno'], fr: ['sais', 'sais', 'sait', 'savons', 'savez', 'savent'] }, past: { it: ['sapevo', 'sapevi', 'sapeva', 'sapevamo', 'sapevate', 'sapevano'], fr: ['savais', 'savais', 'savait', 'savions', 'saviez', 'savaient'] }, future: { it: ['saprò', 'saprai', 'saprà', 'sapremo', 'saprete', 'sapranno'], fr: ['saurai', 'sauras', 'saura', 'saurons', 'saurez', 'sauront'] }}},
  { id: 21, it: 'Potere', fr: 'Pouvoir', en: 'can / to be able', conj: { present: { it: ['posso', 'puoi', 'può', 'possiamo', 'potete', 'possono'], fr: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'] }, past: { it: ['potevo', 'potevi', 'poteva', 'potevamo', 'potevate', 'potevano'], fr: ['pouvais', 'pouvais', 'pouvait', 'pouvions', 'pouviez', 'pouvaient'] }, future: { it: ['potrò', 'potrai', 'potrà', 'potremo', 'potrete', 'potranno'], fr: ['pourrai', 'pourras', 'pourra', 'pourrons', 'pourrez', 'pourront'] }}},
  { id: 22, it: 'Volere', fr: 'Vouloir', en: 'to want', conj: { present: { it: ['voglio', 'vuoi', 'vuole', 'vogliamo', 'volete', 'vogliono'], fr: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'] }, past: { it: ['volevo', 'volevi', 'voleva', 'volevamo', 'volevate', 'volevano'], fr: ['voulais', 'voulais', 'voulait', 'voulions', 'vouliez', 'voulaient'] }, future: { it: ['vorrò', 'vorrai', 'vorrà', 'vorremo', 'vorrete', 'vorranno'], fr: ['voudrai', 'voudras', 'voudra', 'voudrons', 'voudrez', 'voudront'] }}},
  { id: 23, it: 'Dovere', fr: 'Devoir', en: 'must / to have to', conj: { present: { it: ['devo', 'devi', 'deve', 'dobbiamo', 'dovete', 'devono'], fr: ['dois', 'dois', 'doit', 'devons', 'devez', 'doivent'] }, past: { it: ['dovevo', 'dovevi', 'doveva', 'dovevamo', 'dovevate', 'dovevano'], fr: ['devais', 'devais', 'devait', 'devions', 'deviez', 'devaient'] }, future: { it: ['dovrò', 'dovrai', 'dovrà', 'dovremo', 'dovrete', 'dovranno'], fr: ['devrai', 'devras', 'devra', 'devrons', 'devrez', 'devront'] }}},
  { id: 24, it: 'Abitare', fr: 'Habiter', en: 'to live (somewhere)', conj: { present: { it: ['abito', 'abiti', 'abita', 'abitiamo', 'abitate', 'abitano'], fr: ['habite', 'habites', 'habite', 'habitons', 'habitez', 'habitent'] }, past: { it: ['abitavo', 'abitavi', 'abitava', 'abitavamo', 'abitavate', 'abitavano'], fr: ['habitais', 'habitais', 'habitait', 'habitions', 'habitiez', 'habitaient'] }, future: { it: ['abiterò', 'abiterai', 'abiterà', 'abiteremo', 'abiterete', 'abiteranno'], fr: ['habiterai', 'habiteras', 'habitera', 'habiterons', 'habiterez', 'habiteront'] }}},
  { id: 25, it: 'Comprare', fr: 'Acheter', en: 'to buy', conj: { present: { it: ['compro', 'compri', 'compra', 'compriamo', 'comprate', 'comprano'], fr: ['achète', 'achètes', 'achète', 'achetons', 'achetez', 'achètent'] }, past: { it: ['compravo', 'compravi', 'comprava', 'compravamo', 'compravate', 'compravano'], fr: ['achetais', 'achetais', 'achetait', 'achetions', 'achetiez', 'achetaient'] }, future: { it: ['comprerò', 'comprerai', 'comprerà', 'compreremo', 'comprerete', 'compreranno'], fr: ['achèterai', 'achèteras', 'achètera', 'achèterons', 'achèterez', 'achèteront'] }}},
];

const EXPRESSIONS = [
  { id: 1, it: 'In bocca al lupo!', fr: 'Bonne chance!', lit: 'In the mouth of the wolf', ctx: 'Wish someone good luck. The reply is: Crepi il lupo!' },
  { id: 2, it: 'Non vedo l\'ora!', fr: 'J\'ai hâte!', lit: 'I don\'t see the hour', ctx: 'Express excitement or impatience about something upcoming.' },
  { id: 3, it: 'Che ne dici?', fr: 'Qu\'en penses-tu?', lit: 'What do you say about it?', ctx: 'Ask someone for their opinion.' },
  { id: 4, it: 'Come ti chiami?', fr: 'Comment tu t\'appelles?', lit: 'What do you call yourself?', ctx: 'Ask someone their name (informal).' },
  { id: 5, it: 'Mi chiamo...', fr: 'Je m\'appelle...', lit: 'I call myself...', ctx: 'Introduce your name.' },
  { id: 6, it: 'Quanti anni hai?', fr: 'Quel âge as-tu?', lit: 'How many years do you have?', ctx: 'Ask someone\'s age (informal).' },
  { id: 7, it: 'Ho [X] anni.', fr: 'J\'ai [X] ans.', lit: 'I have [X] years.', ctx: 'Tell your age. Example: Ho venti anni.' },
  { id: 8, it: 'Di dove sei?', fr: 'Tu viens d\'où?', lit: 'From where are you?', ctx: 'Ask where someone is from (informal).' },
  { id: 9, it: 'Non capisco.', fr: 'Je ne comprends pas.', lit: 'I don\'t understand.', ctx: 'Say you didn\'t understand something.' },
  { id: 10, it: 'Puoi ripetere?', fr: 'Tu peux répéter?', lit: 'Can you repeat?', ctx: 'Ask someone to say something again (informal).' },
  { id: 11, it: 'Parla più lentamente!', fr: 'Parle plus lentement!', lit: 'Speak more slowly!', ctx: 'Ask someone to slow down their speech.' },
  { id: 12, it: 'Come si dice... ?', fr: 'Comment on dit... ?', lit: 'How does one say...?', ctx: 'Ask for a translation or word in Italian/French.' },
  { id: 13, it: 'Che ore sono?', fr: 'Quelle heure est-il?', lit: 'What hours are they?', ctx: 'Ask what time it is.' },
  { id: 14, it: 'Quanto costa?', fr: 'Combien ça coûte?', lit: 'How much does it cost?', ctx: 'Ask the price of something in a shop.' },
  { id: 15, it: 'Dov\'è... ?', fr: 'Où est... ?', lit: 'Where is...?', ctx: 'Ask for directions or location of something.' },
  { id: 16, it: 'Mi dispiace.', fr: 'Je suis désolé(e).', lit: 'It displeases me.', ctx: 'Apologise or express sympathy.' },
  { id: 17, it: 'Non fa niente.', fr: 'Ce n\'est rien.', lit: 'It does nothing.', ctx: 'Say it\'s fine / no worries.' },
  { id: 18, it: 'A presto!', fr: 'À bientôt!', lit: 'Until soon!', ctx: 'A casual goodbye meaning "see you soon".' },
  { id: 19, it: 'Salute!', fr: 'Santé!', lit: 'Health!', ctx: 'Said when toasting a drink, or to someone who sneezes.' },
  { id: 20, it: 'Dai!', fr: 'Allez!', lit: 'Come on!', ctx: 'Express encouragement or mild impatience.' },
  { id: 21, it: 'Mamma mia!', fr: 'Oh là là!', lit: 'My mum!', ctx: 'Express surprise, shock or exasperation.' },
  { id: 22, it: 'Piano piano.', fr: 'Doucement, doucement.', lit: 'Slowly, slowly.', ctx: 'Take it easy, step by step. Used to encourage patience.' },
  { id: 23, it: 'Buon appetito!', fr: 'Bon appétit!', lit: 'Good appetite!', ctx: 'Said before eating a meal, wishing someone to enjoy their food.' },
  { id: 24, it: 'Figurati!', fr: 'T\'en fais pas!', lit: 'Imagine it!', ctx: 'Don\'t mention it / no worries at all (stronger than "non fa niente").' },
];

const STORIES = [
  {
    id: 1, title: 'La colazione',
    it: 'Marco si sveglia alle sette. Va in cucina e prepara la colazione. Beve un caffè con latte e mangia una brioche. È pronto per andare al lavoro.',
    fr: 'Marco se réveille à sept heures. Il va dans la cuisine et prépare le petit-déjeuner. Il boit un café au lait et mange une brioche. Il est prêt à aller au travail.',
    questions: [
      { q: 'A che ora si sveglia Marco?', opts: ['Alle sei', 'Alle sette', 'Alle otto'], ans: 1 },
      { q: 'Cosa beve Marco?', opts: ['Tè', 'Caffè con latte', 'Acqua'], ans: 1 },
      { q: 'Dove va dopo la colazione?', opts: ['Al mercato', 'A scuola', 'Al lavoro'], ans: 2 },
    ],
    words: [{ it: 'Colazione', fr: 'Petit-déjeuner' }, { it: 'Cucina', fr: 'Cuisine' }, { it: 'Brioche', fr: 'Brioche' }]
  },
  {
    id: 2, title: 'Al mercato',
    it: 'Lucia va al mercato ogni sabato mattina. Compra frutta e verdura fresca. Il venditore è molto gentile. Oggi Lucia compra mele, pomodori e una grande arancia.',
    fr: 'Lucia va au marché chaque samedi matin. Elle achète des fruits et légumes frais. Le vendeur est très gentil. Aujourd\'hui Lucia achète des pommes, des tomates et une grande orange.',
    questions: [
      { q: 'Quando va al mercato Lucia?', opts: ['Ogni lunedì', 'Ogni sabato', 'Ogni domenica'], ans: 1 },
      { q: 'Come è il venditore?', opts: ['Antipatico', 'Stanco', 'Gentile'], ans: 2 },
      { q: 'Cosa NON compra Lucia oggi?', opts: ['Mele', 'Pane', 'Pomodori'], ans: 1 },
    ],
    words: [{ it: 'Mercato', fr: 'Marché' }, { it: 'Frutta', fr: 'Fruits' }, { it: 'Fresca', fr: 'Fraîche' }]
  },
  {
    id: 3, title: 'La famiglia di Anna',
    it: 'Anna ha una famiglia grande. Ha due fratelli e una sorella. Suo padre si chiama Carlo e sua madre si chiama Maria. La domenica tutta la famiglia mangia insieme a casa dei nonni.',
    fr: 'Anna a une grande famille. Elle a deux frères et une sœur. Son père s\'appelle Carlo et sa mère s\'appelle Maria. Le dimanche, toute la famille mange ensemble chez les grands-parents.',
    questions: [
      { q: 'Quanti fratelli ha Anna?', opts: ['Uno', 'Due', 'Tre'], ans: 1 },
      { q: 'Come si chiama la madre di Anna?', opts: ['Laura', 'Maria', 'Anna'], ans: 1 },
      { q: 'Quando si riunisce la famiglia?', opts: ['Il sabato', 'La domenica', 'Il venerdì'], ans: 1 },
    ],
    words: [{ it: 'Fratello', fr: 'Frère' }, { it: 'Sorella', fr: 'Sœur' }, { it: 'Insieme', fr: 'Ensemble' }]
  },
  {
    id: 4, title: 'Al ristorante',
    it: 'Luca e Sofia vanno al ristorante per cena. Il cameriere porta il menù. Luca ordina una pasta al pomodoro e Sofia ordina il pesce. Bevono dell\'acqua e del vino rosso. Il cibo è delizioso.',
    fr: 'Luca et Sofia vont au restaurant pour le dîner. Le serveur apporte le menu. Luca commande des pâtes à la tomate et Sofia commande le poisson. Ils boivent de l\'eau et du vin rouge. La nourriture est délicieuse.',
    questions: [
      { q: 'Cosa ordina Luca?', opts: ['Il pesce', 'La pasta al pomodoro', 'La carne'], ans: 1 },
      { q: 'Cosa bevono?', opts: ['Birra e acqua', 'Acqua e vino rosso', 'Solo acqua'], ans: 1 },
      { q: 'Com\'è il cibo?', opts: ['Cattivo', 'Così così', 'Delizioso'], ans: 2 },
    ],
    words: [{ it: 'Cameriere', fr: 'Serveur' }, { it: 'Menù', fr: 'Menu' }, { it: 'Delizioso', fr: 'Délicieux' }]
  },
  {
    id: 5, title: 'In città',
    it: 'Oggi Marco vuole andare in centro. Prende l\'autobus perché non ha la macchina. Prima va in banca, poi compra un libro in libreria. Fa anche una passeggiata nel parco. Torna a casa alle sei di sera.',
    fr: 'Aujourd\'hui Marco veut aller en centre-ville. Il prend le bus parce qu\'il n\'a pas de voiture. D\'abord il va à la banque, puis il achète un livre dans une librairie. Il fait aussi une promenade dans le parc. Il rentre chez lui à six heures du soir.',
    questions: [
      { q: 'Come va in centro Marco?', opts: ['In macchina', 'In bicicletta', 'Con l\'autobus'], ans: 2 },
      { q: 'Cosa compra in libreria?', opts: ['Un giornale', 'Un libro', 'Una rivista'], ans: 1 },
      { q: 'A che ora torna a casa?', opts: ['Alle quattro', 'Alle cinque', 'Alle sei'], ans: 2 },
    ],
    words: [{ it: 'Centro', fr: 'Centre-ville' }, { it: 'Libreria', fr: 'Librairie' }, { it: 'Passeggiata', fr: 'Promenade' }]
  },
  {
    id: 6, title: 'Il tempo libero',
    it: 'Nel tempo libero, Giulia ama leggere e ascoltare musica. Il sabato va in palestra con la sua amica Sara. La domenica guarda un film a casa. A volte cucina nuove ricette con sua sorella.',
    fr: 'Pendant son temps libre, Giulia aime lire et écouter de la musique. Le samedi elle va à la salle de sport avec son amie Sara. Le dimanche elle regarde un film à la maison. Parfois elle cuisine de nouvelles recettes avec sa sœur.',
    questions: [
      { q: 'Cosa ama fare Giulia nel tempo libero?', opts: ['Sport e cucina', 'Leggere e musica', 'Viaggiare'], ans: 1 },
      { q: 'Con chi va in palestra?', opts: ['Con sua sorella', 'Con Sara', 'Da sola'], ans: 1 },
      { q: 'Cosa fa la domenica?', opts: ['Va al cinema', 'Guarda un film a casa', 'Legge in biblioteca'], ans: 1 },
    ],
    words: [{ it: 'Tempo libero', fr: 'Temps libre' }, { it: 'Palestra', fr: 'Salle de sport' }, { it: 'Ricetta', fr: 'Recette' }]
  },
  {
    id: 7, title: 'Dal dottore',
    it: 'Paolo non si sente bene. Ha mal di testa e un po\' di febbre. Va dal dottore. Il dottore lo visita e dice che ha un raffreddore. Gli dà una ricetta per la farmacia. Paolo deve riposare e bere molta acqua.',
    fr: 'Paolo ne se sent pas bien. Il a mal à la tête et un peu de fièvre. Il va chez le médecin. Le médecin l\'examine et dit qu\'il a un rhume. Il lui donne une ordonnance pour la pharmacie. Paolo doit se reposer et boire beaucoup d\'eau.',
    questions: [
      { q: 'Cosa ha Paolo?', opts: ['Mal di stomaco', 'Mal di testa e febbre', 'Mal di schiena'], ans: 1 },
      { q: 'Cosa dice il dottore?', opts: ['Ha l\'influenza', 'Ha un raffreddore', 'Sta benissimo'], ans: 1 },
      { q: 'Cosa deve fare Paolo?', opts: ['Andare in palestra', 'Riposare e bere acqua', 'Lavorare'], ans: 1 },
    ],
    words: [{ it: 'Febbre', fr: 'Fièvre' }, { it: 'Raffreddore', fr: 'Rhume' }, { it: 'Riposare', fr: 'Se reposer' }]
  },
  {
    id: 8, title: 'Una vacanza al mare',
    it: 'D\'estate, la famiglia Rossi va al mare. Prendono il treno fino a Rimini. In spiaggia, i bambini fanno il bagno e giocano con la sabbia. La sera mangiano pesce fresco in un ristorante vicino al porto. È una settimana meravigliosa.',
    fr: 'En été, la famille Rossi va à la mer. Ils prennent le train jusqu\'à Rimini. À la plage, les enfants se baignent et jouent avec le sable. Le soir ils mangent du poisson frais dans un restaurant près du port. C\'est une semaine merveilleuse.',
    questions: [
      { q: 'Come arrivano a Rimini?', opts: ['In macchina', 'In aereo', 'In treno'], ans: 2 },
      { q: 'Cosa fanno i bambini in spiaggia?', opts: ['Leggono libri', 'Fanno il bagno e giocano', 'Dormono'], ans: 1 },
      { q: 'Com\'è la vacanza?', opts: ['Noiosa', 'Meravigliosa', 'Difficile'], ans: 1 },
    ],
    words: [{ it: 'Spiaggia', fr: 'Plage' }, { it: 'Sabbia', fr: 'Sable' }, { it: 'Porto', fr: 'Port' }]
  },
  {
    id: 9, title: 'A scuola',
    it: 'Elena ha dodici anni e va a scuola ogni giorno dal lunedì al venerdì. La sua materia preferita è la matematica. Ha molti amici in classe. La sua insegnante si chiama professoressa Bianchi ed è molto simpatica.',
    fr: 'Elena a douze ans et elle va à l\'école tous les jours du lundi au vendredi. Sa matière préférée est les mathématiques. Elle a beaucoup d\'amis en classe. Son professeure s\'appelle madame Bianchi et elle est très sympathique.',
    questions: [
      { q: 'Quanti anni ha Elena?', opts: ['Dieci', 'Dodici', 'Quattordici'], ans: 1 },
      { q: 'Qual è la materia preferita di Elena?', opts: ['Storia', 'Italiano', 'Matematica'], ans: 2 },
      { q: 'Come si chiama la sua insegnante?', opts: ['Professoressa Rossi', 'Professoressa Bianchi', 'Professoressa Verdi'], ans: 1 },
    ],
    words: [{ it: 'Materia', fr: 'Matière' }, { it: 'Insegnante', fr: 'Professeur(e)' }, { it: 'Classe', fr: 'Classe' }]
  },
  {
    id: 10, title: 'Fare la spesa',
    it: 'Oggi Sara deve fare la spesa. Va al supermercato con la lista: latte, pane, uova, pasta e pomodori. Alla cassa paga con la carta. Spende dieci euro. Torna a casa e mette tutto in frigorifero.',
    fr: 'Aujourd\'hui Sara doit faire les courses. Elle va au supermarché avec la liste: lait, pain, œufs, pâtes et tomates. À la caisse elle paie par carte. Elle dépense dix euros. Elle rentre à la maison et met tout au réfrigérateur.',
    questions: [
      { q: 'Dove va Sara?', opts: ['Al mercato', 'Al supermercato', 'In farmacia'], ans: 1 },
      { q: 'Come paga alla cassa?', opts: ['Con i soldi', 'Con la carta', 'Non paga'], ans: 1 },
      { q: 'Quanto spende Sara?', opts: ['Cinque euro', 'Venti euro', 'Dieci euro'], ans: 2 },
    ],
    words: [{ it: 'Spesa', fr: 'Courses' }, { it: 'Cassa', fr: 'Caisse' }, { it: 'Frigorifero', fr: 'Réfrigérateur' }]
  },
  {
    id: 11, title: 'Il tempo che fa',
    it: 'In inverno a Milano fa molto freddo e nevica spesso. In estate fa caldo e c\'è il sole. La primavera è bella: non fa né troppo caldo né troppo freddo. Marco preferisce l\'autunno perché ama la pioggia e i colori delle foglie.',
    fr: 'En hiver à Milan il fait très froid et il neige souvent. En été il fait chaud et il y a du soleil. Le printemps est beau: il ne fait ni trop chaud ni trop froid. Marco préfère l\'automne parce qu\'il aime la pluie et les couleurs des feuilles.',
    questions: [
      { q: 'Come è il tempo a Milano in inverno?', opts: ['Caldo e soleggiato', 'Molto freddo e nevoso', 'Piovoso'], ans: 1 },
      { q: 'Quale stagione preferisce Marco?', opts: ['L\'estate', 'La primavera', 'L\'autunno'], ans: 2 },
      { q: 'Perché Marco ama l\'autunno?', opts: ['Per il caldo', 'Per la pioggia e i colori', 'Per la neve'], ans: 1 },
    ],
    words: [{ it: 'Inverno', fr: 'Hiver' }, { it: 'Primavera', fr: 'Printemps' }, { it: 'Foglie', fr: 'Feuilles' }]
  },
  {
    id: 12, title: 'La casa nuova',
    it: 'Giulio e Marta hanno una casa nuova. Ha tre camere da letto, una cucina grande e un bel giardino. Giulio dipinge le pareti di bianco e Marta compra dei mobili nuovi. Il loro gatto Micio esplora ogni stanza con curiosità.',
    fr: 'Giulio et Marta ont une nouvelle maison. Elle a trois chambres à coucher, une grande cuisine et un beau jardin. Giulio peint les murs en blanc et Marta achète de nouveaux meubles. Leur chat Micio explore chaque pièce avec curiosité.',
    questions: [
      { q: 'Quante camere ha la casa?', opts: ['Due', 'Tre', 'Quattro'], ans: 1 },
      { q: 'Di che colore dipinge le pareti Giulio?', opts: ['Giallo', 'Blu', 'Bianco'], ans: 2 },
      { q: 'Chi è Micio?', opts: ['Il cane', 'Il gatto', 'Il vicino'], ans: 1 },
    ],
    words: [{ it: 'Camera da letto', fr: 'Chambre à coucher' }, { it: 'Mobili', fr: 'Meubles' }, { it: 'Stanza', fr: 'Pièce' }]
  },
];

const LEVELS = [
  { lvl: 1, xp: 0, title: 'Beginner' }, { lvl: 2, xp: 100, title: 'Novice' }, { lvl: 3, xp: 300, title: 'Learner' },
  { lvl: 4, xp: 600, title: 'Student' }, { lvl: 5, xp: 1000, title: 'Intermediate' }, { lvl: 6, xp: 2000, title: 'Advanced' },
  { lvl: 7, xp: 4000, title: 'Expert' }, { lvl: 8, xp: 7000, title: 'Master' }, { lvl: 9, xp: 10000, title: 'Polyglot' },
];

const BADGES = [
  { id: 'streak3', icon: '🔥', name: 'First Flame', desc: '3-day streak', req: s => s.streak >= 3 },
  { id: 'streak7', icon: '🔥', name: 'Week Warrior', desc: '7-day streak', req: s => s.streak >= 7 },
  { id: 'streak30', icon: '🔥', name: 'Monthly Master', desc: '30-day streak', req: s => s.streak >= 30 },
  { id: 'words50', icon: '📚', name: 'Word Collector', desc: 'Learn 50 words', req: s => s.learned >= 50 },
  { id: 'words100', icon: '📚', name: 'Vocabulary King', desc: 'Learn 100 words', req: s => s.learned >= 100 },
  { id: 'words150', icon: '📚', name: 'Lexicon Master', desc: 'Learn 150 words', req: s => s.learned >= 150 },
  { id: 'stories3', icon: '📖', name: 'Story Seeker', desc: 'Complete 3 stories', req: s => s.completedStories.length >= 3 },
  { id: 'stories12', icon: '📖', name: 'Bookworm', desc: 'Complete all 12 stories', req: s => s.completedStories.length >= 12 },
  { id: 'perfect', icon: '🎯', name: 'Perfect Day', desc: '100% accuracy in a session', req: s => s.perfectDays >= 1 },
];

const PRONOUNS = ['io', 'tu', 'lui/lei', 'noi', 'voi', 'loro'];
const STORAGE = 'lingua-v2';
const dateKey = d => d.toISOString().split('T')[0];
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

export default function App() {
  const [data, setData] = useState(() => load(STORAGE, {
    cards: VOCAB.map(v => ({ ...v, status: 'new', interval: 1, next: Date.now() })),
    direction: 'it_fr', // it_fr or fr_it
    xp: 0,
    streak: 0,
    longestStreak: 0,
    lastPractice: null,
    completedStories: [],
    unlockedBadges: [],
    todayCorrect: 0,
    todayTotal: 0,
    perfectDays: 0,
  }));
  
  const [extraContent, setExtraContent] = useState(() =>
    load('lingua-extra', { syncedPacks: ['core'], verbs: [], expressions: [], stories: [] })
  );
  const [syncStatus, setSyncStatus] = useState('idle'); // idle | syncing | done | error

  const [page, setPage] = useState('home');
  const [currentCard, setCurrentCard] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [swipeDir, setSwipeDir] = useState(null);
  const [selectedVerb, setSelectedVerb] = useState(null);
  const [verbMode, setVerbMode] = useState('view');
  const [verbTense, setVerbTense] = useState('present');
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [selectedExpr, setSelectedExpr] = useState(null);
  const [storyStep, setStoryStep] = useState('read');
  const [storyAnswers, setStoryAnswers] = useState({});
  const [showTrans, setShowTrans] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newWord, setNewWord] = useState({ it: '', fr: '' });
  const [showReward, setShowReward] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => { save(STORAGE, data); }, [data]);

  // Content sync from GitHub
  useEffect(() => {
    const sync = async () => {
      setSyncStatus('syncing');
      try {
        const index = await fetch(CONTENT_INDEX_URL).then(r => r.json());
        const cached = load('lingua-extra', { syncedPacks: ['core'], verbs: [], expressions: [], stories: [] });
        const newPacks = index.packs.filter(p => p.url && !cached.syncedPacks.includes(p.id));
        if (!newPacks.length) { setSyncStatus('done'); return; }

        const updated = { ...cached, verbs: [...cached.verbs], expressions: [...cached.expressions], stories: [...cached.stories] };
        for (const pack of newPacks) {
          const content = await fetch(pack.url).then(r => r.json());
          if (content.vocab?.length) {
            setData(d => {
              const existingIds = new Set(d.cards.map(c => String(c.id)));
              const newCards = content.vocab
                .filter(v => !existingIds.has(String(v.id)))
                .map(v => ({ ...v, status: 'new', interval: 1, next: Date.now() }));
              return newCards.length ? { ...d, cards: [...d.cards, ...newCards] } : d;
            });
          }
          if (content.verbs?.length) updated.verbs.push(...content.verbs);
          if (content.expressions?.length) updated.expressions.push(...content.expressions);
          if (content.stories?.length) updated.stories.push(...content.stories);
          updated.syncedPacks.push(pack.id);
        }
        save('lingua-extra', updated);
        setExtraContent(updated);
        setSyncStatus('done');
      } catch {
        setSyncStatus('error');
      }
    };
    sync();
  }, []);

  // Direction helpers
  const src = data.direction === 'it_fr' ? 'it' : 'fr';
  const tgt = data.direction === 'it_fr' ? 'fr' : 'it';
  const srcFlag = data.direction === 'it_fr' ? '🇮🇹' : '🇫🇷';
  const tgtFlag = data.direction === 'it_fr' ? '🇫🇷' : '🇮🇹';
  const isItaly = data.direction === 'it_fr';

  // Merged content (hardcoded base + synced packs)
  const allVerbs = [...VERBS, ...extraContent.verbs];
  const allExpressions = [...EXPRESSIONS, ...extraContent.expressions];
  const allStories = [...STORIES, ...extraContent.stories];

  // Subtle floating elements - regional nature
  const italyElements = ['🌾', '🫒', '🌻', '🍇', '🌿', '☀️', '🌾', '🫒'];
  const franceElements = ['💜', '🪻', '🌸', '🦋', '💜', '🪻', '🌸', '🦋'];

  // Level calculation
  const getLevel = () => LEVELS.reduce((l, x) => data.xp >= x.xp ? x : l, LEVELS[0]);
  const level = getLevel();
  const nextLevel = LEVELS[LEVELS.indexOf(level) + 1];
  const levelProgress = nextLevel ? ((data.xp - level.xp) / (nextLevel.xp - level.xp)) * 100 : 100;

  // Streak check
  const checkStreak = () => {
    const today = dateKey(new Date());
    if (data.lastPractice === today) return;
    const yesterday = dateKey(new Date(Date.now() - 86400000));
    const newStreak = data.lastPractice === yesterday ? data.streak + 1 : 1;
    const badges = [...data.unlockedBadges];
    BADGES.filter(b => b.id.startsWith('streak') && b.req({ streak: newStreak }) && !badges.includes(b.id))
      .forEach(b => { badges.push(b.id); setShowReward(b); });
    setData(d => ({ ...d, streak: newStreak, longestStreak: Math.max(newStreak, d.longestStreak), lastPractice: today, unlockedBadges: badges }));
  };

  // XP functions
  const addXp = (amount) => {
    const newXp = data.xp + amount;
    const newLevel = LEVELS.reduce((l, x) => newXp >= x.xp ? x : l, LEVELS[0]);
    if (newLevel.lvl > level.lvl) setShowReward({ icon: '⭐', name: `Level ${newLevel.lvl}!`, desc: newLevel.title });
    setData(d => ({ ...d, xp: newXp }));
  };

  // Cards
  const getDue = () => data.cards.filter(c => c.next <= Date.now());
  const getFiltered = () => filter === 'all' ? data.cards : data.cards.filter(c => c.status === filter);
  const learned = data.cards.filter(c => c.status === 'learned').length;

  const startReview = () => {
    const due = getDue();
    if (due.length) { setCurrentCard(due[0]); setFlipped(false); checkStreak(); }
  };

  const handleAnswer = (correct) => {
    if (!currentCard) return;
    const interval = correct ? Math.min(currentCard.interval * 2, 30) : 1;
    const status = correct ? (interval >= 7 ? 'learned' : 'progress') : 'progress';
    const wasLearned = currentCard.status !== 'learned' && status === 'learned';
    
    setData(d => ({
      ...d,
      cards: d.cards.map(c => c.id === currentCard.id ? { ...c, interval, status, next: Date.now() + interval * 86400000 } : c),
      todayCorrect: d.todayCorrect + (correct ? 1 : 0),
      todayTotal: d.todayTotal + 1,
    }));
    
    addXp(correct ? 10 : 2);
    if (wasLearned) addXp(15);
    
    const due = getDue().filter(c => c.id !== currentCard.id);
    if (due.length) { setCurrentCard(due[0]); setFlipped(false); }
    else setCurrentCard(null);
  };

  const handleSwipe = (correct) => {
    setSwipeDir(correct ? 'right' : 'left');
    setTimeout(() => {
      setSwipeDir(null);
      handleAnswer(correct);
    }, 380);
  };

  const addWord = () => {
    if (!newWord.it.trim() || !newWord.fr.trim()) return;
    if (data.cards.some(c => c.it.toLowerCase() === newWord.it.toLowerCase())) { alert('Exists!'); return; }
    setData(d => ({ ...d, cards: [...d.cards, { id: Date.now(), ...newWord, cat: 'custom', status: 'new', interval: 1, next: Date.now() }] }));
    setNewWord({ it: '', fr: '' }); setShowAdd(false);
  };

  // Verb exercise
  const checkVerb = () => setChecked(true);
  const verbScore = selectedVerb ? selectedVerb.conj[verbTense][src === 'it' ? 'it' : 'fr'].filter((a, i) => answers[i]?.toLowerCase().trim() === a.toLowerCase()).length : 0;

  // Story
  const todayStory = allStories[Math.floor(Date.now() / 86400000) % allStories.length];
  const finishStory = () => {
    const correct = todayStory.questions.filter((q, i) => storyAnswers[i] === q.ans).length;
    let added = 0;
    todayStory.words.forEach(w => {
      if (!data.cards.some(c => c.it.toLowerCase() === w.it.toLowerCase())) {
        setData(d => ({ ...d, cards: [...d.cards, { id: Date.now() + Math.random(), ...w, cat: 'story', status: 'new', interval: 1, next: Date.now() }] }));
        added++;
      }
    });
    if (!data.completedStories.includes(todayStory.id)) {
      setData(d => ({ ...d, completedStories: [...d.completedStories, todayStory.id] }));
    }
    addXp(correct === todayStory.questions.length ? 100 : correct * 20);
    checkStreak();
    setStoryStep('results');
  };

  // Toggle direction
  const toggleDir = () => setData(d => ({ ...d, direction: d.direction === 'it_fr' ? 'fr_it' : 'it_fr' }));

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: isItaly 
        ? 'linear-gradient(180deg, #87CEEB 0%, #E8D5A3 35%, #C4A265 50%, #8B7355 65%, #6B5344 80%, #4A3728 100%)' 
        : 'linear-gradient(180deg, #B8C6DB 0%, #D4C4E0 25%, #9B7BB8 45%, #7B5E99 60%, #5D4777 75%, #3D2F52 100%)',
      color: '#fff', 
      fontFamily: 'system-ui',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Landscape layers */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        {/* Sun/Moon */}
        <div style={{
          position: 'absolute',
          width: isItaly ? '80px' : '60px',
          height: isItaly ? '80px' : '60px',
          borderRadius: '50%',
          background: isItaly 
            ? 'radial-gradient(circle, #FFD700 0%, #FFA500 50%, transparent 70%)'
            : 'radial-gradient(circle, #E8E0F0 0%, #D4C4E0 50%, transparent 70%)',
          top: '40px',
          right: '15%',
          boxShadow: isItaly 
            ? '0 0 60px rgba(255,200,0,0.4)' 
            : '0 0 40px rgba(200,180,220,0.3)',
        }} />
        
        {/* Rolling hills / Lavender rows */}
        <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60%' }} viewBox="0 0 400 200" preserveAspectRatio="none">
          {isItaly ? (
            <>
              {/* Tuscan hills - back */}
              <ellipse cx="100" cy="280" rx="200" ry="120" fill="#7D6B5D" opacity="0.6" />
              <ellipse cx="320" cy="260" rx="180" ry="100" fill="#8B7355" opacity="0.7" />
              
              {/* River */}
              <path 
                d="M180,200 Q200,160 190,130 Q175,100 200,70 Q220,45 200,20" 
                fill="none" 
                stroke="url(#riverGradientIt)" 
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.7"
              />
              <path 
                d="M180,200 Q200,160 190,130 Q175,100 200,70 Q220,45 200,20" 
                fill="none" 
                stroke="rgba(255,255,255,0.2)" 
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="2,8"
                opacity="0.5"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite" />
              </path>
              
              {/* Stone bridge */}
              <ellipse cx="195" cy="105" rx="28" ry="8" fill="#5A4A3A" />
              <path d="M167,105 Q195,85 223,105" fill="none" stroke="#6B5A4A" strokeWidth="5" />
              <path d="M170,105 Q195,88 220,105" fill="none" stroke="#7D6B5B" strokeWidth="3" />
              {/* Bridge pillars */}
              <rect x="172" y="105" width="4" height="12" fill="#5A4A3A" rx="1" />
              <rect x="218" y="105" width="4" height="12" fill="#5A4A3A" rx="1" />
              
              {/* Front hill */}
              <ellipse cx="200" cy="240" rx="250" ry="90" fill="#9B8465" opacity="0.8" />
              
              {/* Cypress trees - left group */}
              <ellipse cx="80" cy="170" rx="4" ry="25" fill="#3D5A3D" />
              <ellipse cx="95" cy="175" rx="4" ry="22" fill="#4A6B4A" />
              {/* Cypress trees - right group */}
              <ellipse cx="300" cy="160" rx="4" ry="28" fill="#3D5A3D" />
              <ellipse cx="315" cy="165" rx="4" ry="24" fill="#4A6B4A" />
              <ellipse cx="325" cy="168" rx="3" ry="20" fill="#3D5A3D" />
              
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="riverGradientIt" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6B9AC4" />
                  <stop offset="100%" stopColor="#4A7A9C" />
                </linearGradient>
              </defs>
            </>
          ) : (
            <>
              {/* River */}
              <path 
                d="M180,200 Q200,160 190,130 Q175,100 200,70 Q220,45 200,20" 
                fill="none" 
                stroke="url(#riverGradientFr)" 
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path 
                d="M180,200 Q200,160 190,130 Q175,100 200,70 Q220,45 200,20" 
                fill="none" 
                stroke="rgba(255,255,255,0.15)" 
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="2,8"
                opacity="0.4"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2.5s" repeatCount="indefinite" />
              </path>
              
              {/* Elegant French bridge */}
              <ellipse cx="195" cy="105" rx="30" ry="6" fill="#5D4777" />
              <path d="M165,105 Q195,80 225,105" fill="none" stroke="#6D5787" strokeWidth="4" />
              <path d="M168,105 Q195,83 222,105" fill="none" stroke="#7D6797" strokeWidth="2" />
              {/* Bridge railings */}
              <line x1="170" y1="95" x2="170" y2="105" stroke="#7D6797" strokeWidth="1.5" />
              <line x1="182" y1="90" x2="182" y2="100" stroke="#7D6797" strokeWidth="1.5" />
              <line x1="195" y1="88" x2="195" y2="98" stroke="#7D6797" strokeWidth="1.5" />
              <line x1="208" y1="90" x2="208" y2="100" stroke="#7D6797" strokeWidth="1.5" />
              <line x1="220" y1="95" x2="220" y2="105" stroke="#7D6797" strokeWidth="1.5" />
              
              {/* Lavender field rows */}
              {[0,1,2,3,4,5,6,7].map(i => (
                <g key={i}>
                  <path 
                    d={`M0,${130 + i * 12} Q100,${125 + i * 12} 170,${130 + i * 12}`} 
                    fill="none" 
                    stroke={i % 2 === 0 ? '#8B6BAE' : '#7B5B9E'} 
                    strokeWidth="8"
                    opacity={0.6 + i * 0.05}
                  />
                  <path 
                    d={`M220,${130 + i * 12} Q300,${125 + i * 12} 400,${130 + i * 12}`} 
                    fill="none" 
                    stroke={i % 2 === 0 ? '#8B6BAE' : '#7B5B9E'} 
                    strokeWidth="8"
                    opacity={0.6 + i * 0.05}
                  />
                </g>
              ))}
              
              {/* Distant trees - left */}
              <circle cx="50" cy="100" r="15" fill="#5D7A5D" opacity="0.5" />
              <circle cx="70" cy="105" r="12" fill="#6D8A6D" opacity="0.5" />
              {/* Distant trees - right */}
              <circle cx="350" cy="95" r="18" fill="#5D7A5D" opacity="0.5" />
              <circle cx="370" cy="102" r="14" fill="#6D8A6D" opacity="0.5" />
              
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="riverGradientFr" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8B9DC3" />
                  <stop offset="100%" stopColor="#6B7DA3" />
                </linearGradient>
              </defs>
            </>
          )}
        </svg>
        
        {/* Floating nature elements */}
        {(isItaly ? italyElements : franceElements).map((emoji, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              fontSize: `${14 + (i % 3) * 4}px`,
              left: `${8 + (i * 11) % 85}%`,
              top: `${15 + (i * 13) % 40}%`,
              opacity: 0.15,
              animation: `float${i % 3} ${15 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes float0 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(8px); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-8px) translateX(-6px); }
        }
        .card { 
          background: ${isItaly 
            ? 'linear-gradient(135deg, rgba(75,55,40,0.92) 0%, rgba(107,83,68,0.88) 100%)' 
            : 'linear-gradient(135deg, rgba(61,47,82,0.92) 0%, rgba(91,71,119,0.88) 100%)'}; 
          border-radius: 16px; 
          padding: 20px; 
          backdrop-filter: blur(12px); 
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          border: 1px solid ${isItaly ? 'rgba(200,170,120,0.2)' : 'rgba(180,160,210,0.2)'};
          position: relative; 
          z-index: 1; 
        }
        .btn { 
          background: ${isItaly 
            ? 'linear-gradient(135deg, #C4A265, #D4B275)' 
            : 'linear-gradient(135deg, #9B7BB8, #B08BC8)'}; 
          border: none; 
          color: ${isItaly ? '#3A2A1A' : '#2A1F3A'}; 
          padding: 12px 24px; 
          border-radius: 12px; 
          cursor: pointer; 
          font-weight: 600; 
          position: relative; 
          z-index: 1;
        }
        .btn:disabled { opacity: 0.5; }
        .btn-sec { background: rgba(255,255,255,0.12); color: #fff; }
        .btn-success { background: linear-gradient(135deg, #5D8A5D, #7DAA7D); color: #1A2A1A; }
        .btn-danger { background: linear-gradient(135deg, #A86060, #C87070); color: #fff; }
        input { background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.15); color: #fff; padding: 12px; border-radius: 10px; width: 100%; }
        input:focus { border-color: ${isItaly ? '#C4A265' : '#9B7BB8'}; outline: none; }
        .tab { padding: 10px 16px; cursor: pointer; border-radius: 10px; font-size: 13px; background: rgba(255,255,255,0.1); }
        .tab.active { background: ${isItaly ? 'linear-gradient(135deg, #C4A265, #D4B275)' : 'linear-gradient(135deg, #9B7BB8, #B08BC8)'}; color: ${isItaly ? '#3A2A1A' : '#2A1F3A'}; }
        .flip-card { perspective: 1000px; height: 220px; cursor: pointer; position: relative; z-index: 1; }
        .flip-inner { width: 100%; height: 100%; position: relative; transition: transform 0.6s; transform-style: preserve-3d; }
        .flip-inner.flipped { transform: rotateY(180deg); }
        .flip-front, .flip-back { position: absolute; inset: 0; backface-visibility: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 16px; }
        .flip-back { transform: rotateY(180deg); }
        @keyframes swipe-left {
          0%   { transform: translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateX(-140%) rotate(-18deg); opacity: 0; }
        }
        @keyframes swipe-right {
          0%   { transform: translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateX(140%) rotate(18deg); opacity: 0; }
        }
        .swipe-left  { animation: swipe-left  0.38s ease-in forwards; pointer-events: none; }
        .swipe-right { animation: swipe-right 0.38s ease-in forwards; pointer-events: none; }
        .badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; }
        .opt { padding: 12px; border-radius: 10px; cursor: pointer; border: 2px solid transparent; margin-bottom: 8px; background: rgba(255,255,255,0.08); }
        .opt:hover { background: rgba(255,255,255,0.15); }
        .opt.sel { border-color: ${isItaly ? '#C4A265' : '#9B7BB8'}; background: ${isItaly ? 'rgba(196,162,101,0.2)' : 'rgba(155,123,184,0.2)'}; }
        .opt.correct { border-color: #7DAA7D; background: rgba(125,170,125,0.2); }
        .opt.wrong { border-color: #C87070; background: rgba(200,112,112,0.2); }
        .progress-bar { height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 4px; transition: width 0.3s; }
      `}</style>

      {/* Reward Modal */}
      {showReward && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowReward(null)}>
          <div className="card" style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: 64 }}>{showReward.icon}</div>
            <h2 style={{ margin: '16px 0 8px' }}>{showReward.name}</h2>
            <p style={{ opacity: 0.7 }}>{showReward.desc}</p>
            <button className="btn" style={{ marginTop: 20 }}>🎉 Claim!</button>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{ padding: 16, borderBottom: `1px solid ${isItaly ? 'rgba(196,162,101,0.3)' : 'rgba(155,123,184,0.3)'}`, background: isItaly ? 'rgba(75,55,40,0.85)' : 'rgba(61,47,82,0.85)', backdropFilter: 'blur(12px)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h1 style={{ fontSize: 22, color: '#fff' }}>🗣️ Lingua</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Streak */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,160,80,0.2)', padding: '6px 12px', borderRadius: 20 }}>
              <span>🔥</span>
              <span style={{ fontWeight: 700, color: '#FFA050' }}>{data.streak}</span>
            </div>
            {/* XP */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: isItaly ? 'rgba(196,162,101,0.2)' : 'rgba(155,123,184,0.2)', padding: '6px 12px', borderRadius: 20 }}>
              <span>⭐</span>
              <span style={{ fontWeight: 700, color: isItaly ? '#D4B275' : '#B08BC8' }}>{data.xp}</span>
            </div>
            {/* Sync status */}
            <div title={syncStatus === 'syncing' ? 'Syncing new content...' : syncStatus === 'done' ? 'Content up to date' : syncStatus === 'error' ? 'Sync failed (offline?)' : ''} style={{ width: 8, height: 8, borderRadius: '50%', background: syncStatus === 'syncing' ? '#FFA050' : syncStatus === 'done' ? '#7DAA7D' : syncStatus === 'error' ? '#C87070' : 'transparent' }} />
          </div>
        </div>

        {/* Direction Toggle */}
        <div onClick={toggleDir} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: isItaly ? 'rgba(196,162,101,0.15)' : 'rgba(155,123,184,0.15)', padding: '8px 16px', borderRadius: 20, cursor: 'pointer', marginBottom: 12, border: `1px solid ${isItaly ? 'rgba(196,162,101,0.3)' : 'rgba(155,123,184,0.3)'}` }}>
          <span style={{ fontSize: 24 }}>{srcFlag}</span>
          <span style={{ fontSize: 18, color: isItaly ? '#D4B275' : '#B08BC8' }}>→</span>
          <span style={{ fontSize: 24 }}>{tgtFlag}</span>
          <span style={{ fontSize: 11, opacity: 0.6, marginLeft: 4 }}>tap to switch</span>
        </div>

        {/* Level Bar */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4, opacity: 0.8 }}>
            <span>Lvl {level.lvl} • {level.title}</span>
            <span>{nextLevel ? `${data.xp - level.xp}/${nextLevel.xp - level.xp} XP` : 'MAX'}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${levelProgress}%`, background: isItaly ? 'linear-gradient(90deg, #C4A265, #D4B275)' : 'linear-gradient(90deg, #9B7BB8, #B08BC8)' }} />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[{ id: 'home', icon: '🏠' }, { id: 'vocab', icon: '📚' }, { id: 'verbs', icon: '📝' }, { id: 'expr', icon: '💬' }, { id: 'story', icon: '📖' }, { id: 'badges', icon: '🏆' }].map(t => (
            <div key={t.id} className={`tab ${page === t.id ? 'active' : ''}`} onClick={() => { setPage(t.id); setSelectedVerb(null); setSelectedExpr(null); setStoryStep('read'); }}>
              {t.icon}
            </div>
          ))}
        </div>
      </header>

      <main style={{ padding: 16, maxWidth: 500, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* HOME */}
        {page === 'home' && (
          <>
            <div className="card" style={{ marginBottom: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 48 }}>👋</div>
              <h2 style={{ margin: '12px 0 4px' }}>Welcome back!</h2>
              <p style={{ opacity: 0.6 }}>{getDue().length} cards to review</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, color: '#ff6b35' }}>🔥 {data.streak}</div>
                <div style={{ fontSize: 12, opacity: 0.6 }}>Day Streak</div>
              </div>
              <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, color: '#22c55e' }}>📚 {learned}</div>
                <div style={{ fontSize: 12, opacity: 0.6 }}>Words Learned</div>
              </div>
            </div>

            <button className="btn" onClick={() => { setPage('vocab'); startReview(); }} disabled={!getDue().length} style={{ width: '100%', padding: 16, fontSize: 18 }}>
              {getDue().length ? `▶ Start Review (${getDue().length})` : '✅ All done!'}
            </button>

            <div className="card" style={{ marginTop: 16 }}>
              <h3 style={{ marginBottom: 12 }}>📖 Today's Story</h3>
              <p style={{ opacity: 0.7, marginBottom: 12 }}>{todayStory.title}</p>
              <button className="btn btn-sec" onClick={() => setPage('story')} style={{ width: '100%' }}>Read →</button>
            </div>
          </>
        )}

        {/* VOCAB */}
        {page === 'vocab' && (
          <>
            {!currentCard ? (
              <>
                <div className="card" style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                    {[{ l: 'Total', v: data.cards.length, c: '#555' }, { l: 'New', v: data.cards.filter(c => c.status === 'new').length, c: isItaly ? '#009246' : '#002395' }, { l: 'Learning', v: data.cards.filter(c => c.status === 'progress').length, c: '#b45309' }, { l: 'Learned', v: learned, c: '#15803d' }].map(s => (
                      <div key={s.l}><div style={{ fontSize: 24, fontWeight: 700, color: s.c }}>{s.v}</div><div style={{ fontSize: 11, opacity: 0.6 }}>{s.l}</div></div>
                    ))}
                  </div>
                </div>

                <button className="btn" onClick={startReview} disabled={!getDue().length} style={{ width: '100%', marginBottom: 16 }}>
                  {getDue().length ? `🎯 Review ${getDue().length} cards` : '✅ All caught up!'}
                </button>

                <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                  {['all', 'new', 'progress', 'learned'].map(f => (
                    <button key={f} className={`btn ${filter === f ? '' : 'btn-sec'}`} onClick={() => setFilter(f)} style={{ padding: '8px 14px', fontSize: 12 }}>
                      {f === 'progress' ? 'Learning' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                  <button className="btn" onClick={() => setShowAdd(true)} style={{ marginLeft: 'auto', padding: '8px 14px' }}>+ Add</button>
                </div>

                {showAdd && (
                  <div className="card" style={{ marginBottom: 12, border: '2px solid #667eea' }}>
                    <input placeholder="Italian" value={newWord.it} onChange={e => setNewWord(p => ({ ...p, it: e.target.value }))} style={{ marginBottom: 10 }} />
                    <input placeholder="French" value={newWord.fr} onChange={e => setNewWord(p => ({ ...p, fr: e.target.value }))} style={{ marginBottom: 10 }} />
                    <div style={{ display: 'flex', gap: 10 }}><button className="btn" onClick={addWord}>Add</button><button className="btn btn-sec" onClick={() => setShowAdd(false)}>Cancel</button></div>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {getFiltered().slice(0, 20).map(c => (
                    <div key={c.id} className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ flex: 1 }}><div style={{ fontWeight: 600 }}>{c[src]}</div><div style={{ fontSize: 13, opacity: 0.6 }}>{c[tgt]}</div></div>
                      <span className="badge" style={{ background: c.status === 'new' ? (isItaly ? 'rgba(0,146,70,0.2)' : 'rgba(0,35,149,0.2)') : c.status === 'progress' ? 'rgba(251,191,36,0.3)' : 'rgba(34,197,94,0.3)', color: c.status === 'new' ? (isItaly ? '#009246' : '#002395') : c.status === 'progress' ? '#b45309' : '#15803d' }}>
                        {c.status === 'progress' ? 'learning' : c.status}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className={`flip-card${swipeDir ? ' swipe-' + swipeDir : ''}`} onClick={() => !swipeDir && setFlipped(!flipped)}>
                  <div className={`flip-inner ${flipped ? 'flipped' : ''}`}>
                    <div className="flip-front" style={{ background: isItaly ? 'linear-gradient(135deg, #009246, #00a854)' : 'linear-gradient(135deg, #002395, #0033cc)', color: '#fff' }}>
                      <div style={{ fontSize: 13, opacity: 0.8 }}>{srcFlag} {src === 'it' ? 'Italian' : 'French'}</div>
                      <div style={{ fontSize: 32, fontWeight: 700, margin: '12px 0' }}>{currentCard[src]}</div>
                      <div style={{ opacity: 0.7 }}>Tap to reveal</div>
                    </div>
                    <div className="flip-back" style={{ background: isItaly ? 'linear-gradient(135deg, #ce2b37, #e63946)' : 'linear-gradient(135deg, #ed2939, #ff4d5a)', color: '#fff' }}>
                      <div style={{ fontSize: 13, opacity: 0.8 }}>{tgtFlag} {tgt === 'fr' ? 'French' : 'Italian'}</div>
                      <div style={{ fontSize: 32, fontWeight: 700, margin: '12px 0' }}>{currentCard[tgt]}</div>
                    </div>
                  </div>
                </div>
                {flipped && (
                  <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                    <button className="btn btn-danger" onClick={() => handleSwipe(false)} disabled={!!swipeDir} style={{ flex: 1 }}>✗ Wrong</button>
                    <button className="btn btn-success" onClick={() => handleSwipe(true)} disabled={!!swipeDir} style={{ flex: 1 }}>✓ Correct</button>
                  </div>
                )}
                <button className="btn btn-sec" onClick={() => setCurrentCard(null)} style={{ width: '100%', marginTop: 12 }}>Exit</button>
              </>
            )}
          </>
        )}

        {/* VERBS */}
        {page === 'verbs' && (
          <>
            {!selectedVerb ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {allVerbs.map(v => (
                  <div key={v.id} className="card">
                    <div style={{ fontSize: 18, fontWeight: 600 }}>{v[src]} / {v[tgt]}</div>
                    <div style={{ opacity: 0.6, marginBottom: 12 }}>{v.en}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-sec" onClick={() => { setSelectedVerb(v); setVerbMode('view'); }} style={{ flex: 1 }}>📖 View</button>
                      <button className="btn" onClick={() => { setSelectedVerb(v); setVerbMode('practice'); setAnswers({}); setChecked(false); }} style={{ flex: 1 }}>✏️ Practice</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : verbMode === 'view' ? (
              <>
                <button className="btn btn-sec" onClick={() => setSelectedVerb(null)} style={{ marginBottom: 16 }}>← Back</button>
                <div className="card" style={{ marginBottom: 16 }}>
                  <h2>{selectedVerb[src]} / {selectedVerb[tgt]}</h2>
                  <p style={{ opacity: 0.6 }}>{selectedVerb.en}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  {['present', 'past', 'future'].map(t => (
                    <button key={t} className={`btn ${verbTense === t ? '' : 'btn-sec'}`} onClick={() => setVerbTense(t)} style={{ flex: 1 }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
                  ))}
                </div>
                <div className="card">
                  {PRONOUNS.map((p, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 5 ? '1px solid rgba(0,0,0,0.1)' : 'none' }}>
                      <span style={{ opacity: 0.6 }}>{p}</span>
                      <span style={{ color: isItaly ? '#009246' : '#002395', fontWeight: 500 }}>{selectedVerb.conj[verbTense].it[i]}</span>
                      <span style={{ color: isItaly ? '#ce2b37' : '#ed2939', fontWeight: 500 }}>{selectedVerb.conj[verbTense].fr[i]}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <button className="btn btn-sec" onClick={() => setSelectedVerb(null)} style={{ marginBottom: 16 }}>← Back</button>
                <div className="card" style={{ marginBottom: 16 }}>
                  <h2>Practice: {selectedVerb[src]}</h2>
                  <p style={{ opacity: 0.6 }}>Conjugate in {src === 'it' ? 'Italian' : 'French'}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  {['present', 'past', 'future'].map(t => (
                    <button key={t} className={`btn ${verbTense === t ? '' : 'btn-sec'}`} onClick={() => { setVerbTense(t); setAnswers({}); setChecked(false); }} style={{ flex: 1 }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
                  ))}
                </div>
                <div className="card" style={{ marginBottom: 16 }}>
                  {PRONOUNS.map((p, i) => {
                    const correct = selectedVerb.conj[verbTense][src === 'it' ? 'it' : 'fr'][i];
                    const isCorrect = answers[i]?.toLowerCase().trim() === correct.toLowerCase();
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                        <span style={{ width: 70, opacity: 0.6 }}>{p}</span>
                        <input value={answers[i] || ''} onChange={e => setAnswers(a => ({ ...a, [i]: e.target.value }))} disabled={checked} style={{ flex: 1, borderColor: checked ? (isCorrect ? '#22c55e' : '#ef4444') : undefined }} />
                        {checked && !isCorrect && <span style={{ color: '#22c55e', fontSize: 13 }}>{correct}</span>}
                      </div>
                    );
                  })}
                </div>
                {!checked ? (
                  <button className="btn" onClick={() => { checkVerb(); addXp(verbScore === 6 ? 50 : verbScore * 5); checkStreak(); }} style={{ width: '100%' }}>Check</button>
                ) : (
                  <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 28, fontWeight: 700, color: verbScore === 6 ? '#22c55e' : '#fbbf24' }}>{verbScore} / 6</div>
                    <button className="btn" onClick={() => { setAnswers({}); setChecked(false); }} style={{ marginTop: 12 }}>Try Again</button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* EXPRESSIONS */}
        {page === 'expr' && (
          <>
            {!selectedExpr ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {allExpressions.map(e => (
                  <div key={e.id} className="card" style={{ cursor: 'pointer' }} onClick={() => setSelectedExpr(e)}>
                    <div style={{ fontWeight: 600 }}>{e[src]}</div>
                    <div style={{ opacity: 0.6 }}>{e[tgt]}</div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <button className="btn btn-sec" onClick={() => setSelectedExpr(null)} style={{ marginBottom: 16 }}>← Back</button>
                <div className="card" style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: isItaly ? '#009246' : '#002395' }}>{srcFlag}</div>
                  <div style={{ fontSize: 22, fontWeight: 600, margin: '8px 0' }}>{selectedExpr[src]}</div>
                  <div style={{ fontSize: 12, color: isItaly ? '#ce2b37' : '#ed2939', marginTop: 16 }}>{tgtFlag}</div>
                  <div style={{ fontSize: 22, fontWeight: 600, marginTop: 8 }}>{selectedExpr[tgt]}</div>
                </div>
                <div className="card" style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, opacity: 0.5 }}>Literal</div>
                  <div style={{ fontStyle: 'italic' }}>"{selectedExpr.lit}"</div>
                </div>
                <div className="card">
                  <div style={{ fontSize: 12, opacity: 0.5 }}>Context</div>
                  <div style={{ marginTop: 8 }}>{selectedExpr.ctx}</div>
                </div>
              </>
            )}
          </>
        )}

        {/* STORY */}
        {page === 'story' && (
          <>
            <div className="card" style={{ marginBottom: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 12, opacity: 0.5 }}>📖 Today's Story</div>
              <h2 style={{ marginTop: 8 }}>{todayStory.title}</h2>
            </div>

            {storyStep === 'read' && (
              <>
                <div className="card" style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: isItaly ? '#009246' : '#002395', marginBottom: 8 }}>{srcFlag}</div>
                  <p style={{ lineHeight: 1.8 }}>{todayStory[src]}</p>
                </div>
                {showTrans && (
                  <div className="card" style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 12, color: isItaly ? '#ce2b37' : '#ed2939', marginBottom: 8 }}>{tgtFlag}</div>
                    <p style={{ lineHeight: 1.8 }}>{todayStory[tgt]}</p>
                  </div>
                )}
                <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <button className="btn btn-sec" onClick={() => setShowTrans(!showTrans)} style={{ flex: 1 }}>{showTrans ? 'Hide' : 'Show'} Translation</button>
                  <button className="btn" onClick={() => setStoryStep('quiz')} style={{ flex: 1 }}>Quiz →</button>
                </div>
                <div className="card">
                  <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 8 }}>New words</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {todayStory.words.map((w, i) => (
                      <span key={i} style={{ padding: '6px 12px', background: 'rgba(102,126,234,0.2)', borderRadius: 8, fontSize: 12 }}>{w[src]} = {w[tgt]}</span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {storyStep === 'quiz' && (
              <>
                {todayStory.questions.map((q, qi) => (
                  <div key={qi} className="card" style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 600, marginBottom: 12 }}>{qi + 1}. {q.q}</div>
                    {q.opts.map((o, oi) => (
                      <div key={oi} className={`opt ${storyAnswers[qi] === oi ? 'sel' : ''}`} onClick={() => setStoryAnswers(a => ({ ...a, [qi]: oi }))}>{o}</div>
                    ))}
                  </div>
                ))}
                <button className="btn" onClick={finishStory} disabled={Object.keys(storyAnswers).length < todayStory.questions.length} style={{ width: '100%' }}>Submit</button>
              </>
            )}

            {storyStep === 'results' && (
              <>
                <div className="card" style={{ textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 48 }}>{todayStory.questions.filter((q, i) => storyAnswers[i] === q.ans).length === todayStory.questions.length ? '🎉' : '📚'}</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>{todayStory.questions.filter((q, i) => storyAnswers[i] === q.ans).length} / {todayStory.questions.length}</div>
                  <div style={{ color: '#22c55e', marginTop: 8 }}>+{todayStory.words.length} words added!</div>
                </div>
                <button className="btn btn-sec" onClick={() => { setStoryStep('read'); setStoryAnswers({}); setShowTrans(false); }} style={{ width: '100%' }}>Read Again</button>
              </>
            )}
          </>
        )}

        {/* BADGES */}
        {page === 'badges' && (
          <>
            <div className="card" style={{ marginBottom: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 36 }}>🏆</div>
              <h2 style={{ marginTop: 8 }}>Achievements</h2>
              <p style={{ opacity: 0.6 }}>{data.unlockedBadges.length} / {BADGES.length} unlocked</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {BADGES.map(b => {
                const unlocked = data.unlockedBadges.includes(b.id);
                return (
                  <div key={b.id} className="card" style={{ textAlign: 'center', opacity: unlocked ? 1 : 0.4 }}>
                    <div style={{ fontSize: 32 }}>{b.icon}</div>
                    <div style={{ fontWeight: 600, marginTop: 8 }}>{b.name}</div>
                    <div style={{ fontSize: 11, opacity: 0.6 }}>{b.desc}</div>
                    {unlocked && <div style={{ color: '#22c55e', fontSize: 12, marginTop: 8 }}>✓ Unlocked</div>}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}