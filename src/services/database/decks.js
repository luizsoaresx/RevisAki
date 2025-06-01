import { getDbConnection } from './db';

export async function createDeck(userId, name) {
  const db = await getDbConnection();
  return await db.runAsync('INSERT INTO decks (user_id, name) VALUES (?, ?)', userId, name);
}

export async function getDecksByUser(userId) {
  const db = await getDbConnection();
  return await db.getAllAsync('SELECT * FROM decks WHERE user_id = ?', userId);
}

export async function updateDeck(id, name) {
  const db = await getDbConnection();
  return await db.runAsync('UPDATE decks SET name = ? WHERE id = ?', name, id);
}

export async function deleteDeck(id) {
  const db = await getDbConnection();
  return await db.runAsync('DELETE FROM decks WHERE id = ?', id);
}
