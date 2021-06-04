const jsonServer = require('json-server');
jsonServer.defaults({ noCors: true })

const auth = require('json-server-auth');
const app = jsonServer.create();
const router = jsonServer.router('db.json');
const { rewriter } = require('json-server-auth/dist/guards')
const rules = rewriter({
  user: 660
})

//var cors = require('cors');  
//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

const server = app.listen(3001)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});


const io = require('socket.io')(server, { origins: 'http://localhost:3000'});

io.on('connection', function (socket) {
  console.log('connected socket')
});




app.use(rules)
app.db = router.db
app.use(auth)
app.get('/user', (req, res, next) => {
  const { email } = req.claims
  const { db } = req.app
  const user = Object.assign({}, db.get('users').find({ email }).value())
  delete user.password
  res.json({ user })
})
app.use(router)
// app.listen(3001)
console.log('API server started on port 3001')