import app from './app';
import { EnvExporter } from './utils/EnvExporter';

const port = EnvExporter.export('PORT');
const host = EnvExporter.export('HOST');

const server = app.listen(port, () => {
    console.log(`Listening on ${host}:${port}`);
});
