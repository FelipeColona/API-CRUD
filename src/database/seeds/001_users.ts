import * as Knex from "knex";
import * as bcrypt from 'bcrypt' 

function genHash(){
    let hashedPassword = ''
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash('senha', salt, (err, hash) => {
            hashedPassword = hash
        })
    })
    return hashedPassword
}



export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del();

    // Inserts seed entries
    await knex('users').insert([
        { 
            name: 'Felipe Ferreira Colona',
            email: 'felipe@gmail.com',
            password: genHash(),
        },
        { 
            name: 'Daniel Shiffman',
            email: 'shiffman@gmail.com',
            password: genHash(),
        },
    ]);
};
