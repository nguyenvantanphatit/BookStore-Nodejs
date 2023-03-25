const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.get("/home", async (req, res, next) => {
  let perPage = 2;
  let page = req.params.page || 1;
  Book.find()
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, books) => {
      Book.countDocuments((err, count) => {
        if (err) return next(err);
        res.render("home", {
          books: books,
          current: page,
          pages: Math.ceil(count / perPage),
        });
      });
    });
});

// pagination
router.get("/home/:page", async (req, res, next) => {
  let perPage = 2;
  let page = req.params.page || 1;

  Book.find()
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, books) => {
      Book.countDocuments((err, count) => {
        if (err) return next(err);
        res.render("home", {
          books: books,
          current: page,
          pages: Math.ceil(count / perPage),
        });
      });
    });
});

module.exports = router;
