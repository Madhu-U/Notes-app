import { format } from "date-fns";

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";
  let initials = "";
  const words = name.split(" ");
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const formatTimestamp = (date) => {
  return format(new Date(date), "do MMMM yyyy, h:mm a");
};
