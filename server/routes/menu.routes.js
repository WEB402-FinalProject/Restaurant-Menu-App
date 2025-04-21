const express = require('express');
const ensureLogin = require('connect-ensure-login');
const {createMenu, getMenu, getMenuById, updateMenu, deleteMenu} = require('../controllers/menu.controller');

const router = express.Router();
router.use(ensureLogin.ensureLoggedIn());

router.post('/', ensureLogin.ensureLoggedIn(),createMenu)
router.get('/', getMenu)
router.get('/:id', getMenuById)
router.put('/:id', ensureLogin.ensureLoggedIn(), updateMenu)
router.delete('/:id', ensureLogin.ensureLoggedIn(), deleteMenu)


module.exports = router;
