const express = require('express');
const router = express.Router();

// @route GET api/user/test
// @desc Tests post route
// @access Public 
router.get('/test', (req,res) => {
  res.json({msg: "Profile functionality works!"})
});

module.exports = router;
