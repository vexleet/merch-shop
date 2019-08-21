const authRoutes = require('../routes/auth')
const merchRoutes = require('../routes/merch');
const contactRoutes = require('../routes/contact');

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/merch', merchRoutes)
  app.use('/contact', contactRoutes)
}