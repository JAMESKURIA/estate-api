export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: string;
      DB_HOST: string;
      DB_USER: string;
      DB_PASS: string;
      DB_NAME: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      ENCRYPTION_KEY: string;
    }
  }
}
