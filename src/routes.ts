// Importing Modules
    import { Router, Request, Response } from 'express'
    const routes = Router()

    import usersController from './controllers/usersController'

// Routes
    routes.get('/users', usersController.index)
    routes.get('/user', usersController.show)
    routes.post('/create-user', usersController.create)
    routes.put('/update-user', usersController.update)
    routes.delete('/delete-user', usersController.delete)

export default routes