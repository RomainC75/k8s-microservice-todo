#!/usr/bin/env node

import app from '../app'
import dotenv from 'dotenv'
dotenv.config()
require('../db/index')

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.listen(port,()=>console.log(`==>listening on port : ${port}`))

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
      return port;
  }
  return false;
}
