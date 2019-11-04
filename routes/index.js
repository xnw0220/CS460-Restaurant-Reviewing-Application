var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next) {
  res.render('index');
});

const mysql = require('mysql');
const connection = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: 'MFkdwj1314',
  database: 'cs460',
});

router.post('/search1', function(req,res,next) {
  connection.connect(function(err) {
    if (err) throw err;

    var input11 = req.body.cs1;
    var input12 = req.body.cw1;

    var sql = "SELECT ?? FROM Users U WHERE U.review_count >= ?";
    var inserts = [input11, input12];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    console.log(query.sql);
  });
});

router.post('/search2', function(req,res,next) {
  connection.connect(function(err) {
    if (err) throw err;

    var input21 = req.body.cs2;
    var input22 = req.body.cw2;

    var sql = "SELECT ?? FROM Users U WHERE U.review_count <= ?";
    var inserts = [input21, input22];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    console.log(query.sql);
  });
});

router.post('/search3', function(req,res,next) {
  connection.connect(function(err) {
    if (err) throw err;

    var input31 = req.body.cs3;
    var input32 = req.body.cw3;

    if (input32 === "active") {
      input32 = "TRUE";
    } else {
      input32 = "FALSE";
    }

    var sql = "SELECT ?? FROM Business B WHERE B.active = ?";
    var inserts = [input31, input32];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    console.log(query.sql);
  });
});

router.post('/search4', function(req,res,next) {
  connection.connect(function(err) {
    if (err) throw err;

    var input41 = req.body.cs4;
    var input42 = "%" + req.body.cw4 + "%";
    var input43 = req.body.ca4;

    var sql = "SELECT ?? FROM Business B WHERE B.categories LIKE ? AND B.stars >= ?";
    var inserts = [input41, input42, input43];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    console.log(query.sql);
  });
});

router.post('/search5', function(req,res,next) {
  connection.connect(function(err) {
    if (err) throw err;

    var input51 = req.body.cs5;
    var input52 = req.body.cw5;

    var sql = "SELECT COUNT(*) FROM Business B, Checkins C WHERE B.business_id = C.business_id and ?? >= ?";
    var inserts = [input52, input51];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    console.log(query.sql);
  });
});

router.post('/search6', function(req,res,next) {
  connection.connect(function(err) {
    if (err) throw err;

    var input61 = req.body.cs6;

    var sql = "SELECT R.review_text FROM Business B, Reviews R WHERE B.business_id = R.business_id and B.business_name = ??";
    var inserts = [input61];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    console.log(query.sql);
  });
});

router.post('/search7', function(req,res,next) {
  connection.connect(function(err) {
    if (err) throw err;

    var input71 = req.body.cs7;
    var input72 = req.body.cw7;

    var sql = "SELECT ?? FROM Business B, Reviews R WHERE B.business_id = R.business_id and R.stars = ??";
    var inserts = [input71, input72];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    console.log(query.sql);
  });
});

router.post('/search8', function(req,res,next) {
  connection.connect(function(err) {
    if (err) throw err;

    var input81 = req.body.cs8;

    var sql = "SELECT AVG(B.stars), SUM(B.review_count) FROM Business B WHERE B.business_name = ??";
    var inserts = [input81];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    console.log(query.sql);
  });
});

router.post('/search9', function(req,res,next) {
  connection.connect(function(err) {
    if (err) throw err;

    var input91 = req.body.cs9;
    var input92 = req.body.cw9;

    var sql = "SELECT ?? FROM Business B ORDER BY B.review_count DESC LIMIT ?";
    var inserts = [input91, input92];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    console.log(query.sql);
  });
});

router.post('/search10', function(req,res,next) {
  connection.connect(function(err) {
    if (err) throw err;

    var sql = "SELECT U.name FROM Users U WHERE U.review_count >= ALL (SELECT U2.review_count FROM Users U2)";

    var query = connection.query(sql,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    console.log(query.sql);
  });
});

router.post('/add_business', function(req,res,next) {
  connection.connect(function(err) {
    if (err) throw err;

    var input_b1 = req.body.b1;
    var input_b2 = req.body.b2;
    var input_b3 = req.body.b3;
    var input_b4 = req.body.b4;
    var input_b5 = req.body.b5;
    var input_b6 = req.body.b6;
    var input_b7 = req.body.b7;
    var input_b8 = req.body.b8;
    var input_b9 = req.body.b9;
    var sql = "INSERT INTO Business (business_id, full_address, active, categories, city, review_count, " +
        "business_name, state, stars) VALUES (?,?,?,?,?,?,?,?,?)";
    var inserts = [input_b1, input_b2, input_b3, input_b4, input_b5, input_b6, input_b7, input_b8, input_b9];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    console.log(query.sql);
  });
});

router.post('/add_checkins', function(req,res,next) {
  connection.connect(function(err) {
    if (err) throw err;

    var input_c1 = req.body.c1;
    var input_c2 = req.body.c2;
    var input_c3 = req.body.c3;
    var input_c4 = req.body.c4;
    var input_c5 = req.body.c5;
    var input_c6 = req.body.c6;
    var input_c7 = req.body.c7;
    var input_c8 = req.body.c8;
    var sql = "INSERT INTO Checkins (business_id, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday)" +
        "VALUES (?,?,?,?,?,?,?,?)";
    var inserts = [input_c1, input_c2, input_c3, input_c4, input_c5, input_c6, input_c7, input_c8];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    console.log(query.sql);
  });
});

router.post('/add_reviews', function(req,res,next) {
  connection.connect(function(err) {
    if (err) throw err;

    var input_r1 = req.body.rr1;
    var input_r2 = req.body.rr2;
    var input_r3 = req.body.rr3;
    var input_r4 = req.body.rr4;
    var input_r5 = req.body.rr5;
    var input_r6 = req.body.rr6;
    var sql = "INSERT INTO Reviews (review_id, business_id, user_id, stars, review_date, review_text) " +
        "VALUES (?,?,?,?,?,?)";
    var inserts = [input_r1, input_r2, input_r3, input_r4, input_r5, input_r6];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    console.log(query.sql);
  });
});

router.post('/add_users', function(req,res,next) {
  connection.connect(function(err) {
    if (err) throw err;

    var input_u1 = req.body.u1;
    var input_u2 = req.body.u2;
    var input_u3 = req.body.u3;
    var input_u4 = req.body.u4;
    var sql = "INSERT INTO Users (user_id, name, average_stars, review_count) VALUES (?,?,?,?)";
    var inserts = [input_u1, input_u2, input_u3, input_u4];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    console.log(query.sql);
  });
});

router.post('/delete', function(req,res,next) {
  connection.connect(function(err) {
    if (err) throw err;

    var del_table = req.body.delete_table;
    var input_d1 = req.body.d1;
    var input_d2 = req.body.d2;
    var sql = "DELETE FROM ?? WHERE ?? = ?";
    var inserts = [del_table, input_d1, input_d2];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    console.log(query.sql);
  });
});

router.post('/update', function(req,res,next) {
  connection.connect(function(err) {
    if (err) throw err;

    var update_table = req.body.update_table;
    var input_up1 = req.body.up1;
    var input_up2 = req.body.up2;
    var input_up3 = req.body.up3;
    var input_up4 = req.body.up4;
    var sql = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    var inserts = [update_table, input_up1, input_up2, input_up3, input_up4];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    console.log(query.sql);
  });
});


module.exports = router;
