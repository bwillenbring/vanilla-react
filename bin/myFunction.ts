// For the proctor: This is the function I (Ben W.) wrote to solve the problem. It's definitely not the only solution, and may not be the most elegant, but it works. I've included some comments to explain my thought process.

const numberToWords = (num: number): string => {
  // 1. Create an array of strings that can easily map integers 0-19
  const belowTwenty = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];

  // 2. Create an array of strings for exact multiples of ten > 19 and < 100
  const tens = [
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  // 3. Create a string representation for exactly 100
  const hundred = "one hundred";

  // 4. Create a recursive function that converts a number to words
  const convert = (n: number): string => {
    // Case 1: It's negative... prefix with "negative" and recursively call the function on the positive value
    if (n < 0) return `negative ${convert(-n)}`;
    // case 2: It's 0-19 — just return the value from the belowTwenty array
    else if (n < 20) return belowTwenty[n];
    // Case 3: Its exactly 100 — super easy
    else if (n === 100) return hundred;
    // Case 4: It's 20-99 — a little more complex
    else {
      // Split the number into a 2-item number array where the 1st item is the tens place and the 2nd item is the ones place
      const arrayOfNums = n
        .toString()
        .split("")
        .map((char) => parseInt(char));

      // Find out what's in the tens and ones place
      const [tensDigit, onesDigit] = arrayOfNums;
      // If it's an even multiple of 10, return tens[tensDigit-2]
      if (onesDigit === 0) return tens[tensDigit - 2];
      // Otherwise, it's something like 21, 43, 45, etc. No problem: return tens[tensDigit-2] + "-" + belowTwenty[onesDigit]
      return `${tens[tensDigit - 2]}-${belowTwenty[onesDigit]}`;
    }
  };
  // 5. Return the result of calling the recursive function on the input number
  return convert(num);
};

export { numberToWords };
