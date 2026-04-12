# Enterprise Architecture

## Layers
- CDN (images, 3D)
- Next.js (SSR/SSG/ISR)
- API Gateway
- Node.js Services
- MongoDB Cluster

## Add-ons
- Redis (caching)
- Queue (BullMQ for orders/events)
- Logging (Winston)
- Monitoring (Prometheus)

## Flow
Client → CDN → Next.js → API → Services → DB
