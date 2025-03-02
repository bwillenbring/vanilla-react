const displayAlert = (): void => {
  alert("Hello, world!");
}

/**
 * Shuffles a copy of a given array without modifying the original array. If the Array is 1 or fewer elements, it returns the array as is.
 * @param array - An array of any type
 * @returns array - Returns a shuffled array
 */
const shuffle = (array: Array<unknown>): Array<unknown> => {
  const shuffledArray = array.slice(); // Create a copy of the array
  // If the array is 1 or fewer elements, return it
  if (shuffledArray.length <= 1) return shuffledArray;
  let currentIndex = shuffledArray.length;
  let temporaryValue: unknown, randomIndex: number;

  // While there are elements to shuffle
  while (currentIndex !== 0) {
    // Pick a random element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap it with the current element
    temporaryValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temporaryValue;
  }
  // Before returning, make sure it's different from the original
  const isSameArray = JSON.stringify(array) === JSON.stringify(shuffledArray);
  if (isSameArray) {
    return shuffle(array);
  }
  return shuffledArray;
};

/**
 *
 * @returns {string} - Returns the long name of the current day using the ISO standard (eg: Monday, Tuesday, etc)
 */
const getCurrentDay = (): string => {
  const date = new Date();
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

const throwError = (): void => {
  throw new Error("This is an error");
}

// Export all functions 
export { displayAlert, shuffle, getCurrentDay, throwError };
