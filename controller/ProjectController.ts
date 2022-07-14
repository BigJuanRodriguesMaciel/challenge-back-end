import Project from '../models/Project'

// const teste = async (req, res) => {
    // app.get('/teste/:id', checkToken, async (req, res) => {
//     return res.status(422).json({msg: `entrou ${req.params.id}`})
// })

const createProject = async (req: any, res: any) => {
    const { title, tasks, ownerId } = req.body
    if(!title) return res.status(201).json({
        msg: `O titulo é obrigatório`,
    })
    try {
        await Project.create({title, tasks})
        return res.status(201).json({
            msg: `Projeto cadastrado com sucesso`,
        })
    } catch (error) {
        res.status(500).json({
            msg: `Algo de errado ocorreu ao tentar cadastrar projeto ${error}`,
            error
        })
    }
}

const getProject = async (req: any, res: any) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id
        })
        return res.status(201).json({
            msg: `Projeto localizado com sucesso`,
            project
        })
    } catch (error) {
        res.status(422).json({
            msg: `Algo de errado ocorreu ao tentar localizar projeto ${error}`,
            error
        })
    }
}

const updateProject = async (req: any, res: any) => {
    const project = req.body
    try {
        await Project.updateOne({ _id: req.params.id}, project)
        res.status(200).json({
            msg: `Projeto atualizada com sucesso`,
        })
    } catch (error) {
        res.status(500).json({
            msg: `Algo de errado ocorreu ao tentar atualizar projeto ${error}`,
            error
        })
    }
}

const getAllProjects = async (res: any) => {
    try {
        const projects = await Project.find()
        res.status(200).json({
            msg: `Projetos carregados com sucesso`,
            projects 
        })
    } catch (error) {
        res.status(422).json({
            msg: `Algo de errado ocorreu ao tentar carregar Projetos ${error}`,
            error
        })
    }
}

export default {
    createProject,
    getProject,
    updateProject,
    getAllProjects
}