import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { User } from './models/User'

dotenv.config();

const app: Express = express();
app.use(express.json())

const port = process.env.PORT;
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS


type userType = {
    name: string,
    email: string,
    password: string
}


function checkToken(req:any, res:any, next:any){
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

//Open-route ou nossa rota publica
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/auth/register', async (req, res) => {
    const {name, email, password, confirmPassword} = req.body

    if(!name) return res.status(422).json({msg: 'O nome é obrigatório'})
    if(!email) return res.status(422).json({msg: 'O email é obrigatório'})
    if(!password) return res.status(422).json({msg: 'A senha é obrigatório'})
    if(!confirmPassword) return res.status(422).json({msg: 'A confirmaçāo de senha é obrigatório'})
    if(password != confirmPassword) return res.status(422).json({msg: 'Os campos senha e confirmar senha devem coicider'})

    const userExists = await User.findOne({email})

    if(userExists) return res.status(422).json({msg: 'E-mail já cadastrado'})

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

   const user = new User({
    name, 
    email,
    password: passwordHash
   }) 

   try {
    await user.save()
    res.status(201).json({
        msg: 'Usuário cadastrado com sucesso'
    })
   } catch (error) {
    res.status(500).json({
        msg: 'Algo de errado ocorreu ao tentar criar conta.',
        error
    })
   }
})

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body

    if(!email) return res.status(422).json({msg: 'O email é obrigatório'})
    if(!password) return res.status(422).json({msg: 'A senha é obrigatório'})

    const user:any = await User.findOne({email:email})
    const validPassword = await bcrypt.compare(password, user.password)

    if(!user || !validPassword){
        return res.status(404).json({
            msg: 'Usuário ou senha inválido(s)'
        })
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            `${secret}`
        )
        return res.status(422).json({
            msg: `Seja bem-vindo ao sistema ${user.name}`,
            token
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Algo de errado ocorreu ao tentar criar conta.',
            error
        })
    }

})

app.get('/teste/:id', checkToken, async (req, res) => {
    return res.status(422).json({msg: `entrou ${req.params.id}`})
})

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@challenges.icrsf.mongodb.net/?retryWrites=true&w=majority`
).then(
    () => app.listen(port, () => {
        console.log(`⚡️[server]: App connected to MongoDB`);
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    })
).catch(
    (err) => console.log(`${err}`)
)