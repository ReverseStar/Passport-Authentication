const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')

const initializePassport = require('./passport-config')
initializePassport(passport)

//Users Array
const users = []

//Middlewares
app.set('view-engine', 'ejs')
app.use(express.urlencoded({
    extended: false
}))

app.get('/', (_req, res) => {
    res.render('index.ejs', {
        name: 'D'
    })
})

//For Login
app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', (req, _res) => {

})

//For Register
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 15)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    //console.log(users);
})

const PORT = process.env.PORT || 5000
app.listen(PORT)