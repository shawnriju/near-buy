export default () => ({
  // JWT Configuration (only what you have in .env)
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
    issuer: process.env.JWT_ISSUER || 'ecommerce-api',
  },

  // Database
  database: {
    url: process.env.DATABASE_URL,
  },
});