import mysql from 'mysql2/promise';

const test = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'database-1.cgr6oosiavwy.us-east-1.rds.amazonaws.com',
      user: 'admin',
      password: 'Input#title1',
      database: 'flyquill',
      connectTimeout: 100000 // 10s timeout
    });
    
    // keep alive
    setInterval(() => connection.query('SELECT 1'), 30000);

    const [rows] = await connection.query('SELECT 1 + 1 AS result');
    console.log(rows);
    await connection.end();
  } catch (err) {
    console.error('DB Error:', err);
  }
};

test();
