import axios from "axios";
import bcrypt from "bcryptjs";
const baseUrl = "http://localhost:3001/users";

const getAll = async () => {
  const users = await axios.get(baseUrl);
  return users.data;
};

const signUp = async (user) => {
  const { email, favourites, password, repeatPassword } = user;

  const users = await getAll();
  const isEmailTaken = users.find((user) => user.email === email);
  if (isEmailTaken) throw new Error("User With This Email Already Exists");

  const arePasswordsMatching = password === repeatPassword;
  if (!arePasswordsMatching) throw new Error("Passwords Don't Match");

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = {
    email,
    password: passwordHash,
    favourites,
  };

  const res = await axios.post(baseUrl, newUser);
  return res.data;
};

const logIn = async (user) => {
  const { email, password } = user;

  const users = await getAll();
  const foundUser = users.find((user) => user.email === email);
  if (!foundUser) throw new Error("User Doesn't Exist");

  const passwordsMatch = await bcrypt.compare(password, foundUser.password);
  if (!passwordsMatch) throw new Error("Incorrect Password");

  localStorage.setItem("user", foundUser.id);

  return {
    email,
    favourites: foundUser.favourites,
    id: foundUser.id,
  };
};

const getUser = async (userID) => {
  const user = await axios.get(`${baseUrl}/${userID}`);
  if (!user) throw new Error("User Doesn't Exist");

  return user;
};

export { getAll, getUser, signUp, logIn };
