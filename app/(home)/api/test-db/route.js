// app/api/test/route.js
import db from '../../../lib/db';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    return Response.json(rows);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  return Response.json({ message: 'POST method supported' });
}
