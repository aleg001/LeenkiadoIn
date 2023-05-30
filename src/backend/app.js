const express = require('express')
const cors = require('cors')
const driver = require('./neo4jService')

const app = express()
app.use(cors())

app.get('/test', async (req, res) => {
  const session = driver.session()

  try {
    const result = await session.run('MATCH (n) RETURN n LIMIT 1')
    res.send(result.records)
  } catch (error) {
    res.status(500).send(error)
  } finally {
    await session.close()
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))
