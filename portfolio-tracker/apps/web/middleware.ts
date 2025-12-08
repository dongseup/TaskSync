import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // 미들웨어 전용 Supabase 클라이언트 생성
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // 세션 확인
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 1. 로그인이 안 되어 있는데 메인 페이지("/")에 접근하려 할 때
  if (!session && req.nextUrl.pathname === '/') {
    // 로그인 페이지로 튕겨냄
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    return NextResponse.redirect(redirectUrl);
  }

  // 2. 이미 로그인 되어 있는데 로그인 페이지("/login")에 접근하려 할 때
  if (session && req.nextUrl.pathname === '/login') {
    // 메인 페이지로 보냄
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ['/', '/login'],
};