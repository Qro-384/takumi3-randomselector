import { defineEventHandler, createError } from 'h3';
import { useStorage } from '#imports';
import csv from 'csv-parser';
import { Readable } from 'stream';

export default defineEventHandler(async (event) => {
  // 'assets:server' は server/assets ディレクトリを指します
  const storage = useStorage('assets:server');
  const assetKey = 'data/song_data.csv'; // server/assets/からの相対パス

  try {
    const csvContent = await storage.getItem(assetKey);

    if (!csvContent) {
      console.error(`Asset not found: ${assetKey}`);
      throw createError({ statusCode: 404, statusMessage: 'Song data file not found.' });
    }

    const records = [];
    return new Promise((resolve, reject) => {
      Readable.from(csvContent)
        .pipe(csv({ headers: ['title', 'level', 'difficulty','is_paying'], skipHeaders: false }))
        .on('data', (data) => {
          const song = {
            ...data,
            level: parseFloat(data.level),
            id: `${data.title}-${data.difficulty}`,
            is_paying: data.is_paying === '1' // '1'ならtrue, '0'ならfalse
          };
          records.push(song);
        })
        .on('end', () => resolve(records))
        .on('error', (error) => reject(createError({ statusCode: 500, statusMessage: 'Failed to parse song data' })));
    });
  } catch (error) {
    console.error('Failed to load song data from storage:', error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to load song data' });
  }
});