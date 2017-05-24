const Promise = require('bluebird');
const db = require('./db');
const Student = require('./db/models/student');
const Campus = require('./db/models/campus');

const data = {
  students: [
    { name: 'Marina', email: 'marina@margarethamilton.js', campusId: 1 },
    { name: 'Ronald', email: 'ronald@margarethamilton.js', campusId: 1 },
    { name: 'Joella', email: 'joella@margarethamilton.js', campusId: 1 },

    { name: 'Bradley', email: 'bradley@margarethamilton.js', campusId: 2 },
    { name: 'Josefina', email: 'josefina@margarethamilton.js', campusId: 2 },
    { name: 'Priscilla', email: 'priscilla@margarethamilton.js', campusId: 2 },
    { name: 'Fenni', email: 'fenni@margarethamilton.js', campusId: 2 },

    { name: 'Chris', email: 'chris@margarethamilton.js', campusId: 3 },
    { name: 'Winston', email: 'winston@margarethamilton.js', campusId: 3 },
    { name: 'Troy', email: 'troy@margarethamilton.js', campusId: 3 },

    { name: 'Freida', email: 'freida@margarethamilton.js', campusId: 4 },
    { name: 'Monika', email: 'monika@margarethamilton.js', campusId: 4 },
    { name: 'Lai', email: 'lai@margarethamilton.js', campusId: 4 },
    { name: 'Rayford', email: 'rayford@margarethamilton.js', campusId: 4 },
    { name: 'Dorene', email: 'dorene@margarethamilton.js', campusId: 4 },
  ],
  campuses: [
    { name: 'Luna', image: 'https://placeimg.com/400/400/nature' },
    { name: 'Terra', image: 'https://placeimg.com/400/400/tech' },
    { name: 'Mars', image: 'https://placeimg.com/400/400/animals' },
    { name: 'Titan', image: 'https://placeimg.com/400/400/arch' },
  ]
};

db.sync({force: true})
.then(() => {
  console.log('Dropped old data, now inserting data');
  const creatingStudents = data.students.map(student => {
    return Student.create(student, { include: [Campus] });
  });
  const creatingCampuses = data.campuses.map(campus => {
    return Campus.create(campus);
  });
  return Promise.all([creatingStudents, creatingCampuses]);
})
.then(() => {
  console.log('Finished inserting data (press ctrl-c to exit)');
})
.catch(err => {
  console.error('There was totally a problem', err, err.stack);
});
