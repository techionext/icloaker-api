import crypto from 'crypto';

export const handleCreateHash = (senha: string) => {
  const hash = crypto.createHash('sha256').update(senha).digest('hex');
  return hash;
};
