const express = require('express')
const path = require('path')
const app = express()
const port = 3000;

const replica_app = process.env.APP_NAME


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
    console.log(`request served by ${replica_app}`)
})

app.listen(port, () => {
    console.log(`${replica_app} running on port ${port}`)
})