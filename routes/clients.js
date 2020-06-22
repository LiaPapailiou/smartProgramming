const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Clients = require('../model/Clients');

// Get the list of all clients in the DB
router.get('/clients', async (req, res) => {

});

// Get one client
router.get('/clients/:client_id', async (req, res) => {

});

// Edit client's information
router.post('/clients/edit/:client_id', async (req, res) => {

});

// Insert a client into the DB
router.put('/clients/add', async (req, res) => {

});

// Delete a client
router.delete('/clients/delete', async (req, res) => {

});



module.exports = router;