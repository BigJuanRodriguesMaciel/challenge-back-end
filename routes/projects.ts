import Router from 'express'
import Project from '../controller/ProjectController'
import { checkToken } from '../middlewares/auth'

const projectsRoutes = Router()

projectsRoutes.post('/projects', checkToken, Project.createProject)
projectsRoutes.get('/projects', Project.getAllProjects)
projectsRoutes.get('/projects/:id', Project.getProject)
projectsRoutes.put('/projects/:id', Project.updateProject)

export default projectsRoutes