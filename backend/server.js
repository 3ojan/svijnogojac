const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const { ObjectID } = require("mongodb");
const saltRounds = 10;

const path = require('path');

var User = require('./models/user.js');
var Ad = require('./models/ad.js');
var Articles = require('./models/articles.js');
var Category = require('./models/category.js');

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

const dirname = path.resolve();
// Express will serve up production assets
app.use(express.static(path.join(dirname, '/frontend/build')));

// Express serve up index.html file if it doesn't recognize route

app.get('*', (req, res) => {
  res.sendFile(path.resolve(dirname, 'frontend', 'build', 'index.html'));
})

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

    User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        return res.json({
          success: false,
          message: "Korisnik pod ovim emailom postoji postoji"
        })
      } else {
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
    isEmpty(req.body.ownerId) ||
    isEmpty(req.body.article) ||
    isEmpty(req.body.origin) ||
    isEmpty(req.body.wantedPrice) ||
    isEmpty(req.body.category) ||
    isEmpty(req.body.amount) ||
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
    category: req.body.category,
    origin: req.body.origin,
    wantedPrice: req.body.wantedPrice,
    finishDate: req.body.finishDate,
    comment: req.body.comment,
    ownerId: req.body.ownerId,
    amount: req.body.amount,
    status: req.body.adStatus || 1,
    buysell: req.body.buysell || 1,
  }

  console.log(data)

  Ad.create(data, (err) => {
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
  var id = req.body.category;
  var data = {
    name: req.body.name,
    category: req.body.category,

  }
  Category.findById(id, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      data.categoryName = result.name;
      data.unit = result.unit;

      Articles.create(data, (error) => {
        if (error) {
          return next(error);
        } else {
          return res.json({
            success: true,
          })
        }
      });
    }
  });
});

app.post("/newcategory", (req, res, next) => {
  // making sure none of the fields are empty
  console.log(res.body)
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
    unit: req.body.unit,
  }

  Category.create(data, (err) => {
    if (err) {
      return next(err);
    } else {
      return res.json({
        success: true,
      })
    }
  });
});
app.get("/backend/categories", (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) {
      throw new Error(`Can't get user data.`);
    }

    return res.status(200).send({
      success: true,
      categories
    })
  })
});


app.get("/articles", (req, res) => {
  Articles.find({ active: true }, (err, articles) => {
    if (err) {
      throw new Error(`Can't get user data.`);
    }

    return res.status(200).send({
      success: true,
      articles
    })
  })
});
app.get("/articles/:articleId", (req, res) => {
  Articles.find({ _id: req.params.articleId, active: true }, (err, ads) => {
    if (err) {
      throw new Error(`Can't get user data.`);
    }
    return res.status(200).send({
      success: true,
      ads
    })
  })
});
app.get("/ads", (req, res) => {
  Ad.find({}, (err, ads) => {
    if (err) {
      throw new Error(`Can't get ads data.`);
    }

    return res.status(200).send({
      success: true,
      ads
    })
  })
});
app.post("/updateAds", (req, res) => {
  var data = {
    entryDate: req.body.entryDate,
    owner: req.body.owner,
    article: req.body.article,
    category: req.body.category,
    origin: req.body.origin,
    wantedPrice: req.body.wantedPrice,
    finishDate: req.body.finishDate,
    comment: req.body.comment,
    ownerId: req.body.ownerId,
    amount: req.body.amount,
    status: req.body.adStatus || 1,
    buysell: req.body.buysell || 1,
  }

  // Ad.updateOne({ _id: req.body._id }, {
  //   $set: {
  //     ...data
  //   }
  // }).then((req, res) => {
  //   console.log(req, res)
  //   return res.status(200).send({
  //     success: true,
  //   })
  // })
  try {
    Ad.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { ...data } }, null
    ).then((result, req) => {
      return res.status(200).send({
        success: true,
      })
    })
  } catch (e) {
  }
});

app.get("/ads/:id", async (req, res) => {
  let id = req.params.id;
  Ad.findById(id, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      return res.status(200).send({
        success: true,
        result
      })
    }
  });
});

app.get("/ads", (req, res) => {
  Ad.find({}, (err, ads) => {
    if (err) {
      throw new Error(`Can't get ads data.`);
    }

    return res.status(200).send({
      success: true,
      ads
    })
  })
});

app.get("/getownerads/:ownerId", (req, res) => {
  Ad.find({ ownerId: req.params.ownerId }, (err, ads) => {
    if (err) {
      throw new Error(`Can't get user data.`);
    }
    return res.status(200).send({
      success: true,
      ads
    })
  })
});

app.get("/getarticleads/:articleId", (req, res) => {
  Ad.find({ article: req.params.articleId }, (err, ads) => {
    if (err) {
      throw new Error(`Can't get user data.`);
    }
    return res.status(200).send({
      success: true,
      ads
    })
  })
});

app.get("/deletearticle/:articleId", (req, res) => {
  Articles.findOneAndUpdate(
    { _id: req.params.articleId },
    { $set: { active: false } }, null
  ).then((result, req) => {
    return res.status(200).send({
      success: true,
    })
  })
});
app.post("/updatearticle/:articleId", (req, res) => {
  var data = {
    name: req.body.name,
    category: req.body.category,
    active: req.body.active || true,
    categoryName: req.body.categoryName
  }
  console.log(data)
  Articles.findOneAndUpdate(
    { _id: req.params.articleId },
    { $set: { ...data } }, null
  ).then((result, req) => {
    console.log(result, req)
    return res.status(200).send({
      success: true,
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
          message: "Neispravni podatci"
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
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

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
          userData: decoded,
          token
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

app.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      throw new Error(`Can't get user data.`);
    }
    return res.status(200).send({
      success: true,
      users
    })
  })
});

app.get("/adsbyarticle/:article", (req, res) => {
  console.log(req.params.article)
  Ad.find({ article: req.params.article }, (err, ads) => {
    if (err) {
      throw new Error(`Can't get user data.`);
    }
    return res.status(200).send({
      success: true,
      ads
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