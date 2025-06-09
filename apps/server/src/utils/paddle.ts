import { Environment, LogLevel, Paddle } from "@paddle/paddle-node-sdk";
import { envVariables } from "./app-config";

const ENV_TO_PADDLE_ENV_MAP = {
  production: Environment.production,
  sandbox: Environment.sandbox,
};

const paddle = new Paddle(envVariables.PADDLE_API_KEY!, {
  environment:
    envVariables.PADDLE_ENV === "production"
      ? ENV_TO_PADDLE_ENV_MAP.production
      : ENV_TO_PADDLE_ENV_MAP.sandbox,
  logLevel: LogLevel.verbose,
});

export { paddle };
