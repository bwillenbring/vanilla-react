/**
 * ----------------------------------------------------------------
 * Write a function that takes a single number input, and returns a string representing that number in words.
 * ----------------------------------------------------------------
 * Assume:
 * ----------------------------------------------------------------
 * ✅ The input will always be an integer between -100 and 100 (inclusive)
 * ✅ The function does not have to handle numbers outside of this range
 * ✅ Expected output will always be lowercased English (no commas)
 * ✅ Expected output for values > 20 should be HYPHENATED (see examples)
 *
 * ----------------------------------------------------------------
 * Inputs   =>    expected outputs:
 * ----------------------------------------------------------------
 *    -12   =>    "negative twelve"
 *    -99   =>    "negative ninety-nine"
 *      0   =>    "zero"
 *     19   =>    "nineteen"  // not: "nine-teen"
 *     41   =>    "forty-one"
 * */

const numberToWords = (num: number): string => {
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

  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  const hundred = "hundred";

  const convert = (n: number): string => {
    if (n < 0) return `negative ${convert(-n)}`;
    if (n < 20) return belowTwenty[n];
    if (n < 100)
      return (
        tens[Math.floor(n / 10)] +
        (n % 10 !== 0 ? `-${belowTwenty[n % 10]}` : "")
      );
    if (n === 100) return `one ${hundred}`;
    return "";
  };

  return convert(num);
};

export { numberToWords };
