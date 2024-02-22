import React from 'react'
import LoginForm from '@/components/ui/forms/LoginForm'
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { authActions } from '@/store/auth-slice'
import { login } from '@/services/services'
import { useRouter } from 'next/router'


const Login = () => {

  const dispatch = useDispatch();

  const router = useRouter();

  const {mutate:Login,isLoading} = useMutation({
      // mutationKey:["login"],
      mutationFn:(user_details)=>{
        //console.log(user_details)
        return login(user_details)
      }
        ,
      onSuccess:(res)=>{
          const token = res?.data?.token
          //console.log(token)
          dispatch(authActions?.login({token}))
          router?.replace('/')
      },
      onError:(err)=>{
        //console.log(err)
      }
  })
  return (
    <LoginForm Login={Login} isLoading={isLoading}/>
  )
}

export default Login