export const NODE_ENV = process.env.NODE_ENV || 'dev';
export const JWT_SECRETKEY = process.env.JWT_SECRETKEY || 'jwt_secretkey';
export const TEMPORARY_DIRECTORY = process.env.TEMPORARY_DIRECTORY || 'tmp';

export * from './express';
export * from './mongo';
export * from './aws';
