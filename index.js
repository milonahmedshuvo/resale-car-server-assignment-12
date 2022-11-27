const express = require('express')
const { MongoClient, ServerApiVersion, MongoDBNamespace, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors')

// mdl ware 
app.use(cors())
app.use(express.json())
// database user and pass dotenv key 
require('dotenv').config()





async function run() {
    try {
        const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.hcgdznz.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

        const catagoriCollection = client.db("carDatabase").collection("catagoris")
        const productCollection = client.db("carDatabase").collection("carProducts")
        const productBookingCollection = client.db("carDatabase").collection("productBooking")
        const singupUsersCollection = client.db("carDatabase").collection("singupUsers")
        const addProductCollection = client.db("carDatabase").collection("addProduct")
        const advertiseCollection = client.db("carDatabase").collection("addAdvertiseProduct")






        app.get('/catagoris', async (req, res) => {
            const filter = {}
            const result = await catagoriCollection.find(filter).toArray()
            res.send(result)
        })


        app.get('/catagoris/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { catagori: id }
            const result = await productCollection.find(filter).toArray()
            res.send(result)
        })


        app.post('/productBooking', async (req, res) => {
            const productBooking = req.body
            console.log(productBooking)
            const result = await productBookingCollection.insertOne(productBooking)
            res.send(result)
        })










        app.get('/singupUsers/admin/:email', async (req, res) => {
            const email = req.params.email

            const query = { email: email }
            console.log(query)
            const user = await singupUsersCollection.findOne(query)
            res.send(user)
        })


        app.post('/singupUsers', async (req, res) => {
            const user = req.body
            const result = await singupUsersCollection.insertOne(user)
            res.send(result)
        })








        app.post('/addproduct', async (req, res)=>{
            const addProduct=req.body;
            const result=await addProductCollection.insertOne(addProduct)
            res.send(result)
        })

        app.post('/anyname', async (req, res)=>{
            const product=req.body;
            const result=await productCollection.insertOne(product)
            res.send(result)
        })

        app.get('/addproduct', async (req, res)=>{
            const email=req.query.email
            const filter={email:email}
            const result=await addProductCollection.find(filter).toArray()
            res.send(result)
        })


        app.delete('/addproduct/:id', async (req, res)=>{
             const id=req.params.id
             const filter={_id:ObjectId(id)}
             const result=await addProductCollection.deleteOne(filter)
             res.send(result)
        })





        app.post('/advertise', async(req, res)=>{
            const ad = req.body 
            console.log(ad)
            const result = await advertiseCollection.insertOne(ad)
            res.send(result)
        })


        

        app.get('/advertise', async(req, res)=>{
            const query = {}
            const result = await advertiseCollection.find(query).toArray()
            res.send(result)
            
          })










        app.get('/singupUsers/buyer', async (req, res) => {
            const query = {}
            const alluser = await singupUsersCollection.find(query).toArray()
            const filter = alluser.filter(user => user.role === 'Buyer')
            res.send(filter)

        })
        

        app.get('/singupUsers/seller', async (req, res) => {
            const query = {}
            const alluser = await singupUsersCollection.find(query).toArray()
            const filter = alluser.filter(user => user.role === 'Seller')
            res.send(filter)

        })

        app.delete('/singupUsers/:id', async(req, res)=>{
            const id = req.params.id 
            const query = {_id: ObjectId(id)}
            const result = await singupUsersCollection.deleteOne(query)
            res.send(result)
          })













          app.put('/singupUsers/:id', async(req, res)=>{
            const id = req.params.id 
            const filter = {_id: ObjectId(id)}
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    status: 'verfied'
                }
              }

              const result = await singupUsersCollection.updateOne(filter, updatedDoc, options)
              res.send(result)
            
          })




    }
    finally {

    }
}

run().catch((error) => console.log(error))


app.get('/', (req, res) => {
    res.send('Resale Car Server in Run!')
})

app.listen(port, () => {
    console.log(`Resale Car Server ${port}`)
})





