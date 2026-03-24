import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyTemplates() {
  try {
    const src = path.resolve(__dirname, '../src/templates');
    const dest = path.resolve(__dirname, '../dist/src/templates');

    await fs.copy(src, dest);
    console.log('✅ Templates successfully copied to dist/');
  } catch (err) {
    console.error('❌ Error copying templates:', err);
    process.exit(1);
  }
}

copyTemplates();
