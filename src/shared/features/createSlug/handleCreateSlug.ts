import { handleGenerateUuid } from '../handleGenerateUuid/handleGenerateUuid';

/**
 *
 * @returns returns a slug with 10 characters
 */

export function handleCreateSlug() {
  return handleGenerateUuid().replace('-', '').slice(0, 10);
}
