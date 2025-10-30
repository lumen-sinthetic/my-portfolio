import { NextMiddleware, NextResponse } from "next/server";
import { MiddlewareContructor, MiddlewareFactory } from "./types";

export function stackMiddlewares(
  functions: MiddlewareFactory[] = []
): NextMiddleware {
  let next: NextMiddleware = () => {
    return NextResponse.next();
  };

  functions.reverse().forEach(f => {
    next = f(next);
  });

  return next;
}

export function middleware(instance: MiddlewareContructor): MiddlewareFactory {
  return next => async (req, event) => await instance(next, req, event);
}
