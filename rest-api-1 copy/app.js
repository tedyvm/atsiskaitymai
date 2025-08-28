import express from 'express'
import apiRoutes from './routes/apiRoutes.js'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())
app.use(express.static('public'))

const dbURI = 'mongodb+srv://vcs:Test1234@vcs.fpqdkcz.mongodb.net/restapi';
mongoose.connect(dbURI)
    .then(result => app.listen(3002))
    .catch(err => console.log(err))

app.set('view engine', 'ejs')

// routes
app.use('/api', apiRoutes)
app.get('/', (req, res) => res.render('home'));
