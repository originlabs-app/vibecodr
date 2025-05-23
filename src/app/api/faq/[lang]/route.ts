import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(
  request: Request,
  context: { params: Promise<{ lang: string }> }
) {
  // Extraire lang des paramètres de manière sûre
  const { lang } = await context.params;

  if (lang !== 'en' && lang !== 'fr') {
    return NextResponse.json({ error: 'Invalid language' }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), 'src', 'messages', `faq.${lang}.json`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error reading or parsing FAQ file for lang ${lang}:`, error);
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json({ error: `FAQ file for language "${lang}" not found` }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 