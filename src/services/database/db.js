import * as SQLite from 'expo-sqlite';

let db = null;

export async function getDbConnection() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('flashcardsApp.db');
  }
  return db;
}

export default db;

export async function ensureDatabaseReady() {
  const db = await getDbConnection();

  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS decks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS directories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      deck_id INTEGER,
      name TEXT,
      FOREIGN KEY(deck_id) REFERENCES decks(id)
    );

    CREATE TABLE IF NOT EXISTS flashcards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      directory_id INTEGER,
      tema TEXT,
      subtema TEXT,
      data_postagem TEXT,
      pergunta TEXT,
      resposta TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(directory_id) REFERENCES directories(id)
    );
  `);
}
