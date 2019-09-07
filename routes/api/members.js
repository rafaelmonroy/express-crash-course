const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

//get all members
router.get('/', (req, res) => res.json(members));

//get single memner
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({
      msg: `No member with ID of ${req.params.id} found`
    });
  }
});

//create member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'please include name and email' });
  }

  members.push(newMember);
  res.json(members);
});

//update member
router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: 'Member was updated', member });
      }
    });
  } else {
    res.status(400).json({
      msg: `No member with ID of ${req.params.id} found`
    });
  }
});

//delete member
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: 'member deleted',
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({
      msg: `No member with ID of ${req.params.id} found`
    });
  }
});

module.exports = router;
