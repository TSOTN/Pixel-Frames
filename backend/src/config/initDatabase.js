const db = require('./database');

const createTables = async () => {
    try {
        console.log('🔧 Creating database tables...');

        await db.query(`
      CREATE TABLE IF NOT EXISTS games (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

        await db.query(`
      CREATE TABLE IF NOT EXISTS movies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

        await db.query(`
      CREATE TABLE IF NOT EXISTS recommendations (
        id SERIAL PRIMARY KEY,
        game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
        movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(game_id, movie_id)
      );
    `);

        console.log('✅ Tables created successfully');

        // Insert initial data
        await insertInitialData();

        process.exit(0);
    } catch (err) {
        console.error('❌ Error creating tables:', err);
        process.exit(1);
    }
};

const insertInitialData = async () => {
    console.log('📝 Inserting initial data...');

    const data = [
        {
            game: 'GTA VI',
            gameImg: 'https://img.youtube.com/vi/QdBZY2fkU-0/maxresdefault.jpg',
            gameDesc: 'Acción en mundo abierto, crimen organizado y persecuciones intensas en Vice City.',
            movie: 'Heat',
            movieImg: 'https://img.youtube.com/vi/2Gfetl9o2V8/maxresdefault.jpg',
            movieDesc: 'Clásico del cine criminal (1995) con Al Pacino y Robert De Niro.'
        },
        {
            game: 'Cyberpunk 2077',
            gameImg: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
            gameDesc: 'RPG de mundo abierto en Night City, una megaurbe obsesionada con el poder.',
            movie: 'Blade Runner 2049',
            movieImg: 'https://img.youtube.com/vi/gCcx85zbxz4/maxresdefault.jpg',
            movieDesc: 'Secuela del clásico sci-fi. Explora un futuro distópico.'
        }
    ];

    for (const item of data) {
        const gameResult = await db.query(
            'INSERT INTO games (name, description, image_url) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING id',
            [item.game, item.gameDesc, item.gameImg]
        );

        const movieResult = await db.query(
            'INSERT INTO movies (name, description, image_url) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING id',
            [item.movie, item.movieDesc, item.movieImg]
        );

        if (gameResult.rows[0] && movieResult.rows[0]) {
            await db.query(
                'INSERT INTO recommendations (game_id, movie_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                [gameResult.rows[0].id, movieResult.rows[0].id]
            );
        }
    }

    console.log('✅ Initial data inserted');
};

createTables();
