const web = require('./routes/web.js')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
// Load Routes
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server running on port ${port}`))

app.use(express.json())

app.use('/api', web)