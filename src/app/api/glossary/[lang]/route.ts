import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

// Version compatible avec les exigences de Next.js pour les paramètres dynamiques
export async function GET(
  request: Request,
  context: { params: Promise<{ lang: string }> }
) {
  // Next.js dynamique : params peut nécessiter await
  const { lang } = await context.params;

  if (lang !== 'en' && lang !== 'fr') {
    return NextResponse.json({ error: 'Invalid language' }, { status: 400 });
  }

  try {
    // Construire le chemin vers le fichier JSON dans src/messages/
    // __dirname n'est pas disponible dans les modules ES ou les environnements serverless Next.js.
    // process.cwd() donne la racine du projet.
    const filePath = path.join(process.cwd(), 'src', 'messages', `glossary.${lang}.json`);
    
    // Lire le fichier
    const fileContents = await fs.readFile(filePath, 'utf8');
    
    // Parser le JSON
    const data = JSON.parse(fileContents);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error reading or parsing glossary file for lang ${lang}:`, error);
    // Si le fichier n'est pas trouvé ou s'il y a une erreur de parsing
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json({ error: `Glossary file for language "${lang}" not found` }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to load glossary data' }, { status: 500 });
  }
} 