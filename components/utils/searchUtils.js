export const searchDictionary = {
  'Я': 'R',
  '!': 'I',
  'Σ': 'E',
  '(?,': 'G',
  '≠': 'overlimit',
  'α': 'a',
  'η': 'eta',
  '³': '3',
  'Λ': 'A',
  'Θ': 'O',
  '飈': 'つむじかぜ'
};

export function normalizeForSearch(str) {
  if (typeof str !== 'string') return '';
  let result = str.toLowerCase().replace(/\s/g, '');
  for (const [char, replacement] of Object.entries(searchDictionary)) {
    result = result.replaceAll(char, replacement.toLowerCase());
  }
  return result;
}