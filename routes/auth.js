const router = require('express').Router();
const passport = require('../authentication');
const localStrategy = require('../authentication/localStrategy');
const {createToken} = require('../authentication/tokens');

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next)=>{
    try{
      const token = createToken(req.user);
      res.json({
        user: req.user,
        token
      })
    }catch(err){
      next(err);
    }
  }
)

module.exports = router;
