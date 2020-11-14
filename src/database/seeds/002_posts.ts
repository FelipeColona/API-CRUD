import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('posts').del();

    // Inserts seed entries
    await knex('posts').insert([
    {
        title: 'Why Hollow Knight is the best game ever?', 
        content: "Can't put in words",
        owner: '4'
    },
    {
        title: 'Why Gravity Falls is the best cartoon ever?', 
        content: "Can't put in words",
        owner: '3'
    },
    {
        title: 'Why Cuphead is one of the most fun games ever?', 
        content: "Can't put in words",
        owner: '5'
    }
    ]);
};
