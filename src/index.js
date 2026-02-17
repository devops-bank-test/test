// create an express server on port 3000 with GET / returning {status: 'ok'} and a /health endpoint returning {status: 'healthy'}


const express = require('express');
const app = express();
const port = 3000;  

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
}
);
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
}
);
app.listen(port, () => {  console.log(`Server is running on port ${port}`);
});

//hello world//