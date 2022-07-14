import jwt from 'jsonwebtoken'

export function checkToken(req:any, res:any, next:any){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({msg: 'Acesso negado. O usuário nāo está autenticado'})
    }

    try {
        const secret = process.env.SECRET

        jwt.verify(token, `${secret}`)
        next()
    } catch (error) {
        res.status(400).json({msg: 'Token inválido'})
    }
}