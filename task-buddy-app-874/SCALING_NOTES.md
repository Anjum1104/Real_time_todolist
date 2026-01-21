# Scaling & Security Notes

## Architecture Overview

This application uses **Lovable Cloud** (powered by Supabase) for backend infrastructure:
- **PostgreSQL Database**: For persistent data storage
- **Authentication**: Built-in JWT-based auth with email/password
- **Row Level Security (RLS)**: Database-level access control
- **Edge Functions**: Serverless functions for backend logic

---

## Backend Scaling Strategies

### Database Scaling

1. **Horizontal Scaling**
   - Lovable Cloud automatically handles connection pooling
   - Read replicas can be added for read-heavy workloads
   - Database can be upgraded to larger instances as needed

2. **Query Optimization**
   - Indexes are created on frequently queried columns (user_id, status, priority, due_date)
   - Use pagination for large datasets (default limit is 1000 rows)
   - Consider materialized views for complex aggregations

3. **Connection Management**
   - Use connection pooling (built into Lovable Cloud)
   - Implement query timeouts for long-running operations

### API Scaling

1. **Edge Functions**
   - Serverless architecture auto-scales based on demand
   - Cold starts are minimal (~50-100ms)
   - Functions are distributed globally for low latency

2. **Rate Limiting**
   - Implement rate limiting at the Edge Function level
   - Use Redis or in-memory caching for rate limit counters
   - Consider implementing exponential backoff on client

---

## Frontend Deployment

### Static Hosting Options

1. **Lovable Built-in Hosting**
   - Automatic deployment on every commit
   - Global CDN distribution
   - SSL certificates included

2. **Custom Domain**
   - Configure custom domain in Lovable settings
   - Set up CNAME record pointing to Lovable

### Performance Optimization

1. **Code Splitting**
   - React Router handles route-based splitting
   - Use `React.lazy()` for large components

2. **Asset Optimization**
   - Images are optimized during build
   - Use WebP format where possible
   - Implement lazy loading for below-fold content

3. **Caching Strategy**
   - Static assets cached with long TTL
   - API responses cached appropriately
   - Use React Query for client-side caching

---

## JWT Security Best Practices

### Token Storage

✅ **Recommended:**
- Tokens are stored in memory (Supabase client handles this)
- Automatic token refresh before expiration
- Tokens cleared on logout

❌ **Avoid:**
- Storing tokens in localStorage (XSS vulnerable)
- Passing tokens in URL parameters
- Long-lived tokens without refresh mechanism

### Token Configuration

1. **Short Expiration**
   - Access tokens expire in 1 hour (default)
   - Refresh tokens handled automatically

2. **Token Rotation**
   - New tokens issued on refresh
   - Old tokens invalidated

3. **Scope Limitation**
   - Tokens only grant access to user's own data
   - RLS policies enforce authorization at database level

---

## Database Security

### Row Level Security (RLS)

All tables have RLS enabled with policies that:
- Users can only SELECT their own data
- Users can only INSERT data with their user_id
- Users can only UPDATE/DELETE their own records

### Security Policies

```sql
-- Example: Tasks table policies
CREATE POLICY "Users can view their own tasks"
  ON public.tasks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tasks"
  ON public.tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### Input Validation

1. **Client-side**: Zod schemas validate all inputs
2. **Server-side**: Database constraints enforce data integrity
3. **SQL Injection**: Prevented by using parameterized queries (Supabase client)

---

## Rate Limiting & Monitoring

### Rate Limiting Implementation

```typescript
// Example Edge Function rate limiting
const RATE_LIMIT = 100; // requests per minute
const RATE_WINDOW = 60000; // 1 minute in ms

const rateLimiter = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const limit = rateLimiter.get(userId);
  
  if (!limit || now > limit.resetAt) {
    rateLimiter.set(userId, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  
  if (limit.count >= RATE_LIMIT) {
    return false;
  }
  
  limit.count++;
  return true;
}
```

### Monitoring Recommendations

1. **Error Tracking**
   - Monitor failed authentication attempts
   - Track API error rates
   - Alert on unusual patterns

2. **Performance Metrics**
   - Response times per endpoint
   - Database query performance
   - Edge Function cold start frequency

3. **Security Monitoring**
   - Failed login attempts
   - Suspicious access patterns
   - Token refresh anomalies

---

## Production Checklist

### Before Launch

- [ ] Enable email confirmation (currently disabled for development)
- [ ] Configure custom domain
- [ ] Set up error monitoring
- [ ] Review and test RLS policies
- [ ] Load test critical endpoints
- [ ] Set up database backups

### Post-Launch

- [ ] Monitor error rates
- [ ] Review access logs
- [ ] Optimize slow queries
- [ ] Scale resources as needed
- [ ] Regular security audits
