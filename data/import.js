require('dotenv').config({ path: './.env.dev' });
const debug = require('debug')('import:log');
import { Client } from 'pg';

import { forEach } from './categories.json';
import { forEach as _forEach } from './posts.json';

async function emptyTables(client){
    await client.query('TRUNCATE TABLE category, post RESTART IDENTITY');
}

async function insertCategories(client){

    const categoryQuerries = [];

    forEach((category) => {
        debug('Processing category: ', category.label);
        const query = client.query(
            `
                INSERT INTO "category"
                ("label", "route")
                VALUES
                ($1, $2)
                RETURNING *
            `,
            [category.label, category.route],
        );

        categoryQuerries.push(query);
    });

    const results = await Promise.all(categoryQuerries);

    const categoryRows = results.map((result) => result.rows[0]);

    return categoryRows;
}

async function insertPosts(client, categoryRows){

    const postQueries = [];
    _forEach((post) => {
        debug('Processing post:', post.slug);

        const postCategory = categoryRows.find((category) => category.label === post.category);

        const insertPostQuery = {
            text: `
                INSERT INTO "post"
                ("slug", "title", "excerpt", "content", "category_id")
                VALUES
                ($1, $2, $3, $4, $5)
            `,
            values: [
                post.slug,
                post.title,
                post.excerpt,
                post.content,
                postCategory.id,
            ],
        };

        const query = client.query(insertPostQuery);

        postQueries.push(query);
    });

    await Promise.all(postQueries);
}

async function importData(){
    const client = new Client();
    await client.connect();
    debug('Client connected');

    await emptyTables(client);

    const categoryRows = await insertCategories(client);

    await insertPosts(client, categoryRows);
    debug('Done');

    client.end();
}

importData();

module.exports = importData, insertPosts, insertCategories, emptyTables