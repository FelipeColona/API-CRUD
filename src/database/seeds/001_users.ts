import * as Knex from "knex";
import * as bcrypt from 'bcrypt' 

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del();

    // Inserts seed entries
    await knex('users').insert([
        { 
            name: 'Felipe Ferreira Colona',
            email: 'felipe@gmail.com',
            password: await bcrypt.hash('password', 10),
        },
        { 
            name: 'Daniel Shiffman',
            email: 'shiffman@gmail.com',
            password: await bcrypt.hash('password', 10),
        },
        { 
            name: 'Bill Cipher',
            email: 'bill.cipher@gmail.com',
            password: await bcrypt.hash('password', 10),
        },
        { 
            name: 'Hollow Knight',
            email: 'hollow.knight@gmail.com',
            password: await bcrypt.hash('password', 10),
        },
        { 
            name: 'Cuphead Mugman',
            email: 'cuphead.mugman@gmail.com',
            password: await bcrypt.hash('password', 10),
        },
        { 
            name: 'Pale King',
            email: 'pale.king@gmail.com',
            password: await bcrypt.hash('password', 10),
        },
        { 
            name: 'Dipper Pines',
            email: 'pipper.pines@gmail.com',
            password: await bcrypt.hash('password', 10),
        },
        { 
            name: 'Mabel Pines',
            email: 'mabel.pines@gmail.com',
            password: await bcrypt.hash('password', 10),
        },
        { 
            name: 'Stanford Pines',
            email: 'stanford.pines@gmail.com',
            password: await bcrypt.hash('password', 10),
        },
        { 
            name: 'Stanley Pines',
            email: 'stanley.pines@gmail.com',
            password: await bcrypt.hash('password', 10),
        }
    ]);
};
