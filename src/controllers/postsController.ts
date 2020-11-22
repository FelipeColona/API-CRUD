import { Request, Response } from 'express'

import knex from '../database'

export default {
    async index(req: Request, res: Response){
        try {
            const { page = 1 } = req.query


            const results = await knex.select('posts.*', 'users.name').from('posts').join('users', 'users.id', '=', 'posts.owner').limit(5).offset((Number(page) - 1) * 5)

            const [ count ] = await knex('users').count({count: '*'})
            res.header('X-Total-Count', `${count.count}`)

            if (!results || !results.length) {
                res.status(400)
                res.json({
                    error_msg: 'Wrong parameter',
                })
            }

            res.json(results)

        } catch (error) {
            console.log(error)

            res.status(500)
            res.json({
                error_msg: 'Internal server error',
            })
        }
    },
    async show(req: Request, res: Response){
        try {
            const { idPost, idUser } = req.query

            let results = []

            if(idPost && !idUser){
                results = await knex.select('posts.*', 'users.name', 'images.name').from('posts').join('users', 'users.id', '=', 'posts.owner').join('images', 'images.post_id', '=', 'posts.id').where({'posts.id': idPost})
            } else if(!idPost && idUser){
                results = await knex.select('posts.*', 'users.name').from('posts').join('users', 'users.id', '=', 'posts.owner').where({'users.id': idUser})
            }

            if (!results || !results.length) {
                res.status(400)
                res.json({
                    error_msg: 'Wrong parameter',
                })
            }
    
            res.json(results)

        } catch (error) {
            console.log(error)

            res.status(500)
            res.json({
                error_msg: 'Internal server error',
            })
        }
    },
    async create(req: Request, res: Response){
        const { title, content, owner } = req.body

        const RequestedImages = req.files
        const images = Object.entries(RequestedImages).map( img => img[1])

        try {
            if(title && content && owner){
                const result = await knex('posts').insert({title: title, content: content,owner: owner})
                
                images.forEach( async (img) => {
                    await knex('images').insert({name: `${Date.now()}-${img.name}`, data: img.data, post_id: result[0]})
                })

                if (result[0] > 0 || result !== []) {
                    res.sendStatus(201)
                }

            }

        } catch (error) {
            console.log(error)

            res.status(500)
            res.json({
                error_msg: 'Internal server error',
            })
        }
    },
    async update(req: Request, res: Response){
        try {
            const { fieldToBeUpdated, data } = req.body
            const { id } = req.query

            const result = await knex('posts').update(fieldToBeUpdated, data).where({ id })

            //@ts-ignore
            if (result == 1) {
                res.statusMessage = 'Resource Updated Successfully'
                res.send()
            } else {
                res.status(400)
                res.json({
                    error_msg: 'Wrong parameter',
                })
            }
        } catch (error) {
            console.log(error)

            res.status(500)
            res.json({
                error_msg: 'Internal server error',
            })
        }
    },
    async delete(req: Request, res: Response){
        try {
            const { id } = req.query

            const result = await knex('posts').where({ id }).delete()

            if (result == 1) {
                res.statusMessage = 'Resource Deleted Successfully'
                res.send()
            } else {
                res.status(400)
                res.json({
                    error_msg: 'Wrong parameter',
                })
            }
        } catch (error) {
            console.log(error)

            res.status(500)
            res.json({
                error_msg: 'Internal server error',
            })
        }
    }
}