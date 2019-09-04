const express = require('express')
const path = require('path')
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000
var host = process.env.IP || '127.0.0.1'
const flash = require('express-flash-notification');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var mongo = require('mongodb');
var app = express()
var username;
var resultset;
var MongoClient = mongo.MongoClient;
const genuuid = require('uuid/v4');
const dbName = 'Calvin';
const dbUser = 'dbreaduser';
const dbPassword = 'welcome1';
// yourDB?authSource=yourDB&w=1
// const url = `mongodb+srv://${dbUser}:${dbPassword}@cluster0-dm88v.mongodb.net/Calvin?authMechanism=SCRAM-SHA-1`;
const url = `mongodb+srv://${dbUser}:${dbPassword}@cluster0-dm88v.mongodb.net/${dbName}?retryWrites=true&w=majority`

// const url = "mongodb+srv://kstan8668@gmail.com:a81332607@cluster0-dm88v.mongodb.net/Calvin?replicaset=Cluster0&authSource=admin&ssl=true"
// const url = `mongodb+srv://${dbUser}:${dbPassword}@cluster0-dm88v.mongodb.net/Calvin?retryWrites=true&w=majority`;

/*
const MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://kstan8668gmail.com:a81332607@cluster0-dm88v.mongodb.net/test?retryWrites=true&w=majority";
// const uri = "mongodb+srv://<username>:<password>@cluster0-dm88v.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true }).then(client2){
  client2.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  })};
  
});*/



// mongodb+srv://<username>:<password>@cluster0-dm88v.mongodb.net/test?retryWrites=true&w=majority
// var url = "mongodb+srv://kstan8668@gmail.com:a81332607@cluster0-dm88v.mongodb.net/test?retryWrites=true&w=majority";
console.log("URL:" + url);

//( async () => { 
/*MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  dbo.createCollection("usermaster", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  })
})*/
// })();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(cookieParser());
app.use(session({ genid: function(req) {
  return genuuid() // use UUIDs for session IDs
}, secret: 'keyboard cat', cookie: { maxAge: 60000 } }))

app.use(flash(app));
app.get('/', (req, res) => res.redirect('/home'))

app.get('/404', (req, res) => res.render('pages/404', { user: '', messages: '', smessages: '', cuisines: '', recipes: '' }))
app.get('/500', (req, res) => res.render('pages/500', { user: '', messages: '', smessages: '', cuisines: '', recipes: '' }))
app.get('/signup', (req, res) => res.render('pages/signup', { user: '', messages: '', smessages: '', cuisines: '', recipes: '' }))

app.get('/recipe/', function (req, res) {

  res.render('pages/recipe', { user: '', messages: '', smessages: '', cuisines: '', recipe: [], allergens: [] })

});

app.get('/edit_recipe/:id', function (req, res) {

  var id = req.params.id;
  var o_id = new mongo.ObjectID(id);
  var query = { '_id': o_id };
  (async () => {
    let client = await MongoClient.connect(url,
      { useNewUrlParser: true });

    let dbo = client.db(dbName);
    try {
      /*const res = await db.collection("usermaster").updateOne({ 
          "someKey": someValue
      }, { $set: someObj }, { upsert: true });*/
      const resultset = await dbo.collection("recipesmaster").findOne(query);
      //console.log(`res => ${JSON.stringify(resultset)}`);

      if (resultset == null) {

        res.render('pages/recipelist', { user: username, messages: 'Recipe not found', smessages: '' })
      }
      else {


        res.render('pages/edit_recipe', { user: username, smessages: 'Enjoy your Recipe', messages: "", cuisines: resultset.cuisines, ingredients: resultset.ingredients, recipes: resultset });

      }
    }
    finally {
      client.close();
    }
  })()
    .catch(err => console.error(err));

});


app.get('/recipe/:id', function (req, res) {

  var id = req.params.id;
  var o_id = new mongo.ObjectID(id);
  var query = { '_id': o_id };
  (async () => {
    let client = await MongoClient.connect(url,
      { useNewUrlParser: true });

    let dbo = client.db(dbName);
    try {
      /*const res = await db.collection("usermaster").updateOne({ 
          "someKey": someValue
      }, { $set: someObj }, { upsert: true });*/
      const resultset = await dbo.collection("recipesmaster").findOne(query);
      //console.log(`res => ${JSON.stringify(resultset)}`);

      if (resultset == null) {

        res.render('pages/recipelist', { user: username, messages: 'Recipe not found', smessages: '' })
      }
      else {


        res.render('pages/recipe', { user: username, smessages: 'Enjoy your Recipe', messages: "", cuisines: resultset.cuisines, ingredients: resultset.ingredients, recipes: resultset });

      }
    }
    finally {
      client.close();
    }
  })()
    .catch(err => console.error(err));

});




