const express = require('express')
const app = express()
const port = 8000;
const path = require('path');



app.use(express.json())
app.use('/', express.static(path.join(__dirname, '../client/dist')))
app.use('/bundle', express.static(path.join(__dirname, '../client/dist/bundle.js')))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))