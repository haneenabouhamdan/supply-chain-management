export default () => ({
  port: parseInt(String(process.env.PORT), 10) || 3000,
  host: String(process.env.HOST),
  env: String(process.env.NODE_ENV),
  postgres: {
    host: String(process.env.POSTGRES_HOST),
    port: parseInt(String(process.env.POSTGRES_PORT), 10) || 5432,
    username: String(process.env.POSTGRES_USER_NAME),
    password: String(process.env.POSTGRES_PASSWORD),
    name: String(process.env.POSTGRES_DATABASE_NAME),
  },
  superUser: {
    email: process.env.SUPER_USER_EMAIL,
    password: process.env.SUPER_USER_PASSWORD,
    phone: process.env.SUPER_USER_PHONE,
  },
  jwtSecret: process.env.JWT_SECRET,
  redis: {
    host: process.env.REDIS_HOST || 'redis',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    ttl: parseInt(process.env.REDIS_TTL || '0', 10), //in milliseconds
    prefix: process.env.REDIS_PREFIX,
  },
});
