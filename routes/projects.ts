import Router from 'express'
import Project from '../controller/ProjectController'
import { checkToken } from '../middlewares/auth'

const projectsRoutes = Router()

projectsRoutes.post('/projects', checkToken, Project.createProject)
projectsRoutes.get('/projects/:ownerid', checkToken, Project.getAllProjects)
projectsRoutes.get('/projects/:id', checkToken, Project.getProject)
projectsRoutes.put('/projects/:id', checkToken, Project.updateProject)

export default projectsRoutes