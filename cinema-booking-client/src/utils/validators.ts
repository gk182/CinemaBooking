export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const regex = /^[0-9]{10,11}$/;
  return regex.test(phone);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};