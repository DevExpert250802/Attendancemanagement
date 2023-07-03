const express = require('express')
const {
    getContacts,
    getSpecificContact,
    createContact,
    updateContact,
    deleteContact
}
    = require('../controller/contactController');
const validatingToken = require('../middleware/validateToken');

const router = express.Router()

router.use(validatingToken)

router.route('/').get(getContacts).post(createContact)
router.route('/:id').get(getSpecificContact).put(updateContact).delete(deleteContact)

module.exports = router