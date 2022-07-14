import jwt from 'jsonwebtoken';

export function getIdUser(token: string){
    return jwt.decode(token)
}