app.get('/addrecipe', function (req, res) {


  var gv_cuisines = ['Kids Meal', 'Western', 'Middle-East'];
  var gv_ingredients = ['Flour', 'Salt', 'Sugar', 'Water', 'Oil'];
  res.render('pages/add_recipe', { user: username, messages: '', smessages: '', cuisines: gv_cuisines, recipe: [], allergens: [], ingredients: gv_ingredients })

});
// when Add to Top button is clicked
app.post('/login', function (req, res) {

  username = req.body.username;
  var password = req.body.password;

  var query = { username: username };

  if (username == '' && password == '') {
    req.flash('info', 'if cats ruled the world', false)
  }
  {


    (async () => {
      let client = await MongoClient.connect(url,
        { useNewUrlParser: true });

      let dbo = client.db(dbName);
      try {
        /*const res = await db.collection("usermaster").updateOne({ 
            "someKey": someValue
        }, { $set: someObj }, { upsert: true });*/
        const resultset = await dbo.collection("usermaster").findOne(query);
        //console.log(`res => ${JSON.stringify(resultset)}`);

        if (resultset == null) {

          res.render('pages/index', { user: username, messages: 'Username not found', smessages: '' })
        }
        else {
          if (resultset.password == password) {
            let sess = req.session;
            sess.user = req.body.username;
            query = {};
            var resultset2 = await dbo.collection("recipesmaster").find({}).toArray();
            if (resultset2 == null) {

              res.render('pages/index', { user: username, messages: 'Issue loading Recipe Master data', smessages: '' })
            }
            else {

              res.render('pages/recipelist', { user: username, smessages: '', messages: "", cuisines: ['test cusines 1', 'test cusines 2'], recipes: resultset2 });
            }
          }
          else {
            res.render('pages/index', { user: username, messages: 'Please check user password', smessages: '' })
          }
        }
      }
      finally {
        client.close();
      }
    })()
      .catch(err => console.error(err));

    /*
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var query = { username: username};
     resultset = dbo.collection("usermaster").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
*/

  }
});

app.post('/signupsubmit', function (req, res) {

  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var preconfirm = req.body.preconfirm;
  if (password == preconfirm) {

    (async () => {
      let client = await MongoClient.connect(url,
        { useNewUrlParser: true });

      let dbo = client.db(dbName);
      try {
        /*const res = await db.collection("usermaster").updateOne({ 
            "someKey": someValue
        }, { $set: someObj }, { upsert: true });*/
        var record = { username: username, password: password, email: email, createdon: Date.now() };
        const resultset = await dbo.collection("usermaster").insertOne(record);
        //console.log(`res => ${JSON.stringify(resultset)}`);

        if (resultset.insertedCount != 1) {

          res.render('pages/signup', { user: username, messages: 'Issue is Signing-Up', smessages: '' })
        }
        else {

          console.log(resultset.username + " Result set");
          res.render('pages/index', { user: username, messages: "", smessages: "User Created, Please login again", cuisines: ['test cusines 1', 'test cusines 2'], recipes: ['test recipe 1', 'test reciep 2'] });


        }
      }

      finally {
        client.close();
      }
    })()
      .catch(err => console.error(err));

  }
  else {
    res.render('pages/signup', { user: username, messages: 'Issue is Signing-Up', smessages: '' })
  }


});
app.get('/logout', function (req, res) {  username = '';
        
                                         res.redirect('/') } );

app.get('/recipelist', function (req, res) {

  (async () => {
  query = {};
  if (username == null || username == '') {

    res.redirect('/home');
  }
  else {

    let client = await MongoClient.connect(url,
      { useNewUrlParser: true });

    let dbo = client.db(dbName);
    try {

    var resultset2 = await dbo.collection("recipesmaster").find({}).toArray();
    if (resultset2 == null) {

      res.render('pages/index', { user: username, messages: 'Issue loading Recipe Master data', smessages: '' })
    }
    else {

      res.render('pages/recipelist', { user: username, smessages: '', messages: "", cuisines: ['test cusines 1', 'test cusines 2'], recipes: resultset2 });
    }

    
  }
  finally {
    client.close();
  }
} } )()
  .catch(err => console.error(err));

});

