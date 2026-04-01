# SvelteKit Multi-Deploy Template

SvelteKit 5 template configured to deploy to **Vercel** or **Cloudflare Pages** using environment variables. Built at ShipFast Syndicate.

Avoid vendor lock-in by supporting multiple deployment platforms with a single codebase.

## Stack

- SvelteKit 5
- Tailwind CSS
- Drizzle ORM
- Turso (libSQL)

## Platform Support

| Platform | Adapter | Status |
|----------|---------|--------|
| Vercel | `@sveltejs/adapter-vercel` | ✅ Default |
| Cloudflare Pages | `@sveltejs/adapter-cloudflare` | ✅ Working |

## Quick Start

```bash
# Clone the template
npx degit ShipFast-Syndicate/template-sveltekit my-project

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Environment Variables

Create a `.env` file:

```bash
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=...
```

### Required Vars

| Variable | Description |
|----------|-------------|
| `TURSO_DATABASE_URL` | Turso libSQL database URL |
| `TURSO_AUTH_TOKEN` | Turso auth token |

## Building

### For Vercel (default)

```bash
npm run build
vercel deploy --prod
```

### For Cloudflare Pages

```bash
npm run build
npx wrangler pages deploy .svelte-kit/cloudflare --project-name=your-project
```

### Using Git-based Deployment

1. **Vercel**: Connect repo in Vercel dashboard
2. **Cloudflare Pages**: Connect repo in Cloudflare Dashboard

Git-based deployment automatically injects environment variables from project settings.

## Deployment via Vercel

### Option 1: Vercel Dashboard

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repo
3. Add environment variables in Project Settings
4. Deploy

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel link
vercel deploy --prod
```

Add environment variable:

```bash
vercel env add TURSO_DATABASE_URL production
# Enter your Turso database URL
```

## Deployment via Cloudflare Pages

### Option 1: Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Workers & Pages → Create application → Pages → Connect to Git
3. Add environment variables in Settings
4. Deploy

### Option 2: Wrangler CLI

```bash
npm i -g wrangler
wrangler pages project create my-project
wrangler pages deploy .svelte-kit/cloudflare --project-name=my-project
```

⚠️ **Note**: Direct uploads via `wrangler pages deploy` do NOT inject dashboard environment variables. Use Git-based deployment for env var injection.

## Environment Variable Access

```javascript
// Vercel: process.env.VAR_NAME
const dbUrl = process.env.TURSO_DATABASE_URL;

// Cloudflare: context.env.VAR_NAME
// In +page.server.ts / +server.ts:
export const load = ({ locals }) => {
  const dbUrl = locals.env.TURSO_DATABASE_URL;
};
```

## Database Setup with Drizzle

```typescript
// src/lib/db.ts
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
```

Run migrations:

```bash
npm run db:push
```

## Project Structure

```
/
├── src/
│   ├── routes/
│   │   ├── +page.svelte      # Homepage
│   │   └── +layout.svelte   # Layout
│   ├── lib/
│   │   └── db.ts            # Database client
│   ├── app.html
│   └── app.css
├── static/
├── drizzle/
│   └── schema.ts           # DB schema
├── svelte.config.js
├── tailwind.config.js
├── wrangler.toml
├── .env.example
└── package.json
```

## Troubleshooting

### Redeploy after env var changes

```bash
# Vercel
vercel deploy --prod --force

# Cloudflare
# Push a new commit to trigger rebuild
```

### Check deployment logs

```bash
# Vercel
vercel logs <project-name>

# Cloudflare
wrangler pages project list
wrangler deployments list --project-name=<project>
```

### Verify environment variables

- **Vercel**: Project → Settings → Environment Variables
- **Cloudflare**: Workers & Pages → <project> → Settings → Environment Variables

### Common Issues

1. **500 errors on deploy**: Check env vars are set in dashboard
2. **Module load errors**: Don't access env vars at top-level scope
3. **Adapter mismatch**: Ensure correct adapter in `svelte.config.js`

## Related Projects

- [ShipFast-Syndicate/astro-multi-deploy-template](https://github.com/ShipFast-Syndicate/astro-multi-deploy-template) - Astro version
- [ShipFast-Syndicate/dispatch](https://github.com/ShipFast-Syndicate/dispatch) - Newsletter platform
- [ShipFast-Syndicate/opensalary](https://github.com/ShipFast-Syndicate/opensalary) - Salary comparison

## License

MIT