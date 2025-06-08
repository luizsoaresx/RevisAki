import * as SQLite from 'expo-sqlite';

let db;
let isInitialized = false;

export async function initDB() {
  if (!isInitialized) {
    db = await SQLite.openDatabaseAsync('revisaki.db');

    await db.execAsync('PRAGMA foreign_keys = ON;');

    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
      `
    );

    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS decks (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
      );
      `
    );

    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS flashcards (
        id INTEGER PRIMARY KEY NOT NULL,
        deckId INTEGER NOT NULL,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        FOREIGN KEY (deckId) REFERENCES decks (id) ON DELETE CASCADE
      );
      `
    );

    isInitialized = true;
    console.log('Banco de dados inicializado!');
  }

  return db;
}

export const getDb = () => {
  if (!isInitialized) {
    throw new Error('Banco de dados não inicializado.')
  }
  return db;
}