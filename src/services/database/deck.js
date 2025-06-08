import { getDb } from '../database/db';

export const createDeck = async (name, userId) => {
    const db = getDb();

    const result = await db.runAsync(
        'INSERT INTO decks (name, userId) VALUES (?, ?)',
        [name, userId]
    );

    return result.lastInsertRowId;
};

export const getDecksByUserId = async (userId) => {
    const db = getDb();

    const decks = await db.getAllAsync(
        'SELECT * FROM decks WHERE userId = ?',
        [userId]
    );

    return decks;
};

export const updateDeck = async (id, name) => {
    const db = getDb();

    await db.runAsync(
        'UPDATE decks SET name = ? WHERE id = ?',
        [name, id]
    );
};

export const deleteDeck = async (id) => {
    const db = getDb()

    await db.runAsync(
        'DELETE FROM decks WHERE id = ?',
        [id]
    );
};

export const getDecById = async (id) => {
    const db = getDb();

    const deck = await db.getFirstAsync(
        'SELECT * FROM decks WHERE id = ?',
        [id]
    );

    return deck;
};

export const countDecksByUserId = async (userId) => {
    const db = getDb();

    try {
        const result = await db.getFirstAsync(
            'SELECT COUNT(id) as count FROM decks WHERE userId = ?',
            [userId]
        );

        return result ? result.count : 0;

    } catch (error) {
        console.error('Erro ao contar decks por usuário:', error);
        throw error;
    }
};