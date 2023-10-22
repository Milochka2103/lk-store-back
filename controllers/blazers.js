import { response } from "express";

export const handleCreateNewJacket = (db) => (req, res) => {
  const { title, price, isLiked, isInCart } = req.body;
  if (!title || !price) {
    return res.status(400).json('Title or price not filled')
  }
  db("blazers")
    .returning("*")
    .insert({
      title: title,
      price: price,
      isliked: isLiked,
      isincart: isInCart,
    })
    .then((response) => {
      res.json(response);
    });
    }


export const handleGetBlazers = (db) => (req, res) => {
  db('blazers')
    .select('*')
    .then(response => res.json(response))
}
