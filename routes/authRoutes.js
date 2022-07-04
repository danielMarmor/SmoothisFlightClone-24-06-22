const { Router } = require('express');
const authController = require('../controllers/authController');
const custController = require('../controllers/customerController');

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.post('/import_users', custController.import_cust_users);
router.get('/tickets/:email', custController.get_user_tickets);
router.get('/flights', custController.get_all_flights);
router.get('/airlines', custController.get_all_airlines);

module.exports = router;