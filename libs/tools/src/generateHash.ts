import { createHash } from 'crypto';

export function generateHash() {
  const current_date = new Date().valueOf().toString();
  const random = Math.random().toString();
  return createHash('sha256')
    .update(current_date + random)
    .digest('hex');
}
