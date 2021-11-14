import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const posts = new Array();

app.use(cors());
app.use(bodyParser.json());


app.get('/user', async (req, res) => {

  res.json(posts);
});

app.post('/user/post', async (req, res) => {
  const { password, email} = await req.body;
  const result = {
    email,
    password
  }

  console.log(req.body);
  console.log(email);
  console.log(posts);
  
  posts.push(result);
  res.json(posts);
});

app.get('/user/clear', async (req, res) => {
  while (posts.length) {
    posts.pop();
  }
  res.json(posts);
});

const server = app.listen(3000);