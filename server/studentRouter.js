'use strict'
const Router = require('express').Router();
const Student = require('../db/models/student');

Router.param('studentId', (req, res, next, studentId) => {
  if (!Number(studentId)) {
    req.invalidStudentId = true;
    next();
  } else {
    Student.findById(studentId)
    .then(student => {
      req.student = student;
      next();
    })
    .catch(next)
  }
})

Router
  .route('/')
  .get((req, res, next) => {
    Student.findAll({})
    .then(students => {
      res.json(students);
    })
    .catch(next);
  })
  .post((req, res, next) => {
    Student.create(req.body)
    .then(newStudent => {
      res.status(201).send(newStudent);
    })
    .catch(next);
  })

Router
  .route('/:studentId')
  .get((req, res, next) => {
    if (req.student) res.json(req.student)
    else if (req.invalidStudentId) res.sendStatus(500)
    else res.sendStatus(404);
  })
  .put((req, res, next) => {
    if (req.invalidStudentId) {
      res.sendStatus(500)
    }
    else if (!req.student) {
      res.sendStatus(404);
    }
    else {
      Student.update(req.body, {
        where: {
          id: req.student.id
        },
        returning: true
      })
      .spread((_, updatedStudent) => {
        res.send(updatedStudent[0]);
      })
      .catch(next);
    }
  })
  .delete((req, res, next) => {
    if (req.invalidStudentId) {
      res.sendStatus(500)
    }
    else if (!req.student) {
      res.sendStatus(404);
    }
    else {
      Student.destroy({
        where: {
          id: req.student.id
        }
      })
      .then(() => {
        res.sendStatus(204);
      })
      .catch(next);
    }
  })

module.exports = Router;
