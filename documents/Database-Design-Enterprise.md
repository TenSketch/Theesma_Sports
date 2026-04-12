# Enterprise Database Design (MongoDB)

## Indexing Strategy
- Users: email (unique), phone
- Products: slug (unique), categoryId, price
- Orders: userId, createdAt, orderStatus
- Events: type, sport

## Collections (Detailed)

### Users
- _id
- name
- email
- phone
- password
- googleId
- role
- addresses[]
- createdAt
- updatedAt

### Products
- _id
- name
- slug
- description
- categoryId
- price
- offerPrice
- images[]
- model3dUrl
- stock
- variants[]
- tags[]
- seoMeta
- createdAt

### Orders
- _id
- userId
- items[]
- totalAmount
- paymentStatus
- orderStatus
- shippingProvider (Shiprocket)
- trackingId
- createdAt

### AnalyticsEvents
- _id
- userId
- eventType (view, add_to_cart, purchase)
- metadata
- createdAt
