const express = require("express");
const { User, ClubComment } = require("../../models");

const router = express.Router();

router
  .route("/:id")
  .patch(async (req, res, next) => {
    try {
      const result = await ClubComment.update(
        {
          comment: req.body.comment,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await ClubComment.destroy({
        where: { id: req.params.id },
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
