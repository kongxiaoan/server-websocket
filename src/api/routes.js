const express = require('express');
const router = express.Router();

// 添加路由
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 导出路由
module.exports = router;