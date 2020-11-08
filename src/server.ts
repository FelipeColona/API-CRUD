// Importing Modules
    import * as express from 'express'
    const app = express()

    import routes from './routes'

// Listening the Port
    const PORT = process.env.PORT || 3333
    app.listen(PORT, () => console.log(`Server running at port ${PORT}`))

// Middlewares
    app.use(express.json())

    // Using Routes
        app.use(routes)