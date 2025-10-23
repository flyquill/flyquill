// app/api/url-shortner/route.js
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';
import { NextResponse } from 'next/server';
import db from '../../../lib/db'; // adjust if needed

export async function POST(request) {
  try {
    const body = await request.json();
    const { url, customAlias, expiresAt } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const shortCode = customAlias || nanoid(7);

    const [existing] = await db.query('SELECT id FROM links WHERE short_code = ?', [shortCode]);
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Alias already taken' }, { status: 400 });
    }

    const qrCode = await QRCode.toDataURL(`${process.env.BASE_URL}/${shortCode}`);

    await db.query(
      'INSERT INTO links (original_url, short_code, custom_alias, expires_at, qr_code) VALUES (?, ?, ?, ?, ?)',
      [url, shortCode, customAlias || null, expiresAt || null, qrCode]
    );

    return NextResponse.json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      qrCode
    }, { status: 201 });
  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
