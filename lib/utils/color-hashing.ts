export const generateDeterministicColorIndex = (
  inputString: string,
  arrayLength: number,
): number => {
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % arrayLength;
};
