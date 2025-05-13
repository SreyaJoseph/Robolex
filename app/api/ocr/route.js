import { NextResponse } from 'next/server';
import { createWorker } from 'tesseract.js';

export async function POST(request) {
  const form = await request.formData();
  const file = form.get('image');
  const buffer = await file.arrayBuffer();

  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data } = await worker.recognize(new Uint8Array(buffer));
  await worker.terminate();

  const words = data.text
    .replace(/[^\w\s]/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return NextResponse.json({ words });
}
