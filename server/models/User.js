const user = (data, id, is_admin) => {
  const newUser = {
    id,
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    password: data.password,
    is_admin,
  };
  return newUser;
};

module.exports = {
  user_model: user,
};
