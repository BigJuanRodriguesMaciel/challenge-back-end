import { User } from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const registerUser = async (req:any, res:any) => {
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
}

const logInUser =  async (req:any, res:any) => {
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
        return res.status(200).json({
            msg: `Seja bem-vindo ao sistema ${user.name}`,
            token
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Algo de errado ocorreu ao tentar criar conta.',
            error
        })
    }
}

export default {
    registerUser,
    logInUser
}