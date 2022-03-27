const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")

const saltRounds = 10;

var User = require('./models/user.js');
var Ad = require('./models/ad.js');
var Articles = require('./models/articles.js');

// Set Application Port
const PORT = process.env.PORT || 2999;

// create express app
const app = express()
const mongoose = require('mongoose')


app.use(cors({
  origin: ['http://localhost:3001'],
  credentials: true
}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set("appSecret", "secretforinvoicingapp")

function isEmpty(str) {
  return !str || 0 === str.length
}



mongoose.set('useCreateIndex', true)
const configDB = require('./config/database.js')
mongoose.connect(configDB.url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
  if (err) {
    throw (err)
  } else {
    console.log("Connected successfully to MongoDB.")
  }
});




// application main routes --------------------

app.post("/register", (req, res, next) => {
  // making sure none of the fields are empty
  if (
    isEmpty(req.body.email) ||
    isEmpty(req.body.password)
  ) {
    return res.json({
      success: false,
      message: "All fields are required"
    })
  }

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    var userData = {
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: 1
    }

    User.create(userData, (err, user) => {
      if (err) {
        return next(err);
      } else {

        const userObject = {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }

        // create token
        let token = jwt.sign(userObject, app.get("appSecret"));

        return res.status(200).cookie('access_token', token, {
          maxAge: 3600000,
          httpOnly: true,
          // secure: true
        }).json({
          success: true
        })
      }
    })
  })
})
app.post("/newad", (req, res, next) => {
  // making sure none of the fields are empty
  console.log(req.body)
  if (
    isEmpty(req.body.entryDate) ||
    isEmpty(req.body.owner) ||
    isEmpty(req.body.article) ||
    isEmpty(req.body.origin) ||
    isEmpty(req.body.wantedPrice) ||
    isEmpty(req.body.finishDate)
  ) {
    return res.json({
      success: false,
      message: "All fields are required"
    })
  }

  var data = {
    entryDate: req.body.entryDate,
    owner: req.body.owner,
    article: req.body.article,
    origin: req.body.origin,
    wantedPrice: req.body.wantedPrice,
    finishDate: req.body.finishDate,
    comment: req.body.comment,
  }

  Ad.create(data, (err, newAd) => {
    if (err) {
      return next(err);
    } else {
      return res.json({
        success: true,
      })
    }
  });
});
app.post("/newarticle", (req, res, next) => {
  // making sure none of the fields are empty
  console.log(req.body)
  if (
    isEmpty(req.body.name)
  ) {
    return res.json({
      success: false,
      message: "name is required"
    })
  }

  var data = {
    name: req.body.name,
  }

  Articles.create(data, (err, newAd) => {
    if (err) {
      return next(err);
    } else {
      return res.json({
        success: true,
      })
    }
  });
});


app.get("/articles", (req, res) => {
  Articles.find({}, (err, articles) => {
    if (err) {
      throw new Error(`Can't get user data.`);
    }

    return res.status(200).send({
      success: true,
      articles
    })
  })
});

app.get("/test", (req, res) => {
  res.send('Hello from B!')
});

app.post("/login", (req, res) => {
  console.log("login")
  if (
    isEmpty(req.body.email) ||
    isEmpty(req.body.password)
  ) {
    return res.json({
      success: false,
      message: "All fields are required"
    })
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      throw err;
    } else {
      if (user == undefined) {
        return res.json({
          success: false,
          message: "Sorry, wrong email"
        })
      }

      let authenticated = bcrypt.compareSync(req.body.password, user.password)
      delete user.password;

      if (authenticated) {
        const userObject = {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }

        // create token
        let token = jwt.sign(userObject, app.get("appSecret"))

        return res.status(200).cookie('access_token', token, {
          maxAge: 3600000,
          httpOnly: true,
          // secure: true
        }).json({
          success: true,
          token
        });
      }

      return res.json({
        success: false,
        message: "Wrong Password, please retry"
      })

    }
  })
})


app.get("/logout", (req, res) => {
  let token = req.cookies.access_token

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get("appSecret"), (err) => {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token."
        })
      } else {
        return res.status(200).cookie('access_token', token, {
          maxAge: Date.now(),
          httpOnly: true,
          // secure: true
        }).clearCookie("access_token").json({
          success: true,
          message: "Logged out successfully."
        })
      }
    })
  } else {
    // if there is no token, return an error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});

app.get("/auth", (req, res) => {
  // let token = req.cookies.access_token
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get("appSecret"), (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token."
        })
      } else {
        // if everything is good, save to request for use in other routes
        return res.status(200).send({
          success: true,
          userData: decoded
        })
      }
    })
  } else {
    // if there is no token, return an error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    })
  }
})


app.get("/emails", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      throw new Error(`Can't get user data.`);
    }
    var userEmails = []

    users.forEach((user, index) => {
      userEmails[index] = user.email
    });

    return res.status(200).send({
      success: true,
      userEmails: userEmails
    })
  })
})





// middleware for protecting routes --------------------
const authMiddleware = (req, res, next) => {
  let token = req.cookies.access_token

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get("appSecret"), (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token."
        });
      } else {
        // if everything is good, save to request for use in other routes
        res.locals.user = decoded
        res.locals.success = true
        next()
      }
    });
  } else {
    // if there is no token, return an error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    })
  }
}


// other routes --------------------
// app.get("/", authMiddleware, (req, res) => {
//   res.json(res.locals.user)
// })




app.listen(PORT, () => {
  console.log(`App running on localhost:${PORT}.`)
})