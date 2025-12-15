import app, { connectDB } from './app.js';

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000;
const MAX_PORT_RETRIES = 5;

function listenOnPort(port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => resolve(server));
    server.on('error', (err) => reject(err));
  });
}

async function start() {
  try {
    await connectDB();

    let port = DEFAULT_PORT;
    for (let attempt = 0; attempt < MAX_PORT_RETRIES; attempt++) {
      try {
        const server = await listenOnPort(port);
        console.log(`Server running on port ${port}`);

        const shutdown = () => {
          server.close(() => process.exit(0));
        };
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
        return;
      } catch (err) {
        if (err && err.code === 'EADDRINUSE') {
          console.warn(`Port ${port} in use, trying port ${port + 1}...`);
          port += 1;
          // small delay before retrying
          await new Promise((r) => setTimeout(r, 200));
          continue;
        }
        throw err;
      }
    }

    console.error(`Unable to bind to a port after ${MAX_PORT_RETRIES} attempts starting at ${DEFAULT_PORT}`);
    process.exit(1);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
