import bcrypt from "bcryptjs";
const saltAndHashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return { hashedPassword };
};

export default saltAndHashPassword;
