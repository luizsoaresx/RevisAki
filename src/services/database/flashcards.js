import { getDbConnection } from './db';

export async function createFlashcard(userId, directoryId, tema, subtema, dataPostagem, pergunta, resposta) {
  const db = await getDbConnection();
  return await db.runAsync(
    `INSERT INTO flashcards (user_id, directory_id, tema, subtema, data_postagem, pergunta, resposta)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    userId, directoryId, tema, subtema, dataPostagem, pergunta, resposta
  );
}

export async function getFlashcardsByDirectory(directoryId) {
  const db = await getDbConnection();
  return await db.getAllAsync('SELECT * FROM flashcards WHERE directory_id = ?', directoryId);
}

export async function updateFlashcard(id, tema, subtema, pergunta, resposta) {
  const db = await getDbConnection();
  return await db.runAsync(
    `UPDATE flashcards SET tema = ?, subtema = ?, pergunta = ?, resposta = ? WHERE id = ?`,
    tema, subtema, pergunta, resposta, id
  );
}

export async function deleteFlashcard(id) {
  const db = await getDbConnection();
  return await db.runAsync('DELETE FROM flashcards WHERE id = ?', id);
}
