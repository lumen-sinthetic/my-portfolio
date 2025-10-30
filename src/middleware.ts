import { intlMiddleware } from "@core/middlewares/intlMiddleware";
import { stackMiddlewares } from "@shared/lib/middlewares/middlewares";
import { setUrlMiddleware } from "@shared/lib/middlewares/setUrlMiddleware";

const middlewares = [setUrlMiddleware, intlMiddleware];

export default stackMiddlewares(middlewares);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
