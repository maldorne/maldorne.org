// Copies the map files of each game (formats mapper/1 and worldmap/1) from its GitHub repo
// into source/_data/maps/<slug>/. Uses the gh CLI, so the repos may be private.
// Usage: npm run maps:sync
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'maps.config.json'), 'utf8'));
const FORMATS = ['mapper/1', 'worldmap/1'];

const gh = (args) =>
  execFileSync('gh', ['api', ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

const log = (msg) => process.stdout.write(msg + '\n');

let failed = false;

for (const [slug, game] of Object.entries(config)) {
  const dir = path.join(root, 'source', '_data', 'maps', slug);
  const added = [];
  const removed = [];
  const skipped = [];

  try {
    const listing = JSON.parse(gh([`repos/${game.repo}/contents/${game.path}?ref=${game.ref}`]));
    const files = listing.filter((f) => f.type === 'file' && f.name.endsWith('.json'));
    const wanted = new Set();

    fs.mkdirSync(dir, { recursive: true });

    for (const file of files) {
      // the raw media type returns the file itself, whatever its size
      const text = gh([
        '-H',
        'Accept: application/vnd.github.raw+json',
        `repos/${game.repo}/contents/${file.path}?ref=${game.ref}`,
      ]);
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        skipped.push(`${file.name} (invalid JSON: ${err.message})`);
        continue;
      }
      if (!FORMATS.includes(data.format)) {
        skipped.push(`${file.name} (format ${data.format}, expected ${FORMATS.join(' or ')})`);
        continue;
      }
      fs.writeFileSync(path.join(dir, file.name), text);
      wanted.add(file.name);
      added.push(
        `${file.name} (${data.locations ? `${data.locations.length} locations` : `level ${data.z}`})`,
      );
    }

    // drop local files that no longer exist upstream
    for (const name of fs.readdirSync(dir)) {
      if (name.endsWith('.json') && !wanted.has(name)) {
        fs.unlinkSync(path.join(dir, name));
        removed.push(name);
      }
    }
  } catch (err) {
    failed = true;
    const notFound = /404/.test(String(err.stderr || err.message));
    log(
      `${slug}: sync failed: ${notFound ? `${game.repo}/${game.path}@${game.ref} not found (not pushed yet, or no access)` : err.message.split('\n')[0]}`,
    );
    continue;
  }

  log(`${slug} (${game.repo}/${game.path}@${game.ref})`);
  added.forEach((a) => log(`  synced   ${a}`));
  removed.forEach((r) => log(`  removed  ${r}`));
  skipped.forEach((s) => log(`  skipped  ${s}`));
}

process.exit(failed ? 1 : 0);
