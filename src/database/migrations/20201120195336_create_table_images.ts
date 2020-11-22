import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('images', table => {
        table.increments('id')

        table.specificType('name', 'varchar(70)')
        table.text('data')

        // Relationship
        table.integer('post_id').references('posts.id').notNullable().onDelete('CASCADE')
    })

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('images')
}

