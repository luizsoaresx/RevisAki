import { getDbConnection } from './db';

export async function createDirectory(deckId, name) {
  const db = await getDbConnection();
  return await db.runAsync('INSERT INTO directories (deck_id, name) VALUES (?, ?)', deckId, name);
}

export async function getDirectoriesByDeck(deckId) {
  const db = await getDbConnection();
  return await db.getAllAsync('SELECT * FROM directories WHERE deck_id = ?', deckId);
}

export async function updateDirectory(id, name) {
  const db = await getDbConnection();
  return await db.runAsync('UPDATE directories SET name = ? WHERE id = ?', name, id);
}

export async function deleteDirectory(id) {
  const db = await getDbConnection();
  return await db.runAsync('DELETE FROM directories WHERE id = ?', id);
}
