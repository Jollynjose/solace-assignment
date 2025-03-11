import { db } from '@/lib';
import { advocates } from '../../../db/schema';

export async function GET() {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);

  return Response.json({ data: [] });
}
