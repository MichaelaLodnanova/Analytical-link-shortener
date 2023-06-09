import expressSession from 'express-session';

/**
 * This middleware provides session management for the application.
 * @returns session middleware
 */
const session = () =>
  expressSession({
    secret: 'abraka dabra simsala bim',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  });

export default session;
