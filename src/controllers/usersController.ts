import { Request, Response } from 'express'

import * as bcrypt from 'bcrypt'

import knex from '../database'

export default {
    async index(req: Request, res: Response) {
        try {
            const { page = 1 } = req.query

            const results = await knex.select('*').from('users').limit(5).offset((Number(page) - 1) * 5)

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
            res.status(500)
            res.json({
                error_msg: 'Internal server error',
            })
        }
    },
    async show(req: Request, res: Response) {
        try {
            const { id } = req.query

            const result = await knex.select('*').from('users').where(id)

            if (!result || !result.length) {
                res.status(400)
                res.json({
                    error_msg: 'Wrong parameter',
                })
            }

            res.json(result)

        } catch (error) {
            res.status(500)
            res.json({
                error_msg: 'Internal server error',
            })
        }

    },
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body

        try {
            let re = /\S+@\S+\.\S+/

            if (re.test(email)) {
                const hashedPassword = await bcrypt.hash(password, 10)
                const result = await knex('users').insert({ name: name, email: email, password: hashedPassword })

                if (result[0] > 0 || result !== []) {
                    res.sendStatus(201)
                }
            } else {
                res.status(400)
                res.json({
                    error_msg: 'The email property must be valid',
                })
            }

        } catch (error) {
            res.status(500)
            res.json({
                error_msg: 'Internal server error',
            })
        }
    },
    async update(req: Request, res: Response) {
        try {
            const { fieldToBeUpdated, data } = req.body
            const { id } = req.query

            const result = await knex('users').update(fieldToBeUpdated, data).where({ id })

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
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.query

            const result = await knex('users').where({ id }).delete()

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