app.get('/home', function(req, res) { 
  if(username=='' || username ==null || username == undefined)
  res.render('pages/index', { user: username, messages: '', smessages: '' });
  else
  res.redirect('/recipelist');
 });

app.listen(PORT, () => console.log(`Listening on ${PORT}`))

/*
app.get("/", function(req, res) { // root route or home route
res.render("home", {
    age: 16
})*/

app.post('/delete_recipe/:id', function (req, res) {
  var id = req.params.id;
  var o_id = new mongo.ObjectID(id);
  var myquery = { '_id': o_id };
  //var newvalues = { $set: {recipe_name: , address: "Canyon 123" } };

  (async () => {
    let client = await MongoClient.connect(url,
      { useNewUrlParser: true });

    let dbo = client.db(dbName);
    try {
      /*const res = await db.collection("usermaster").updateOne({ 
          "someKey": someValue
      }, { $set: someObj }, { upsert: true });*/
      const resultset = await dbo.collection("recipesmaster").deleteOne(myquery);
      //console.log(`res => ${JSON.stringify(resultset)}`);

      if (resultset == null) {

        res.render('pages/recipelist', { user: username, messages: 'Issue Deleting Recipe', smessages: '' })
      }
      else {

        query = {};
        var resultset2 = await dbo.collection("recipesmaster").find({}).toArray();
        if (resultset2 == null) {

          res.render('pages/index', { user: username, messages: 'Issue loading Recipe Master data', smessages: '' })
        }
        else {
          res.redirect('/recipelist');
          //res.render('pages/recipelist', { user: username, smessages: 'Recipe Successfully deleted', messages: "", cuisines: [], recipes: resultset2 });
        }

      }
    }
    finally {
      client.close();
    }
  })()
    .catch(err => console.error(err));



});

app.post('/insertrecipe', function (req, res) {
 const rname = req.body.recipe_name;
 const imageurl = req.body.image_url;

  var mydocument = { recipe_name: rname,image_url: imageurl,author:username,created_on:Date.now() };
  //var newvalues = { $set: {recipe_name: , address: "Canyon 123" } };

  (async () => {
    let client = await MongoClient.connect(url,
      { useNewUrlParser: true });

    let dbo = client.db(dbName);
    try {
      /*const res = await db.collection("usermaster").updateOne({ 
          "someKey": someValue
      }, { $set: someObj }, { upsert: true });*/
      const resultset = await dbo.collection("recipesmaster").insertOne(mydocument);
      //console.log(`res => ${JSON.stringify(resultset)}`);

      if (resultset == null) {

        res.render('pages/addrecipe', { user: username, messages: 'Issue adding recipe, Please try again', smessages: '' })
      }
      else {

        query = {};
        var resultset2 = await dbo.collection("recipesmaster").find({}).toArray();
        if (resultset2 == null) {

          res.render('pages/index', { user: username, messages: 'Issue loading Recipe Master data', smessages: '' })
        }
        else {

          res.render('pages/recipelist', { user: username, smessages: 'Recipe Successfully added', messages: "", cuisines: [], recipes: resultset2 });
        }

      }
    }
    finally {
      client.close();
    }
  })()
    .catch(err => console.error(err));



});

app.post('/savechanges/:id', function (req, res) {
  var id = req.params.id;
  var o_id = new mongo.ObjectID(id);
  var rname = req.body.recipe_name;
  var imageurl = req.body.image_url;
  var query = { '_id': o_id };

  var newvalues = { $set: {recipe_name: rname, image_url: imageurl} };

  (async () => {
    let client = await MongoClient.connect(url,
      { useNewUrlParser: true });

    let dbo = client.db(dbName);
    try {
      /*const res = await db.collection("usermaster").updateOne({ 
          "someKey": someValue
      }, { $set: someObj }, { upsert: true });*/
      const resultset = await dbo.collection("recipesmaster").updateOne(query,newvalues);
      //console.log(`res => ${JSON.stringify(resultset)}`);

     
          if (resultset == null) {

            res.render('pages/edit_recipe', { user: username, messages: 'Issue updating recipe', smessages: '' })
          }
          else {
            
            res.redirect('/recipelist');
            // res.render('pages/recipelist', { user: username, smessages: 'Recipe updated successfully', messages: "", cuisines: ['test cusines 1', 'test cusines 2'], recipes: resultset });
          }
        }
    
    finally {
      client.close();
    }
  })()
    .catch(err => console.error(err));



});