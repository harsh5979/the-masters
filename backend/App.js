require('dotenv').config()
const express = require('express');
const ConnectMongodb = require('./db/database');
const userRouter = require('./router/User.routers')
const jobRouter = require('./router/job.routers')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express()
const port = 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.use(cookieParser())


app.get('/', (req, res) => {
    res.json({ message: 'hello is server is serving propar' })
})

app.use('/users', userRouter)
app.use('/jobs', jobRouter)

app.listen(port, () => {
    ConnectMongodb()
    console.log(`the server running at port ${port}`);
})