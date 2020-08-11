import HashMap from './HashMap.js';
// import HashMap from './hash-map-separate-chaining.js';

function removeDuplicates(inputString) {
  const charsInString = new HashMap();
  let outputString = '';
  for (let i = 0; i < inputString.length; i += 1) {
    const currChar = inputString[i];
    if (!charsInString.get(currChar)) {
      charsInString.set(currChar, true);
      outputString += currChar;
    }
  }
  return outputString;
}

function getNumUnpairedLetters(string) {
  const letterCount = new HashMap();
  const uniqueLetters = [];
  for (let i = 0; i < string.length; i += 1) {
    const currChar = string[i];
    const currLetterCount = letterCount.get(currChar);
    if (!currLetterCount) {
      letterCount.set(currChar, 1);
      uniqueLetters.push(currChar);
    } else {
      letterCount.set(currChar, currLetterCount + 1);
    }
  }

  let numUnpairedLetters = 0;
  uniqueLetters.forEach(letter => {
    const unpairedLetter = letterCount.get(letter) % 2 === 1;
    if (unpairedLetter) numUnpairedLetters += 1;
  });
  return numUnpairedLetters;
}

function containsAnagram(inputString) {
  const string = inputString.toLowerCase();

  const numUnpairedLetters = getNumUnpairedLetters(string);

  const evenNumLetters = string.length % 2 === 0;
  console.log('evenNumLetters: ', evenNumLetters);
  console.log('numUnpairedLetters: ', numUnpairedLetters);
  if (evenNumLetters && numUnpairedLetters === 0) {
    return true;
  }
  if (!evenNumLetters && numUnpairedLetters === 1) {
    return true;
  }

  return false;
}

function alphabetizeString(string) {
  return string
    .split('')
    .sort()
    .join('');
}

function groupAnagrams(inputWordsArr) {
  const wordGroupsArr = [];
  const wordGroupsHashMap = new HashMap();
  inputWordsArr.forEach(word => {
    const string = word.toLowerCase();
    const alphabetizedWord = alphabetizeString(string);
    const currAnagrams = wordGroupsHashMap.get(alphabetizedWord);
    if (!currAnagrams) {
      wordGroupsArr.push(alphabetizedWord);
      wordGroupsHashMap.set(alphabetizedWord, [word]);
    } else {
      currAnagrams.push(word);
      wordGroupsHashMap.set(alphabetizedWord, currAnagrams);
    }
  });
  const outputArr = wordGroupsArr.map(wordGroup =>
    wordGroupsHashMap.get(wordGroup)
  );
  return outputArr;
}

function main() {
  // const lotr = new HashMap();
  // lotr.set('Hobbit', 'Bilbo');
  // lotr.set('Hobbit', 'Frodo');
  // lotr.set('Wizard', 'Gandalf');
  // lotr.set('Human', 'Aragorn');
  // lotr.set('Elf', 'Legolas');
  // lotr.set('Maiar', 'The Necromancer');
  // lotr.set('Maiar', 'Sauron');
  // lotr.set('RingBearer', 'Gollum');
  // lotr.set('LadyOfLight', 'Galadriel');
  // lotr.set('HalfElven', 'Arwen');
  // lotr.set('Ent', 'Treebeard');
  // console.log(lotr);
  // console.log(lotr.get('Maiar'));
  // console.log(removeDuplicates('google'));
  // console.log(containsAnagram('acecarr'));
  // const anagramInput = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];
  // console.log(groupAnagrams(anagramInput));
}

main();
