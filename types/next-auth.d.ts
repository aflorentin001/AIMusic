import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    emailVerified?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub: string;
  }
}
