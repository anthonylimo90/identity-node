import dotenv from 'dotenv';
import express from 'express';
import * as okra_client from 'okra-node';

dotenv.config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const identity = new okra_client.Identity(process.env.OKRA_SECRET, process.env.OKRA_ENV)

app.get("/", (req, res) => {
    res.send({message:"Hello"})
})

// BVN Verification

app.post("/bvn-verify", (req, res) => {
    const customerBvn = req.body.customerBvn

    const options = {
        bvn: customerBvn
    }

    identity.verify(options)
        .then(({data}) => {
            console.log(`Data: ${data}`)
            res.send(data)
        })
        .catch((err)=> console.error("Error: " + err))
})

// Bulk BVN Verification

app.post("/bulk-bvn-verify", (req, res) => {
    const bnvList = req.body.bnvList

    const options = {
        bvn: bnvList
    }

    sdk.bulkBVNVerify(options)
        .then(({data}) => {
            console.log(`Data: ${data}`)
            res.send(data)
        })
        .catch((err) => console.error(`Something went wrong: ${err}`))
})

// Nuban Verification

app.post("/nuban-verification", (req, res) => {
    const nubanNumber = req.body.nubanNumber
    const nubanBank = req.body.nubanBank

    const options = {
        nubanNumber: nubanNumber,
        nubanBank: nubanBank
    }

    sdk.nubanVerify(options)
        .then(({data}) => {
            console.log(`Data: ${data}`)
            res.send(data)
        })
        .catch(err => console.error(`Something went wrong: ${err}`))
})

// Get identity by customer ID

app.post("/get-by-customer-id", (req, res) => {
    
    const customerId = req.body.customerId

    const options = {
        customer: customerId
    }
    
    sdk.getidentitybycustomer(options)
        .then(({data}) => {
            console.log(`Data: ${data}`)
            res.send(data)
        })
        .catch(err => console.error(`Something went wrong: ${err}`))
})

// Start server

app.listen(3000, (err) => {
    if(!err) console.log("App running on port 3000")
    else console.error(`Something went wrong ${err}`)
})