// User Login
import axios from "axios"


export async function register(user_details){

    const options = {
        url : `${process.env.NEXT_PUBLIC_BASE_URL}/player/register`,
        method : 'post',
        data : user_details
    }

    const res = await axios.request(options)

    return res

}




export async function login(user_details){

    const options = {
        url : `${process.env.NEXT_PUBLIC_BASE_URL}/player/login`,
        method : 'post',
        data : user_details
    }

    const res = await axios.request(options)

    return res

}

export async function getCards(count){
    const options = {
        url : count ? `${process.env.NEXT_PUBLIC_BASE_URL}/cards/${count}` : `${process.env.NEXT_PUBLIC_BASE_URL}/cards`,
        method : 'get',
    }

    const res = await axios.request(options)
    console.log(res)
    return res
}

export async function updateScore(score,token){

    const options = {
        url : `${process.env.NEXT_PUBLIC_BASE_URL}/player/score/update`,
        method : 'post',
        data : {
          score : Number(score)
        },
        headers:{
            authorization : token
        }
    }

    const res = await axios.request(options)
    return res
}

export async function getLeaderBoard(token){

    const options = {
        url : `${process.env.NEXT_PUBLIC_BASE_URL}/leaderboard`,
        method : 'get',
        headers:{
            authorization : token
        }
    }

    const res = await axios.request(options)
    console.log(res)
    return res
}