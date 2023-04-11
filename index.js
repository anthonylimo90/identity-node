const express = require("express")
const sdk = require("api")("")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

sdk.auth(process.env.APIKEY)

// Get Customer Identity by Record ID

app.post("/identity-by-customer-id", )

// BVN Verification

app.post("/bvn-verify", (req, res) => {
    const customerBvn = req.body.customerBvn

    sdk.bVNverify({bnv: customerBvn})
        .then(({data}) => console.log("Data: " + data))
        .catch((err)=> console.error("Error: " + err))
})

// Bulk BVN Verification
app.post("bulk-bvn-verify", (req, res) => {
    const bnvList = req.body.bnvList

    sdk.bulkBVNVerify({bvn: bvnList})
        .then(({data}) => console.log(`Data: ${data}`))
        .catch((err) => console.error(`Something went wrong: ${err}`))
})

// Nuban Verification

// Get identity by customer ID


// Get identity by record ID

app.listen(3000, (err) => {
    if(!error) console.log("App running on port 3000")
    else console.error(`Something went wrong ${err}`)
})