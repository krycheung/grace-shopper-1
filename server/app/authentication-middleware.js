const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const err = new Error('User is not an admin!')
    next(err)
  }
}

// const isUserMiddleware = (req, res, next) => {
//   const currentUser = req.user
//   if (currentUser) {
//     next()
//   } else {
//     const err = new Error('Person is not a user!!!')
//     next(err)
//   }
// }

module.exports = {
  isAdminMiddleware
  //isUserMiddleware,
}
