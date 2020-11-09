import * as Knex from "knex";
import * as bcrypt from 'bcrypt' 

let hashedPassword1 = ''
let hashedPassword2 = ''

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash('senha', salt, (err, hash) => {
        hashedPassword1 = hash
    })
})

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash('senha', salt, (err, hash) => {
        hashedPassword2 = hash
    })
})

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del();

    // Inserts seed entries
    await knex('users').insert([
        { 
            name: 'Felipe Ferreira Colona',
            email: 'felipe@gmail.com',
            password: hashedPassword1,
        },
        { 
            name: 'Daniel Shiffman',
            email: 'shiffman@gmail.com',
            password: hashedPassword2,
        },
    ]);
};
