export const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, firstname, lastname, password } = req.body;
  if (!email || !firstname || !lastname || !password) {
    return res.status(400).json("Incorrect form submission");
  }

  const salt = bcrypt.genSaltSync(5)
  const hash = bcrypt.hashSync(password, salt);

  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0].email,
            firstname: firstname,
            lastname: lastname,
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  })
    .catch((err) => res.status(400).json(err))
}