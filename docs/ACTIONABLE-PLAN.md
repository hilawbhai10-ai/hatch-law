# Hatch-MVP Backend: Actionable Improvement Plan

This plan summarizes key findings from the codebase review and provides concrete, prioritized actions for maintainers and developers.

---

## 1. Security & Configuration

- **[CRITICAL]** Load all secrets (JWT, Redis, DB, etc.) from environment variables. Remove hardcoded defaults.
- Set `secure: true` for cookies in production (use `process.env.NODE_ENV`).
- Audit all uses of `console.log` and replace with structured logger.
- Review and restrict CORS settings for both HTTP and Socket.io.

## 2. Error Handling & Consistency

- Implement a global Express error-handling middleware to standardize error responses.
- Refactor controllers to remove repetitive `try-catch` blocks; throw custom errors from services.
- Enforce use of custom error classes (`Error_Class`, `Error_Class2`) throughout services and repositories.
- Ensure all error codes and messages are meaningful and user-friendly.

## 3. Typing & Validation

- Define and enforce TypeScript interfaces for extended `Request` objects (user, pod context, etc.).
- Refine Zod validation schemas and ensure all input is validated at the route/middleware level.
- Consolidate and document all type extensions in a single file (e.g., `src/types/Extend_Requests.ts`).

## 4. Real-time & Socket.io

- Integrate the Socket.io Redis adapter for horizontal scaling and worker-to-server event emission.
- Move all real-time notifications (e.g., pod join/leave) to be triggered server-side after DB state changes, not relying on client emissions.
- Add heartbeat/keepalive logic to detect and clean up stale connections.
- Improve error handling in gateways; use structured logging and custom error events.

## 5. Matchmaking & Queuing

- Replace placeholder matchmaking logic with a robust, scalable algorithm (consider user preferences, pod activity, etc.).
- Monitor queue lengths, job processing times, and worker health (add logging/alerts).
- Ensure all Redis connection details are loaded from environment variables and are consistent across workers and main app.
- Decouple workers from direct Socket.io instance access; use Redis pub/sub for event broadcasting.

## 6. Pods & API Improvements

- Move pod search filtering to the database (use Prisma full-text search or `LIKE` queries).
- Implement pagination for all list endpoints (pods, members, messages).
- For invite-only/approval pods, persist invite tokens and join requests in the DB; add endpoints for approval/rejection.
- Increment pod `activityScore` on join and other relevant actions.
- Use Prisma transactions for multi-step pod operations (e.g., join + activity update).

## 7. Logging & Monitoring

- Finalize and use a production logger (Winston or similar) with log levels and file/remote transport.
- Ensure all logs include context (userId, podId, requestId).
- Remove all `console.log` statements from production code.

## 8. Testing & Quality

- Add unit and integration tests for all critical flows (auth, pod join, matchmaking, real-time events).
- Set up ESLint and Prettier with strict rules; fix all lint errors.
- Document all environment variables and configuration options in a central `docs/CONFIG.md`.

---

## Next Steps

1. Triage and assign owners for each area above.
2. Create GitHub issues or tickets for each bullet point.
3. Schedule security and error handling improvements as top priority.
4. Review and merge changes incrementally, with code review and testing.

---

**This plan should be reviewed and updated regularly as improvements are made.**
