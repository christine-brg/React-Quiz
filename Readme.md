# Crearea unei Aplicații de Quiz în React (cu useState, useEffect și Context)
## Cerințe Generale
### Configurare Proiect
- Creează un proiect `React` folosind `Vite`.
- Folosește fișiere `.json` pentru a stoca întrebările și răspunsurile.
### Interfață Utilizator (UI) & Experiență
- Paginile trebuie să fie responsive (optimizate pentru mobile, tabletă și desktop).
- Stilizarea se poate face cu CSS/modulare sau biblioteci externe (e.g., Tailwind, Material-UI).
- Implementează schimbarea temei (minim 2: light și dark) cu un buton accesibil.
## Funcționalități
### 1. Pagina de Start
Utilizatorul introduce:
- Numele.
- Opțiuni de quiz:
    - Ordine aleatorie a întrebărilor (da/nu).
    - Timp limită per întrebare (e.g., 10s, sau posibilitatea de a avea timp nelimitat).

Toate valorile sunt obligatorii, deci validați să fie corecte sau oferiți valori implicite adecvate.
### 2. Structura Întrebărilor
Fiecare întrebare are:
- Categorie (e.g., "Istorie", "Matematică").
- Dificultate (e.g., "Ușor", "Mediu", "Greu").
- 4 opțiuni de răspuns (doar una corectă).

Aceste detalii trebuie afișate în timpul quiz-ului.

### 3. Afișarea Rezultatelor
După finalizarea quiz-ului, afișează:
- Scorul final (e.g., "8/10 răspunsuri corecte").
- Detalii de întrebări (care au fost răspunse corect/greșit).
- Istoric scoruri (salvat în localStorage): Tabel cu Username și Highest Score pentru toți utilizatorii.

### 4. Resetare & Persistență
- Adaugă un buton pentru resetare quiz (revenire la pagina de start).
- Păstrează istoricul scorurilor (localStorage).


## Am crezut că mă dau cu capul de toți pereții...
![img.png](img.png)
