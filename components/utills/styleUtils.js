export function getDifficultyClass(song) {
  if (!song || !song.difficulty) {
    return '';
  }
  const difficulty = song.difficulty.toLowerCase();
  switch (difficulty) {
    case 'hard': return 'difficulty-hard';
    case 'master': return 'difficulty-master';
    case 'insanity': return 'difficulty-insanity';
    case 'ravage': return 'difficulty-ravage';
    default: return '';
  }
}