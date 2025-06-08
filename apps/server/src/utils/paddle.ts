import { Environment, LogLevel, Paddle } from "@paddle/paddle-node-sdk";

const paddle = new Paddle(
  "pdl_sdbx_apikey_01jx5v13hgfcnsrdj2xj4dma2w_j0GBgx7EMXf2JEfJnYpWWn_ASz",
  {
    environment: Environment.sandbox, // or Environment.sandbox for accessing sandbox API
    logLevel: LogLevel.verbose, // or LogLevel.error for less verbose logging
  }
);

export { paddle };
