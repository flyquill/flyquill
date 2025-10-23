import { auth } from "@clerk/nextjs/server";
import db from "../../../lib/db"; // Use relative path (not @/lib/db)

export async function GET() {
  const { userId } = auth(); // Clerk Auth

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const [rows] = await db.query(
    "SELECT short_code, original_url, click_count FROM links WHERE user_id = ? ORDER BY created_at DESC LIMIT 5",
    [userId]
  );

  const links = rows.map((row) => ({
    shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${row.short_code}`,
    clickCount: row.click_count,
  }));

  return new Response(JSON.stringify({ links}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
