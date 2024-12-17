/* eslint-disable no-bitwise */ // This is a bitwise challenge lol

/*
The program given as the problem input does the following when inspected according to the rules given:

B is last 3 bits of A, with 2 bit flipped
C is A shifted right B bits
B is last 3 bits of A, with 4 and 1 bits flipped
Flip bits of B that are set in C

Output last 3 bits of B
Bit shift A right 3 bits
IF A still has bits, loop

 */

// Write the above program in its simplest form
const simplifiedProgram = (startingA) => {
  let a = startingA;
  let out = "";
  while (a !== 0n) {
    out +=
      (out.length ? "," : "") +
      Number(((a & 7n) ^ 5n ^ (a >> ((a & 7n) ^ 2n))) & 7n);
    a >>= 3n;
  }
  return out;
};

// The target is to output the original program, which is this:
const target = "2,4,1,2,7,5,1,7,4,4,0,3,5,5,3,0";

// Numbers 0-7 in binary, or all combos of three bits
const allThreeBits = ["000", "001", "010", "011", "100", "101", "110", "111"];

/*
 Since appending more sets of three bits to the end does not change the tail of the produced sequence,
 (i.e. 0b111000111 produces 4,3,2 and 0b111000111001 produces 3,4,3,2, which has the same tail)
 once you find a number that produces some portion of the tail of the target output, you can append a
 new set of three bits to the end without affecting the already correct tail.
 This makes for a very simple dfs to find all solutions
 */
const dfs = (binaryEncodedRegA) => {
  const regA = BigInt(binaryEncodedRegA); // Construct a bigint from the input string
  const result = simplifiedProgram(regA); // Get the result of running the program with that value
  if (!result || !target.endsWith(result)) return []; // If the tail is wrong, there are no solutions down this path
  if (target === result) return [regA]; // If this is the target sequence entirely, return it as a valid solution
  // Else you have an incomplete but correct tail, so append each possible set of 3 bits, and recur
  return allThreeBits.flatMap((bits) => dfs(binaryEncodedRegA + bits));
};

const allPossibleAValues = allThreeBits.flatMap((bits) => dfs("0b" + bits));
console.log(allPossibleAValues);
