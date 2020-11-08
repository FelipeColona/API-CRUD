import * as Knex from 'knex'

import knexfile from '../../knexfile'
const knex: Knex = require('knex')(knexfile.development)

export default knex