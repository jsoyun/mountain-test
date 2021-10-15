const express = require('express');
const { CommunityPost, User, Communitycomment } = require('../../models');
const fs = require('fs');
const fs2 = require('fs').promises;
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

try {
  fs.readdirSync('uploads');
} catch (err) {
  console.error('uploads 폴더 생성');
  fs.mkdirSync('uploads');
}

/* 게시글 READ */
router.get('/:id', async (req, res, next) => {
  try {
    const texts = await CommunityPost.findOne({
      include: {
        model: User,
        attribute: ['id', 'nick'],
      },
      where: { id: `${req.params.id}` },
    })
    await CommunityPost.update(
      { views: texts.views + 1 },
      { where: { id: `${req.params.id}` } }
    );
    res.render('board/view-community', {
      title: 'mountain 커뮤니티',
      communityTwits: texts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  };
});

/* 댓글추가 */
router.post("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const comment = await Communitycomment.create({
      postId: req.body.postId,
      commenterId: req.body.commenterId,
      comment: req.body.comment,
    });
    res.send("success");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 댓글수정
router.patch("/patch", isLoggedIn, async (req, res, next) => {
  try {
    const result = await Communitycomment.update({
      comment: req.body.comment,
    }, {
      where: { id: req.body.id },
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
})

/* 댓글삭제 */
router.delete("/delete/:id", isLoggedIn, async (req, res, next) => {
  try {
    const result = await Communitycomment.destroy({ where: { id: req.params.id } });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 댓글자료제공 */
router.get("/:id/comment", async (req, res, next) => {
  console.log(req.params.id)
  try {
    const reply = await CommunityPost.findAll({
      where: { id: req.params.id },
      include: {
        model: Communitycomment,
        attributes: ["id", "comment", "createdAt"],
        include: {
          model: User,
          attributes: ["id", "nick"],
        },
      },
      order: [["createdAt", "DESC"]],
    });
    console.log("//////////////////////////////////////////////////////////////////////////")
    res.json(reply);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 게시글 DELETE */
router.get('/:id/delete', async (req, res, next) => {
  try { // 저장된 사진 DELETE
    if(confirm("삭제하시겠습니까?")){
    const { img } = await CommunityPost.findOne({ where: { id: parseInt(req.params.id, 10) } });
    if (img) {
      const file = await fs2.readFile(img.replace('/img', './uploads'));
      if (file) {
        await fs2.unlink(img.replace('/img', './uploads'));
      }
    }
    await CommunityPost.destroy({
      where: { id: parseInt(req.params.id, 10) },
    });
    await Communitycomment.destroy({
      where: { postId: parseInt(req.params.id, 10) },
    });
    res.redirect("/community/page?offset=0&limit=5");
  }
  } catch (error) {
    console.error(error);
    next(error);
  };
});

/* 게시글 좋아요 */
router.post('/:id/like', async (req, res, next) => {
  try {
    const post = await CommunityPost.find({ where: { id: req.params.id } });
    await post.addLiker(parseInt(req.user.id));
    res.send("좋아요");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 게시글 좋아요 취소 */
router.post('/:id/unlike', async (req, res, next) => {
  try {
    const post = await CommunityPost.find({ where: { id: req.params.id } });
    await post.removeLiker(parseInt(req.user.id));
    res.send('취소');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;