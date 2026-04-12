# Enterprise API Spec

## Auth
POST /auth/login
POST /auth/google
POST /auth/otp

## Products
GET /products?filters
GET /products/:slug

## Cart
POST /cart/add
POST /cart/remove

## Orders
POST /orders/create
GET /orders/user

## Payments
POST /payment/razorpay/init
POST /payment/payu/init
POST /payment/webhook

## Analytics
POST /analytics/event
