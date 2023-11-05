const express = require('express')
const { org, orgs, orgsByVolunteer, saveNewOrg, updateOrg, saveEvent, getEvent, getEvents, getJoinedEvents, deleteEvent, joinEvent } = require('../services/orgs.service')
const { getVolunteers } = require('../services/profile.service')
const router = express.Router()

// define the home page route
router.get('/orgs/:id', orgs);
router.get('/org/:id', org);
router.post('/', saveNewOrg);
router.put('/:id', updateOrg);

// router.post('/event', saveEvent);
// router.post('/event/:userId/:id', joinEvent);
// router.get('/events/:id', getEvents);
// router.get('/events', getEvents);
// router.get('/eventsJoined/:id', getJoinedEvents);
// router.get('/event/:id', getEvent);
// router.patch('/event/:id', saveEvent);
// router.delete('/event/:id', deleteEvent);

router.get('/volunteer/:id', orgsByVolunteer);
router.get('/volunteer', getVolunteers);
// router.patch('/volunteer/:id', setVolunteerPosition);


module.exports = router