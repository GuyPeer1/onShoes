const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const rfidService = require('./services/rfid.service.js')
const nexmosphereService = require('./services/nexmosphere.service.js')

const app = express()
const http = require('http').createServer(app)

app.use(cookieParser())
app.use(express.json())


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const dataRoutes = require('./api/data/data.routes.js')
const {setupSocketAPI} = require('./services/socket.service')

// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware.js')
app.all('*', setupAsyncLocalStorage)

app.use('/api/data', dataRoutes)
setupSocketAPI(http)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})