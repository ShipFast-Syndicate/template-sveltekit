import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
	if (!_db) {
		const url = process.env.TURSO_DATABASE_URL;
		const authToken = process.env.TURSO_AUTH_TOKEN;
		const client = createClient({ url, authToken });
		_db = drizzle(client);
	}
	return _db;
}