const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../errors/not-found-error');
const {
  createUser, login, signout,
} = require('../controllers/users');
const {
  registrationValidator,
  loginValidator,
} = require('../validators/validator');

app.post('/signup', registrationValidator, createUser);
app.post('/signin', loginValidator, login);
app.get('/signout', signout);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый URL не существует.'));
});

module.exports = router;
