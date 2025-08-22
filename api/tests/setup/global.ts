import { execSync } from 'node:child_process';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '../../.env.test') });
execSync('npx prisma db push');
