const router = require('express').Router();
// TODO: hook up thoughts routes
// const appRoutes = require('./appRoutes');
const userRoutes = require('./userRoutes');

// TODO: hook up thoughts routes
// router.use('/thoughts', appRoutes);

router.use('/users', userRoutes);

module.exports = router;
