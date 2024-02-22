
import React from 'react'
import SignUpForm from '@/components/ui/forms/SignUpForm'
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { authActions } from '@/store/auth-slice'
import { register } from '@/services/services'
import { useRouter } from 'next/router'

const Register = () => {

    const router = useRouter();

    const dispatch = useDispatch();

    const { mutate: SignUp , isLoading} = useMutation({
        // mutationKey:["login"],
        mutationFn: (user_details) => register(user_details),
        onSuccess: (res) => {
            //console.log(res?.data)
            // dispatch(authActions?.login({ token }))
            router?.replace('/authenticate/login')
        }
    })
    return (
        <SignUpForm SignUp={SignUp} isLoading={isLoading}/>
    )
}

export default Register