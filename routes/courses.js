var express = require('express');
const { encrypt, decrypt } = require('../helpers/encryptDecrypt');
const verifyToken = require('../helpers/verifyToken');
var router = express.Router();


router.post('/addCourse', verifyToken, async function (req, res, next) {
    const { title, description, videoUrl, courseDuration, category } = req.body;
    const { roleId } = req.query
    if (!roleId) {
        res.send({ status: 'ERROR', message: `Role Id is invalid` })
        return
    }

    if ([1, 2].includes(parseInt(roleId))) {
        let dataReceived = await connectionString.query(rawQuery.insertCourse, [title, description, videoUrl, courseDuration, category])
        res.send({ status: 'SUCCESS', message: 'Course Created Successfully', dataReceived })
        return;
    }

    res.send({ status: 'ACCESS ERROR', message: `User  Does not have access to add courses` })
});

router.put('/updateCourse', verifyToken, async function (req, res, next) {
    const { title, description, videoUrl, courseDuration, category } = req.body;
    const { roleId, courseId } = req.query
    if (!roleId) {
        res.send({ status: 'ERROR', message: `Role Id is required` })
        return
    }

    if (!courseId) {
        res.send({ status: 'ERROR', message: `Course Id is required` })
        return
    }

    if ([1, 2].includes(parseInt(roleId))) {
        let dataReceived = await connectionString.query(rawQuery.updateCourse, [title, description, videoUrl, courseDuration, category, courseId])
        res.send({ status: 'SUCCESS', message: 'Course Updated Successfully', dataReceived })
        return;
    }

    res.send({ status: 'ACCESS ERROR', message: `User Does not have access to update courses` })
});



router.delete('/deleteCourse', verifyToken, async function (req, res, next) {
    const { roleId, courseId } = req.query

    if (!roleId) {
        res.send({ status: 'ERROR', message: `Role Id is required` })
        return
    }

    if (!courseId) {
        res.send({ status: 'ERROR', message: `Course Id is required` })
        return
    }

    if ([1, 2].includes(parseInt(roleId))) {
        let dataReceived = await connectionString.query(rawQuery.deleteCourse, [courseId])
        res.send({ status: 'SUCCESS', message: 'Course Deleted Successfully', dataReceived })
        return;
    }

    res.send({ status: 'ACCESS ERROR', message: `User Does not have access to update courses` })
});



router.patch('/approve', verifyToken, async function (req, res, next) {
    const { approved } = req.body;
    const { roleId, courseId } = req.query
    if (!roleId) {
        res.send({ status: 'ERROR', message: `Role Id is required` })
        return
    }

    if (!courseId) {
        res.send({ status: 'ERROR', message: `Course Id is required` })
        return
    }

    if ([2].includes(parseInt(roleId))) {
        let dataReceived = await connectionString.query(rawQuery.approve, [approved ?? 1, courseId])
        res.send({ status: 'SUCCESS', message: 'Course Approved Successfully', dataReceived })
        return;
    }

    res.send({ status: 'ACCESS ERROR', message: `User Does not have access to Approve courses` })
});


router.get('/getCourses', verifyToken, async function (req, res, next) {
    let dataReceived = await connectionString.query(rawQuery.getCourse, [1])
    res.send({ status: 'SUCCESS', data: dataReceived[0].length ? dataReceived[0] : [] })
});

module.exports = router