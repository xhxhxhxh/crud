var fs = require('fs');

var local = './data.json';

/**
 * 查询学生信息
 */
exports.find = function (callback) {
    fs.readFile(local,function (err,data) {
        if (err) {
            return callback && callback(err);
        }
        callback && callback(null,JSON.parse(data.toString()).student);
    })
};

/**
 * 查询单条学生信息
 */
exports.findById = function (id,callback) {
    fs.readFile(local,function (err,data) {
        if (err) {
            return callback && callback(err);
        }
        var studentsData = JSON.parse(data.toString()).student;
        var studentData = studentsData.find(function (item) {
            return item.ID == id;
        });
        // console.log(studentData);
        callback && callback(null,studentData);
    })
};

/**
 * 增加学生信息
 */
exports.add = function (data,callback) {
    exports.find(function (err,content) {
        if (err) {
            return console.log('文件读取错误');
        }
        data.ID = content[content.length-1].ID + 1;
        content.push(data);
        var studentData = {student:content};
        fs.writeFile(local,JSON.stringify(studentData),function (err) {
            if (err) {
                return callback && callback(err);
            }
            callback && callback();
        });
    });

};

/**
 * 编辑学生信息
 */
exports.edit = function (data,callback) {
    fs.readFile(local,function (err,content) {
        if (err) {
            return callback && callback(err);
        }
        var studentsData = JSON.parse(content.toString()).student;
        var studentData = studentsData.find(function (item) {
            return item.ID == data.ID;
        });
        for (var key in data) {
            studentData[key] = data[key];
        }
        studentData.ID = parseInt(studentData.ID);
        var studentsData = {student:studentsData};
        fs.writeFile(local,JSON.stringify(studentsData),function (err) {
            if (err) {
                return callback && callback(err);
            }
            callback && callback();
        });
    })
};

/**
 * 删除单条学生信息
 */
exports.delete = function (id,callback) {
    fs.readFile(local,function (err,content) {
        if (err) {
            return callback && callback(err);
        }
        var studentsData = JSON.parse(content.toString()).student;
        var DataIndex = studentsData.findIndex(function (item) {
            return item.ID == id;
        });
        studentsData.splice(DataIndex,1);
        var studentsData = {student:studentsData};
        fs.writeFile(local,JSON.stringify(studentsData),function (err) {
            if (err) {
                return callback && callback(err);
            }
            callback && callback();
        });
    })
};