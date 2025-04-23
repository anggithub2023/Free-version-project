
export function scoreValue(answer) {
  if (answer === 'yes') return 8.33;
  if (answer === 'unsure') return 4.16;
  return 0;
}
