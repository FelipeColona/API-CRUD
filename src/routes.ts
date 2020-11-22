// Importing Modules
    import { Router, Request, Response } from 'express'
    const routes = Router()

    import usersController from './controllers/usersController'
    import postsController from './controllers/postsController'

// Routes
    // Users
        routes.get('/users', usersController.index)
        routes.get('/user', usersController.show)
        routes.post('/create-user', usersController.create)
        routes.put('/update-user', usersController.update)
        routes.delete('/delete-user', usersController.delete)
    
    // Posts
        routes.get('/posts', postsController.index)
        routes.get('/post', postsController.show)
        routes.post('/create-post', postsController.create)
        routes.put('/update-post', postsController.update)
        routes.delete('/delete-post', postsController.delete)

export default routes