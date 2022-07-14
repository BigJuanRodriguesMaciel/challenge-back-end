import Router from 'express';
import User from '../controller/UserController'

const authRoutes = Router()

authRoutes.post('/auth/register', User.registerUser)
authRoutes.post('/auth/login', User.logInUser)

export default authRoutes