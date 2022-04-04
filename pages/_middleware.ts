import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

/** @param {import("next/server").NextRequest} req */
export async function middleware(req) {
  if (req.nextUrl.pathname === '/') {
    const session = await getToken({
      req,
      secret: process.env.SECRET as string,
    });

    if (!session) return NextResponse.redirect('/login');
  }
}

// import type { NextFetchEvent, NextRequest } from 'next/server';

// export function middleware(req: NextRequest, ev: NextFetchEvent) {}
