import { getDb } from './db'

export const createFlashcard = async (deckId, question, answer) => {
    const db = getDb();

    const result = await db.runAsync(
        'INSERT INTO flashcards (deckId, question, answer) VALUES (?, ?, ?)',
        [deckId, question, answer]
    );

    return result.lastInsertRowId;
};

export const getFlashcardsByDeckId = async (deckId) => {
    const db = getDb();

    const flashcards = await db.getAllAsync(
        'SELECT * FROM flashcards WHERE deckId = ?',
        [deckId]
    );

    return flashcards;
};

export const updateFlashcard = async (id, question, answer) => {
    const db = getDb();

    await db.runAsync(
        'UPDATE flashcards SET question = ?, answer = ?  WHERE id = ?',
        [question, answer, id]
    );
};

export const deleteFlashcard = async (id) => {
    const db = getDb();

    await db.runAsync(
        'DELETE FROM flashcards WHERE id = ?',
        [id]
    );
};

export const getFlashcardById = async (id) => {
    const db = getDb();

    const flashcard = await db.getFirstAsync(
        'SELECT * FROM flashcards WHERE id = ?',
        [id]
    );

    return flashcard;
};

export const countFlashcardsByUserId = async (userId) => {
    const db = getDb();
    try {
        const result = await db.getFirstAsync(
            `SELECT COUNT(f.id) as count
             FROM flashcards f
             JOIN decks d ON f.deckId = d.id
             WHERE d.userId = ?`,
            [userId]
        );
        return result ? result.count : 0;
        
    } catch (error) {
        console.error('Erro ao contar flashcards por usuário:', error);
        throw error;
    }
};