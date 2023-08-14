import "dotenv/config.js"

import app from "./src/app.js";
const port = process.env.PORT || 3000;

app.listen(port, function() {
console.log(`listening on port ${port}`);
});

