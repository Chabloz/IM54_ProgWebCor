// Tableaux de nombres
const numbers = Object.freeze([3, 14, 15, 92, 65, 35, 89, 79, 32, 38]);
console.log('Number exercises');

// 1. Afficher tous les nombres.
console.log('1. All numbers:');
numbers.forEach(number => console.log(number));

// 2. Doubler chaque valeur.
const doubledNumbers = numbers.map(number => number * 2);
console.log('2. Doubled numbers:', doubledNumbers);

// 3. Garder les valeurs impaires.
const oddNumbers = numbers.filter(number => number % 2 !== 0);
console.log('3. Odd numbers:', oddNumbers);

// 4. Retirer le premier élément.
const withoutFirst = numbers.slice(1);
console.log('4. Without first:', withoutFirst);

// 5. Retirer le dernier élément.
const withoutLast = numbers.slice(0, -1);
console.log('5. Without last:', withoutLast);

// 6. Calculer la somme.
const sum = numbers.reduce((total, number) => total + number, 0);
console.log('6. Sum:', sum);

// 7. Trouver le plus grand nombre.
const largest = Math.max(...numbers);
console.log('7. Largest:', largest);

// 8. A au moins un multiple de 9.
const hasMultipleOfNine = numbers.some(number => number % 9 === 0);
console.log('8. Has a multiple of 9:', hasMultipleOfNine);

// 9. Vérifier que tous les nombres sont strictement positifs.
const allPositive = numbers.every(number => number > 0);
console.log('9. All positive:', allPositive);

// 10. Placer les pairs avant les impairs sans changer leur ordre relatif.
const evenNumbers = numbers.filter(number => number % 2 === 0);
const evenThenOdd = [...evenNumbers, ...oddNumbers];
console.log('10. Even then odd:', evenThenOdd);


// Tableaux de chaînes de caractères
const strings = Object.freeze(['Sator', 'Arepo', 'Tenet', 'Opera', 'Rotas']);
console.log('\nString exercises');

// 1. Chercher la lettre r sans tenir compte de la casse.
const wordsWithR = strings.filter(word => word.toLowerCase().includes('r'));
console.log('1. Words containing r:', wordsWithR);

// 2. Vérifier la longueur de tous les mots.
const allFiveLetters = strings.every(word => word.length === 5);
console.log('2. All words have 5 letters:', allFiveLetters);

// 3. Ajouter un mot au début.
const withLorem = ['Lorem', ...strings];
console.log('3. With Lorem:', withLorem);

// 4. Ajouter un mot à la fin.
const withIpsum = [...strings, 'Ipsum'];
console.log('4. With Ipsum:', withIpsum);

// 5. Remplacer le mot du milieu, ou celui juste avant le milieu.
const middleIndex = Math.floor((strings.length - 1) / 2);
const withRadar = strings.map((word, index) => index === middleIndex ? 'radar' : word);
console.log('5. With radar:', withRadar);

// 6. Concaténer les mots.
const concatenated = strings.join('');
console.log('6. Concatenated:', concatenated);

// 7. Trouver le premier mot dans l'ordre alphabétique.
const firstAlphabetically = strings.toSorted((a, b) => a.localeCompare(b))[0];
console.log('7. First alphabetically:', firstAlphabetically);

// 8. Vérifier si les mots concaténés forment un palindrome.
function isPalindrome(text) {
  const normalized = text.toLowerCase();
  const reversed = normalized.split('').reverse().join('');
  return normalized === reversed;
}

console.log('8. Is a palindrome:', isPalindrome(concatenated));


// Tableaux d'objets : jeu de cartes
const JACK = 11;
const QUEEN = 12;
const KING = 13;
const ACE = 14;

const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, JACK, QUEEN, KING, ACE];
const SUITS = ['hearts', 'spades', 'clubs', 'diamonds'];
console.log('\nCard exercises');

// 1 et 2. Une carte est un objet { rank, suit } ; le paquet est un tableau de cartes.
function buildBaseDeck() {
  const deck = [];

  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit });
    }
  }

  return deck;
}

const deck = Object.freeze(buildBaseDeck());
console.log('1–2. Base deck:', deck);

// 3. Mélanger le tableau reçu sur place avec Fisher–Yates.
function shuffleInPlace(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
}

// 4. Mélanger une copie avant d'en tirer les premières cartes.
// On suppose que count est un entier compris entre 0 et deck.length.
function drawCards(deck, count) {
  const shuffled = [...deck];
  shuffleInPlace(shuffled);
  return shuffled.slice(0, count);
}

// 5. Un résultat négatif, nul ou positif indique l'ordre des valeurs.
function compareRank(first, second) {
  return first.rank - second.rank;
}

// 6. Trouver la plus forte carte d'une main non vide.
function getHighestCard(cards) {
  let maxCard = cards[0];
  for (const card of cards) {
    if (compareRank(card, maxCard) > 0) maxCard = card;
  }
  return maxCard;
}

// 7. Séparer la valeur des cartes de leur présentation dans le terminal.
const RANK_LABELS = {
  [JACK]: 'J',
  [QUEEN]: 'Q',
  [KING]: 'K',
  [ACE]: 'A',
};

const SUIT_SYMBOLS = {
  hearts: '♥',
  spades: '♠',
  clubs: '♣',
  diamonds: '♦',
};

function displayRank(rank) {
  return RANK_LABELS[rank] ?? String(rank);
}

function showCard(card) {
  const label = `${displayRank(card.rank)}${SUIT_SYMBOLS[card.suit]}`;
  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
  const color = isRed ? '\x1b[31;47m' : '\x1b[30;47m';
  console.log(`${color}${label}\x1b[0m`);
}

const [firstCard, secondCard] = drawCards(deck, 2);
const comparison = compareRank(firstCard, secondCard);

console.log('5. Drawn cards:', firstCard, secondCard);
if (comparison < 0) {
  console.log('5. Highest card:', secondCard);
} else if (comparison > 0) {
  console.log('5. Highest card:', firstCard);
} else {
  console.log('5. Equal ranks');
}

// 6. Tirer cinq cartes distinctes et trouver la plus forte.
const hand = drawCards(deck, 5);
const highestInHand = getHighestCard(hand);

console.log('6. Hand:', hand);
console.log('6. Highest card in hand:', highestInHand);

console.log('7. Drawn cards in color:');
showCard(firstCard);
showCard(secondCard);
console.log('7. Hand in color:');
hand.forEach(showCard);
console.log('7. Highest card in color:');
showCard(highestInHand);
