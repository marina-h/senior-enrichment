'use strict'
const Router = require('express').Router();
const Campus = require('../db/models/campus');
const Student = require('../db/models/student');

Router.param('campusId', (req, res, next, campusId) => {
  if (!Number(campusId)) {
    req.invalidCampusId = true;
    next();
  } else {
    Campus.findById(campusId)
    .then(campus => {
      req.campus = campus;
      next();
    })
    .catch(next)
  }
})

Router
  .route('/')
  .get((req, res, next) => {
    Campus.findAll({})
    .then(campus => {
      res.json(campus);
    })
    .catch(next);
  })
  .post((req, res, next) => {
    Campus.create(req.body)
    .then(newCampus => {
      res.status(201).send(newCampus);
    })
    .catch(next);
  })

Router
  .route('/:campusId')
  .get((req, res, next) => {
    if (req.campus) res.json(req.campus)
    else if (req.invalidCampusId) res.sendStatus(500)
    else res.sendStatus(404);
  })
  .put((req, res, next) => {
    if (req.invalidCampusId) {
      res.sendStatus(500)
    }
    else if (!req.campus) {
      res.sendStatus(404);
    }
    else {
      Campus.update(req.body, {
        where: {
          id: req.campus.id
        },
        returning: true
      })
      .spread((_, updatedCampus) => {
        res.send(updatedCampus[0]);
      })
      .catch(next);
    }
  })
  .delete((req, res, next) => {
    if (req.invalidCampusId) {
      res.sendStatus(500)
    }
    else if (!req.campus) {
      res.sendStatus(404);
    }
    else {
      Campus.destroy({
        where: {
          id: req.campus.id
        }
      })
      .then(() => {
        res.sendStatus(204);
      })
      .catch(next);
    }
  })

Router.get('/:campusId/students', (req, res, next) => {
  if (req.invalidCampusId) {
    res.sendStatus(500)
  }
  else if (!req.campus) {
    res.sendStatus(404);
  }
  else {
    Student.findAll({
      where: {
        campusId: req.campus.id
      }
    })
    .then(students => {
      res.json(students)
    })
    .catch(next);
  }
});

module.exports = Router;
