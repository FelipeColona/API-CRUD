import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('posts', table => {
        table.increments('id')

        table.specificType('title', 'varchar(50)')
        table.text('content')

        // Relationship
        table.integer('owner').references('users.id').notNullable().onDelete('CASCADE')

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('posts')
}

