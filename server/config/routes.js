const authRoutes = require('../routes/auth')
const merchRoutes = require('../routes/merch');

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/merch', merchRoutes)
}
