import express from 'express';
import mongoDBConnect from './database/db'
import authRoutes from './routes/auth'
import projectssRoutes from './routes/projects';

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(authRoutes)
app.use(projectssRoutes)

mongoDBConnect()

app.listen(port, () => {
    console.log(`⚡️[server]: Servidor iniciado`)
})