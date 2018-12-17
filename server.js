'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(bodyParser.json())

const distDir = path.join(__dirname, 'dist')
app.use(express.static(distDir))

// Inicializa  o servidor para aplicação
const server = app.listen(process.env.PORT || 8000, () => {
  const port = server.address().port
  /*eslint-disable */
  console.info(`Aplicação inicializada na porta: ${port}`)
})
