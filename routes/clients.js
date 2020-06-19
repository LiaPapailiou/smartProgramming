const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Clients = require('../model/Clients');

// Get the list of all clients in the DB
router.get('/api/clients', async (req, res) => {

});

// Get one client
router.get('/api/clients/:client_id', async (req, res) => {

});

// Edit client's information
router.post('/api/clients/edit/:client_id', async (req, res) => {

});

// Insert a client into the DB
router.put('/api/clients/add', async (req, res) => {

});

// Delete a client
router.delete('/api/clients/delete/:client_id', async (req, res) => {

});

// Login route with auth


module.exports = router;