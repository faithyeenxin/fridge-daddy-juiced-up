import { setupServer } from 'msw/node';
import { handlers } from './handlers';
// import { createProxyMiddleware } from 'http-proxy-middleware';

// create the msw server with mock request handlers
export const server = setupServer(...handlers);

// create the proxy middleware for backend API requests
// const apiProxy = createProxyMiddleware('/api', {
//   target: 'http://localhost:3500/',
//   changeOrigin: true,
// });
