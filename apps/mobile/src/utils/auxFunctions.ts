function calculateChileanRunValidator(run: string) {
  const weights = [2, 3, 4, 5, 6, 7];
  let sum = 0;

  for (let i = 0; i < run.length; i++) {
    const digit = parseInt(run[run.length - 1 - i], 10);
    const weight = weights[i % weights.length];
    sum += digit * weight;
  }

  const result = 11 - (sum % 11);

  if (result === 10) {
    return "K";
  } else if (result === 11) {
    return "0";
  } else {
    return result.toString();
  }
}

export { calculateChileanRunValidator };
