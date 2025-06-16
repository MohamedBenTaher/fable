import { env } from "@/env";
import { assertAuthenticated } from "@/lib/session";
import { createServerActionProcedure } from "zsa";
import { PublicError } from "../use-cases/errors";

interface ErrorWithCode extends Error {
  code?: string;
}

function shapeErrors(args: { err: unknown; typedData: unknown; ctx: unknown }) {
  const { err } = args;
  const isDev = env.NODE_ENV === "development";
  if (err instanceof PublicError) {
    console.error(err);
    return {
      code: (err as ErrorWithCode).code ?? "ERROR",
      message: `${isDev ? "DEV ONLY ENABLED - " : ""}${err.message}`,
    };
  } else if (isDev && err instanceof Error) {
    console.error(err);
    return {
      code: (err as ErrorWithCode).code ?? "ERROR",
      message: `DEV ONLY ENABLED - ${err.message}`,
    };
  } else {
    return {
      code: "ERROR",
      message: "Something went wrong",
    };
  }
}

export const authenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    const user = await assertAuthenticated();
    return { user };
  });

export const unauthenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    return { user: undefined };
  });
