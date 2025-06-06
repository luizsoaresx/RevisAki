import { getDb } from "./db";

export const createUser = async (name, email, password) => {
    const db = getDb();

    try{
        const result = await db.runAsync(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );

        return result.lastInsertRowId;

    } catch (error){

        if (error.message.includes('UNIQUE constraint failed: users.email')) {
            throw new Error('E-mail já cadastrado.');
        }

        console.error('Erro ao criar usuário:', error);
        throw error;
    }
};

export const getUserByEmail = async (email) => {
    const db = getDb();

    const user = await db.getFirstAsync('SELECT * FROM users WHERE email = ?', [email]);

    return user;
};

export const updateUser = async (useImperativeHandle, { name, email, password }) => {
    const db = getDb();
    let updates = [];
    let params = [];

    if (name !== undefined){
        updates.push('name = ?');
        params.push(name);
    }

    if (email !== undefined){
        updates.push('email = ?');
        params.push(email);
    }

    if (password !== undefined){
        updates.push('password = ?');
        params.push(password);
    }

    if (updates.length === 0){
        return false;
    }

    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    params.push(userId);

    try{
        const result = await db.runAsync(query, params);

        if (result.changes > 0){
            console.log(`Usuário ID ${userId} atualizado.`);
            return true;
        }
        else{
            return false;
        }
    } catch (error){

        if (error.message.includes('UNIQUE constraint failed: users.email')){
            throw new Error('O novo e-mail já está cadastrado.')
        }

        console.error(`Erro ao atualizar usuário ID ${userId}:`, error);
    }
};

export const deleteUser = async (userId) => {
    const db = getDb();

    try{
        const result = await db.runAsync(
            'DELETE FROM users WHERE id = ?', [userId]
        );

        if (result.changes > 0){
            return true;
        }
        else{
            return false;
        }
    } catch (error){
        console.error(`Erro ao excluir usuário ID ${userId}:`, error);
        throw error;
    }
};

export const authenticateUser = async (email, password) => {
    const db = getDb();

    try{
        const user = await getUserByEmail(email);

        if (user && user.password === password) {
            const { password: userPassword, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }

        else{
            return null;
        }
    } catch (error){
        console.error('Erro durante a autenticação:', error);
        throw error;
    }
};