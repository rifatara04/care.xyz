export const passRegex = {
  value: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
  message:
    "Invalid password input. Password must have 1 uppercase, 1 lowercase & minimum 6 characters",
};

export const emailRegex = {
  value: /@gmail\.com$/,
  message: "Only Gmail is allowed!",
};

export const phoneNoRegex = {
  value: /^01[356789][0-9]{8}$/,
  message: "Invalid phone number!",
};
