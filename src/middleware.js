import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {

    const token = request?.cookies.get('token')

    const { pathname } = request.nextUrl

    //console.log(pathname)

    if(!token){

        if(pathname === '/authenticate/login' ){

            return NextResponse.next()
        }
        if(pathname === '/authenticate/register' ){

            return NextResponse.next()
        }

        else{

            return NextResponse.redirect(new URL('/authenticate/login', request.url))
            
        }
 
    }
    else{
        return NextResponse.next()
    }
  
  

}
 
// See "Matching Paths" below to learn more
export const config = {



    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }