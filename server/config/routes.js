const authRoutes = require('../routes/auth')
const merchRoutes = require('../routes/merch');
const contactRoutes = require('../routes/contact');
const checkoutRoutes = require('../routes/checkout');
const orderRoutes = require('../routes/order');

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/merch', merchRoutes)
  app.use('/contact', contactRoutes)
  app.use('/checkout', checkoutRoutes)
  app.use('/order', orderRoutes)
}