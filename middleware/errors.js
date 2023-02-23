export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404).send(error)
  next(error)
}

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message?.replace(/\n/g, ''),
    ...(process.env.NODE_ENV === 'production' ? { stack: err.stack } : {}),
  })
}
