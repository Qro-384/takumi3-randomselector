import { defineEventHandler, createError } from 'h3';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export default defineEventHandler(async (event) => {
  const records = [];
  // process.cwd() はプロジェクトのルートディレクトリを指します
  const csvPath = path.join(process.cwd(), 'data', 'song_data.csv');

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv({ headers: ['title', 'level', 'difficulty'], skipHeaders: false }))
      .on('data', (data) => {
        // levelを数値に変換し、一意のIDを付与
        const song = {
          ...data,
          level: parseFloat(data.level),
          id: `${data.title}-${data.difficulty}`
        };
        records.push(song);
      })
      .on('end', () => {
        resolve(records);
      })
      .on('error', (error) => {
        console.error('CSV parsing error:', error);
        reject(createError({ statusCode: 500, statusMessage: 'Failed to load song data' }));
      });
  });
});