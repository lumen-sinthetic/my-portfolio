import { routing } from "@core/locale/i18n/routing";
import { middleware } from "@shared/lib/middlewares/middlewares";
import createMiddleware from "next-intl/middleware";

const intlMiddlewareHandler = createMiddleware(routing);

export const intlMiddleware = middleware((_, req) => {
  // console.log("Middleware is running");

  return intlMiddlewareHandler(req);
});
