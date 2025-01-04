import { NextResponse } from "next/server";
import { auth } from "@/app/_lib/auth";

// export function middleware(request) {
//   console.log("Request", request);

//   return NextResponse.redirect(new URL("/about", request.url));
// }

export const middleware = auth;

//Protected page
export const config = {
  matcher: ["/account"],
};
