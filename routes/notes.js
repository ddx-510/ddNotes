const { Router } = require("express");
const router = Router();

const { check } = require('express-validator');
const { validateInput } = require('../middleware/validate-input');
const { save, show, getContent, deleteNote, saveOrReplace} = require('../controllers/notes');

router.post('/save',[
    check('user_id', 'userID is required').not().isEmpty(),
    check('title', 'title is required').not().isEmpty(),
    check('body', 'body is required').not().isEmpty(),
    validateInput
], save);

router.put('/saveOrReplace', [
    check('user_id', 'userID is required').not().isEmpty(),
    check('title', 'title is required').not().isEmpty(),
    check('body', 'body is required').not().isEmpty(),
    validateInput
], saveOrReplace);

router.get("/show/:user_id", show);

router.get("/getContent/:notes_id", getContent)

router.delete("/deleteNote/:notes_id", deleteNote)
module.exports = router;