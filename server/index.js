

/*


install libararies before using

    > yarn add mongodb express body-parser cors --save



*/



// importing the express and mongo db module
let bodyparser = require('body-parser') //
let express = require('express');       // 
let mongodb = require('mongodb')        // to handle the mongodb 

let cors = require('cors')              // to enable the multiple port communication


// create the ref, this ref is used to connect to DataBase

// let app = express.Router()

let apps = express()

apps.use(cors())        // use to connect multiple ports

apps.use(bodyparser.json())     // for getting request from body (client page)

apps.use(bodyparser.urlencoded({extended : false}));

let suresh = mongodb.MongoClient;       // to handle client request

let dbUrl = "mongodb+srv://admin:admin@miniprojects.1qdeb.mongodb.net/ngrxcrud?retryWrites=true&w=majority"     // database link

apps.get('/', (req,res)=>{      // just dummy to check localhost:3000
    res.send('working')
})

apps.get("/api/details" , (req,res)=>{      // to get all the data from database localhost:300/api/details
    suresh.connect( dbUrl , (err,conn)=>{
        if(err) throw err;
        else{
            let db = conn.db('ngrxcrud')
            db.collection('details').find().toArray((err,array)=>{
                if(err) throw err;
                else{
                    res.send(array)
                }
            })
        }
    } )

})  


apps.post('/api/details' , (req,res) => {       // to post the data using localhost:300/api/details

    
    suresh.connect( dbUrl , (err,conn)=>{
        if(err) throw err;
            else{
                let db =conn.db('ngrxcrud')
                
                db.collection('details').insertOne(
                    {
                    'id':req.body.id,
                    'name':req.body.name,
                    'email':req.body.email,
                    'phone':req.body.phone,
                    'address' : req.body.address,
                    'state':req.body.state,
                    'pincode':req.body.pincode
                    }
                    , (err,result)=>{
                        if(err) throw err;
                        else{
                            res.send({insert :'success'})
                        }
                    }
                )
            }
            
            
        })
})

apps.put('/api/details/:id' , (req,res)=>{ // used to update based on id : localhost:300/api/details

    suresh.connect( dbUrl , (err,conn)=>{
        if(err) throw err;
        else{
            let db = conn.db('ngrxcrud')
            db.collection('details').updateOne(
                {"id" : parseInt(req.params.id)},{$set : {"name" : req.body.name ,
                                              "email" : req.body.email ,
                                              "phone" : req.body.phone, 
                                              "address" : req.body.address ,
                                              "state" : req.body.state ,
                                              "pincode" : req.body.pincode}},
                (err,result)=>
                {
                    if(err) throw err;
                    else{
                        res.send({'update' : 'success'})
                    }
                }
            )
        }
    })
})


apps.delete("/api/details/:id" , (req,res)=> {      // used to delete data using id
    suresh.connect(dbUrl, (err,conn)=>{
        if(err) throw err;
        else{
            let db =conn.db('ngrxcrud')
            db.collection('details').deleteOne(
            {
                'id':parseInt(req.params.id)
                
            },(err,result)=>{
                if(err) throw err;
                else{
                    res.send({'delete' : 'success'});
                }
            })
        }
    })
})

apps.get("/api/details/:id", (req,res)=>{       // to get a perticular data using id localhost:3000/api/details/
    suresh.connect( dbUrl , (err,conn)=>{
        if(err) throw err;
        else{
            let db = conn.db('ngrxcrud')
            db.collection('details').find().toArray((err,array)=>{
                if(err) throw err;
                else{
                    
                    let result = array.find(c => c.id === parseInt(req.params.id))
                    res.send(result)

                    // let result = array.find(c => {
                    //     if(c.id === parseInt(req.params.id)){
                    //        return res.send(result)
                    //     }
                    //     else{
                    //         if(!c.id) return res.status(404).send('there was no such fucking id available')
                    //     }
                    // })
                }
            })
        }
    })
})


const port = process.env.PORT || 3000;

apps.listen(port , ()=> console.log(`listening to port ${port}...`))