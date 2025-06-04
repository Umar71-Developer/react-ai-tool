 export function checkHeading(str) {
  return /^\*\*[^*]+\*$/.test(str.trim());
}

export function removeAsterisks(text) {
  return text.replace(/\*+/g, '');
}