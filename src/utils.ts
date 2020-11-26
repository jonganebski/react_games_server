export const getExpireDate = () => {
  // Returns 01-01T00:00:00.000Z of next year
  const today = new Date();
  const expireAt = new Date(`${today.getFullYear() + 1}`);
  const expireAtSec = expireAt.getTime() / 1000;
  return expireAtSec;
};
