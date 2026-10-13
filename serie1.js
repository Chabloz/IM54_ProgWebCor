// 1. Retourner le plus grand de trois nombres.
function max(a, b, c) {
  let largest = a;
  if (b > largest) largest = b;
  if (c > largest) largest = c;
  return largest;
}

// 2. Tirer un entier entre min et max, bornes comprises.
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 3. Comparer avec ou sans conversion implicite de type.
function compareA(a, b) {
  return a == b; // L'égalité faible est voulue dans cet exercice.
}

function compareB(a, b) {
  return a === b;
}

// 4. Afficher les nombres correspondant à chaque condition, de 0 à limit.
function showEvenNumbers(limit) {
  for (let number = 0; number <= limit; number++) {
    if (number % 2 === 0) console.log(number);
  }
}

function showEvenAndMultipleOfSeven(limit) {
  for (let number = 0; number <= limit; number++) {
    if (number % 2 === 0 && number % 7 === 0) console.log(number);
  }
}

function showEvenAndMultipleOfThreeOrMultipleOfSeven(limit) {
  for (let number = 0; number <= limit; number++) {
    if ((number % 2 === 0 && number % 3 === 0) || number % 7 === 0) {
      console.log(number);
    }
  }
}

function showEvenAndMultipleOfThreeAndNotMultipleOfSeven(limit) {
  for (let number = 0; number <= limit; number++) {
    if (number % 2 === 0 && number % 3 === 0 && number % 7 !== 0) {
      console.log(number);
    }
  }
}

// 5. Simuler des lancers de pièces.
function numberOfHeads(count) {
  let heads = 0;

  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.5) heads++;
  }

  return heads;
}

function numberOfHeadsAndTails(count) {
  const heads = numberOfHeads(count);
  return { heads, tails: count - heads };
}

// 6. Chercher un diviseur jusqu'à la racine carrée du nombre.
function isPrime(number) {
  if (number < 2) return false;
  if (number === 2) return true;
  if (number % 2 === 0) return false;

  for (let divisor = 3; divisor * divisor <= number; divisor += 2) {
    if (number % divisor === 0) return false;
  }

  return true;
}

// 7. Afficher chaque argument sur une ligne.
function cl(...values) {
  values.forEach(value => console.log(value));
}

// 8. Passer une fonction de transformation en paramètre.
function double(number) {
  return number * 2;
}

function square(number) {
  return number * number;
}

function transform(number, operation) {
  return operation(number);
}

// 9. Réappliquer la même fonction au résultat précédent.
function repeatTransform(number, operation, times) {
  let result = number;

  for (let i = 0; i < times; i++) {
    result = operation(result);
  }

  return result;
}

// 10. Retourner une fonction qui conserve la formule de salutation.
function createGreeting(greeting) {
  return function (name) {
    return `${greeting} ${name} !`;
  };
}

// 10. Retourner une fonction qui conserve la formule de salutation.
// version arrow function
function createGreetingV2(greeting) {
  return name => `${greeting} ${name} !`;
}

// Exemples d'utilisation.
console.log('1. Maximum:', max(4, 9, 7));
console.log('2. Entier aléatoire entre 1 et 6:', randomInt(1, 6));

console.log('3. compareA:', compareA(4, '4'), compareA(4.0, '4'), compareA(4, 'quatre'));
console.log('3. compareB:', compareB(8, '8'), compareB(8, 'huit'));

console.log('4a. Nombres pairs de 0 à 30:');
showEvenNumbers(30);
console.log('4b. Nombres pairs et multiples de 7 de 0 à 30:');
showEvenAndMultipleOfSeven(30);
console.log('4c. Nombres pairs multiples de 3 ou multiples de 7 de 0 à 30:');
showEvenAndMultipleOfThreeOrMultipleOfSeven(30);
console.log('4d. Nombres pairs multiples de 3, non multiples de 7, de 0 à 30:');
showEvenAndMultipleOfThreeAndNotMultipleOfSeven(30);

console.log('5. Nombre de piles sur 10 lancers:', numberOfHeads(10));
console.log('5. Piles et faces sur 10 lancers:', numberOfHeadsAndTails(10));

const primeTests = [0, 1, 2, 3, 4, 9, 11, 26, 87178291197, 87178291199];
for (const number of primeTests) {
  console.log(`6. ${number} est premier : ${isPrime(number)}`);
}

console.log('7. Affichage des arguments :');
cl(1, 2, 'a', [3.1, 4, 159]);

console.log('8. Double de 5 :', transform(5, double));
console.log('8. Carré de 5 :', transform(5, square));
console.log('9. Doubler 2 trois fois :', repeatTransform(2, double, 3));
console.log('9. Mettre 2 au carré deux fois :', repeatTransform(2, square, 2));

const sayHello = createGreeting('Hello');
const sayWelcome = createGreeting('Welcome');
console.log('10.', sayHello('Ada'));
console.log('10.', sayWelcome('Linus'));

// version plus complexe pour les nombres premiers
// 6) Ecrire une fonction qui indique si un nombre entier est un nombre premier ou non. Tester la fonction avec les valeurs suivantes: 0, 1, 2, 3, 4, 9, 11, 26, 87178291197, 87178291199.
function isPrimeV2(n) {
    if (isNaN(n) || !Number.isInteger(n)) throw 'Not an integer';
    if (n > Number.MAX_SAFE_INTEGER) throw 'Number too big';
    if (n <= 1) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    if (n == 3) return true;
    if (n % 3 == 0) return false;
    // On pourrait continuer avec le crible d'Ératosthène pour les multiples de 5, 7, 11, ...
    // mais cela rendrait la programmation de la boucle suivante très complexe
    // et il faudrait repenser la totalité de l'algorithme.
    let step = 2;
    let div = 5;
    while (div * div <= n && n % div != 0) {
        div += step;
        // Pas alterné (+2 +4 +2 +4 ...) pour ne pas parcourir les multiples de 2 ni de 3
        step = (step + 1) % 4 + 1;
    }
    // Si aucun diviseur n'a été trouvé avant la racine du nb, c'est un nombre premier
    return div * div > n;
}