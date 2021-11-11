import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.get('/user', async (req, res) => {
  const posts = {
      "email": "amino@ami.no",
      "password": "2213sfs",
      "birthday": "1999"
  }
  res.json(posts)
})
const server = app.listen(3000)