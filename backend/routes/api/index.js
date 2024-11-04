const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const bcrypt = require('bcryptjs');

router.use(restoreUser);

router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

    setTokenCookie(res, user);
    return res.json({ user: user });
  });

  // GET /api/restore-user

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

// Test route
router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
