declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    NEXTAUTH_SECRET: string
    NEXTAUTH_URL: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    STRIPE_SECRET_KEY: string
    STRIPE_WEBHOOK_SECRET: string
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string
    UPLOADTHING_SECRET: string
    UPLOADTHING_APP_ID: string
    MUX_TOKEN_ID: string
    MUX_TOKEN_SECRET: string
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string
  }
} 