var students = require('./student.js');
var express = require('express');
var fs = require('fs');

var router = express.Router();

//主页
router.get('/students/',function (req,res) {
    students.find(function (err,data) {
        if (err) {
            return res.send('error');
        }
        res.render('index.html',{student:data});
    });

});

//添加功能
router.get('/students/add/',function (req,res) {
    res.render('add.html');
});

router.post('/students/add/',function (req,res) {
    students.add(req.body,function (err) {
        if (err) {
            return res.send('error');
        }
        res.redirect('/students');
    })
});

//编辑页面
router.get('/students/edit/',function (req,res) {
    students.findById(req.query.ID,function (err,data) {
        if (err) {
            return res.send('error');
        }
        res.render('edit.html',data);
    });

});

router.post('/students/edit/',function (req,res) {
    students.edit(req.body,function (err) {
        if (err) {
            return res.send('error');
        }
        res.redirect('/students');
    })
});

//删除功能
router.get('/students/delete/',function (req,res) {
    students.delete(req.query.ID,function (err,data) {
        if (err) {
            return res.send('error');
        }
        res.redirect('/students');
    });

});
module.exports = router;
