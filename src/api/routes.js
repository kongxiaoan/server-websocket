const express = require('express');
const router = express.Router();

// 添加路由
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 添加路由
router.get('/user', (req, res) => {
    res.send('我是谁谁谁');
  });

router.get('/websocket', (req, res) => {
    res.render('websocket')
})

// 导出路由
module.exports = router;