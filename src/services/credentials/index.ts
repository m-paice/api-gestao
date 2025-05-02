import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRETKEY } from '../../constants';

export const encryptPassword = async (password: string) => {
    const saltRounds = 10;

    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.error('Erro ao encriptar a senha:', error);
        throw new Error('Falha ao encriptar a senha');
    }
};

export const validatePassword = async (password: string, hash: string) => {
    try {
        const isValid = await bcrypt.compare(password, hash);
        return isValid;
    } catch (error) {
        console.error('Erro ao validar a senha:', error);
        throw new Error('Falha ao validar a senha');
    }
};

export const createToken = (userId: string, accountId: string) => {
    const token = jwt.sign({ userId, accountId }, JWT_SECRETKEY);
    return token;
};

export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRETKEY);
        return decoded;
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        throw new Error('Token inválido');
    }
};

export const decodeToken = (token: string) => {
    try {
        const decoded = jwt.decode(token);
        return decoded;
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        throw new Error('Token inválido');
    }
};
