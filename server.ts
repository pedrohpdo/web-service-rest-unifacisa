import 'dotenv/config.js'

import { app } from './src/app.ts'

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`🚀 Http server running at port ${port}`)
})
