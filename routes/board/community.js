const express = require('express');
const router = express.Router();
const url = require('url');
const { CommunityPost, User, Communitycomment } = require('../../models');

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/* 커뮤니티 목록 */
router.get('/', async (req, res, next) => {
  res.redirect("/community/page?offset=0&limit=5");
});

// 페이지 표기
router.get('/page', async (req, res, next) => {
  try {
    let queryData = url.parse(req.url, true).query;
    let offset = Math.max(0, parseInt(queryData.offset));  // 시작 지점
    let limit = Math.max(1, parseInt(queryData.limit));   // 표시될 게시물 수
    let count = await CommunityPost.findAll();
    let allBoard = count.length;                    // 전체 게시글 수
    let maxPage = Math.ceil(allBoard / limit);           // 전체 / 보여줄 페이지 = 마지막 페이지
    let nowPage = Math.ceil(offset / limit);          // 현재 페이지
    offset = !isNaN(offset) ? offset : 0;
    limit = !isNaN(limit) ? limit : 10;

    const posts = await CommunityPost.findAll({
      include: [{
        model: User,
        attribute: ['id', 'nick'],
      }, {
        model: Communitycomment,
        attribute: ['commenterId', 'comment'],
      },],
      order: [['id', 'DESC']],
      limit: limit,    // 페이지에 표시될 게시물 수
      offset: offset,    // 시작 지점
    });
    res.render('board/main-community', {
      title: 'mountain 커뮤니티',
      communityTwits: posts,
      maxPage: maxPage,   // 마지막 페이지
      nowPage: nowPage,     // 현재 페이지
      allBoard: allBoard,   // 전체 게시글 수
    });
  } catch (error) {
    console.error(error);
    next(error);
  };
});

module.exports = router;