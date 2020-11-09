import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
        table.increments('id')
        table.specificType('name', 'varchar(40)')
        table.specificType('email', 'varchar(320)')
        table.specificType('password', 'char(60)')
        
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users')
}

