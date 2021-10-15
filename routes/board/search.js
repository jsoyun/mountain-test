const express = require('express');
const url = require('url');
const { CommunityPost, Sequelize, User } = require('../../models');
const router = express.Router();

const Op = Sequelize.Op;    // LIKE

/* 검색 기능 */
router.get('/', async (req, res, next) => {
  try {
    let queryData = url.parse(req.url, true).query;
    let search = queryData.search;
    let select = queryData.select;

    /* 제목/내용 검색 */
    const titleContents = await CommunityPost.findAll({
      include: {
        model: User,
        attribute: ['id', 'nick'],
      },
      where: {
        [Op.or]: [{
          content: {
            [Op.like]: "%" + search + "%"
          }
        }, {
          title: {
            [Op.like]: "%" + search + "%"
          }
        },
        ]
      },
      order: [['id', 'DESC']],
    });

    /* 내용 검색 */
    const contents = await CommunityPost.findAll({
      include: {
        model: User,
        attribute: ['id', 'nick'],
      },
      where: {
        content: {
          [Op.like]: "%" + search + "%"
        },
      },
      order: [['id', 'DESC']],
    });

    /* 제목 검색 */
    const titles = await CommunityPost.findAll({
      include: {
        model: User,
        attribute: ['id', 'nick'],
      },
      where: {
        title: {
          [Op.like]: "%" + search + "%"
        },
      },
      order: [['id', 'DESC']],
    });

    /* 작성자 검색 */
    const users = await CommunityPost.findAll({
      include: {
        model: User,
        attribute: ['id', 'nick'],
        where: {
          nick: {
            [Op.like]: "%" + search + "%"
          },
        }
      },
      order: [['id', 'DESC']],
    });

    if (select == 'titleContent') {
      texts = titleContents;
    } else if (select == 'content') {
      texts = contents;
    } else if (select == 'title') {
      texts = titles;
    } else {
      texts = users;
    }

    res.render('board/main-community', {
      title: `mountain - ${search} 검색 결과`,
      communityTwits: texts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  };
});

module.exports = router;