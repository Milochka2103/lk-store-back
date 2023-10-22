/* in proceed */

export const handleCartItems = (db, bcrypt) => (req, res) => {
  const { user_id, cartItem_id, count } = req.body;
  if (!user_id || !cartItem_id || !count) {
    return res.status(400).json("Incorrect data");
  }
  db
  .returning("*")
    .insert({
      user_id: user_id,
      cartItem_id: cartItem_id,
      count: 1
    })
    .then((response) => {
      res.json(response);
    });
};

export const handleGetCartItems = (db) => (req, res) => {
  db("cartItems")
    .select("*")
    .from("cartItems")
    .where("user_id", "=", user_id)
    .then((response) => res.json(response));
};