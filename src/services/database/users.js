
// src/services/database/users.js
import { getDbConnection } from './db';

export async function createUser(name, email, password) {
  const db = await getDbConnection();
  return await db.runAsync(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    name, email, password
  );
}

export async function getUserByEmail(email) {
  const db = await getDbConnection();
  return await db.getFirstAsync('SELECT * FROM users WHERE email = ?', email);
}

export async function updateUser(id, name, email, password) {
  const db = await getDbConnection();
  return await db.runAsync(
    'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
    name, email, password, id
  );
}

export async function deleteUser(id) {
  const db = await getDbConnection();
  return await db.runAsync('DELETE FROM users WHERE id = ?', id);
}
