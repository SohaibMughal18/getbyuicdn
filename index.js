const express = require('express');
const app = express();
 const { db } = require('./firebase');

app.use(express.urlencoded({extended:true}));
app.use(express.json()); 

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
      ];
      var tagline = "No programming concept is complete without a cute animal mascot.";
    
    res.render('pages/index', {
        mascots: mascots,
        tagline: tagline
      });
  });
 

  app.get('/editp/:id' , async(req, res,) => {
   
    res.render('pages/edit-prod',{
      id : req.params.id,
    });
    }
  )
  app.post('/editp/:id' , async(req, res,) => {
   
    console.log('in update product controller layer');
    
    const Product_id = db.collection('products').doc(req.params.id);
     await Product_id.update({
    
            prod_name : req.body.prod_name,
            prod_price:req.body.prod_price,
            prod_category:req.body.prod_category,
     });
     res.redirect('/get');
    // res.render('pages/display-tab');
    
    }
  )


  app.get('/delp/:id' , async(req, res,) => {
   
    console.log('in update product controller layer');
    
    await db.collection('products').doc(req.params.id).delete();
    res.redirect('/get');
  //  res.render('pages/display-tab');
   })
  

app.get('/addp' , async(req, res,) => {
 
  res.render('pages/add-product');
}

)
app.post('/addp' , async(req, res,) => {
  
   
  db.collection('products').add({
    prod_name: req.body.prod_name,
    prod_price: req.body.prod_price,
    prod_category: req.body.prod_category,
    
  }).then(function(ref){
    console.log(ref.id);
  })
  // res.render('pages/display-tab');
  setTimeout(() => {
    console.log("Delayed for 1 second.");
        res.redirect('/get');
      }, 1000)
    })


app.get('/get' , async(req, res,) => {
 
    // db.collection('products').get().then((doc)=>{
    //     doc.forEach((ref)=>{
    //         console.log(ref.id)
    //         console.log(ref.data().prod_category)
    //         console.log(ref.data().prod_name)
    //         console.log(ref.data().prod_price)
    //         console.log()

    //     })
    // })
    // const snapshot2 = await db.collection('products').get();
    // const col= snapshot2.docs.map((doc)=> ({id:doc.id, ...doc.data()}))
    res.render('pages/display-tab');
    // res.send("Test") ;  
    //    res.render('pages/display-tab',{
      //     col:col });
  })
  
  app.get('/get-id' , async(req, res,) => {
 
    db.collection('product').doc("XeVTDw0BkLefT9xe98zs").get()
    .then((doc)=>{
      Console.log(doc.data())
     res.send(doc.data())
    })
    // const snapshot2 = await db.collection('products').get();
    // const col= snapshot2.docs.map((doc)=> ({id:doc.id, ...doc.data()}))
    // res.send("test") ;  
    //    res.render('pages/display-tab',{
      //     col:col });
    })
    
    
    app.get('/get2' , async(req, res,) => {
     
    
        res.render('pages/dis-categ');
    
      })
    app.get('/addc' , async(req, res,) => {
      
      res.render('pages/add-categ');
    }
    )
    app.post('/addc' , async(req, res,) => {
      db.collection('categories').add({
        categ_name: req.body.categ_name,
        categ_desc: req.body.categ_desc,
        
      }).then(function(ref){
        console.log(ref.id);
      })
      setTimeout(() => {
        console.log("Delayed for 1 second.");
        res.redirect('/get2');
    }, 1000)
    }
  )
  
  const port = process.env.Port || 3000;
  app.listen(port, () => console.log(`server is listingin at port :${port}` ))
  