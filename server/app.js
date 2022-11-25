const express = require('express')
const corsMiddleware = require('cors')
const PORT = process.env.PORT || 3001

const app = express()
app.use(cors())


app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`)
})