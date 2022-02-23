import express from 'express'; //need install @types/node @types/express

const app = express();

const port = process.env['PORT'] || 5000;

app.listen(port, () => {
    console.log(`Server was started on PORT: ${port} http://localhost:${port}`);
});
