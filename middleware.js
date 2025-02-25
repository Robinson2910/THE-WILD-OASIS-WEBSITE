// import { NextResponse } from "next/server";

// export function middleware(request) {
//   return NextResponse.redirect(
//     new URL("/about", request.url)
//   );
// }
// export const config = {
//   matcher: ["/account", "/cabins"],
// };

import { auth } from "@/_lib/auth";

//instead of our middleware we use the middleware provide by auth.js
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
