import * as process from 'process';

export function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} env variable is not set.`);
  }
  return value;
}

// Ensure required environment variables are present at startup
getEnv('USER_EMAIL');
getEnv('USER_PASSWORD');

