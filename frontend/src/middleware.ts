import { NextRequest, NextResponse } from "next/server";

export async function middleware(request:NextRequest){
  try {
    const isPublicPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register'
    const token = request.cookies.get('token')?.value
    if(!token && !isPublicPage){
      return NextResponse.redirect(new URL('/login' , request.nextUrl))
    }
    if(token && isPublicPage){
      return NextResponse.redirect(new URL('/' , request.nextUrl))
    }
    return NextResponse.next()
  } catch (error) {
    return NextResponse.error()
  }
}

export const config = {
  matcher:["/" , '/login' , '/register']

}