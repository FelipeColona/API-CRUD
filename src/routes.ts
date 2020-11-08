// Importing Modules
    import { Router, Request, Response } from 'express'
    const routes = Router()

// Routes
    routes.get('/', (req: Request, res: Response) => {
        res.send('Hello World!')
    })

export default routes