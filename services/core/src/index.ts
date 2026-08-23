import express from 'express';
import { config } from './config';

const app = express();
app.use(express.json());

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'core'
  });
});

// Placeholder Gateway Route (Future integration with Studio, etc.)
app.use('/api', (req, res, next) => {
  // TODO: Implement authentication, authorization, and reverse-proxy routing to internal microservices
  res.status(501).json({
    error: 'Not Implemented',
    message: 'API Gateway boundary is initialized. Routing will be implemented during feature development.'
  });
});

// Start the server
app.listen(config.port, () => {
  console.log(`[Core] Service running on port ${config.port}`);
});
