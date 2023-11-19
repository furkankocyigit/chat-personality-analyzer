import app from './app';

const port = process.env.PORT;
const host = process.env.HOST;
const server = app.listen(port, () => {
    console.log(`Listening on ${host}:${port}`);
});
