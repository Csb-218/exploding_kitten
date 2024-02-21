// User Login
import axios from "axios"


export async function register(user_details){

    const options = {
        url : 'http://localhost:2323/player/register',
        method : 'post',
        data : user_details
    }

    const res = await axios.request(options)

    return res

}




export async function login(user_details){

    const options = {
        url : 'http://localhost:2323/player/login',
        method : 'post',
        data : user_details
    }

    const res = await axios.request(options)

    return res

}

export async function getCards(count){
    const options = {
        url : count ? `http://localhost:2323/cards/${count}` : `http://localhost:2323/cards`,
        method : 'get',
    }

    const res = await axios.request(options)
    return res
}

export async function updateScore(score,token){

    const options = {
        url : `http://localhost:2323/player/score/update`,
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
        url : `http://localhost:2323/leaderboard`,
        method : 'get',
        headers:{
            authorization : token
        }
    }

    const res = await axios.request(options)
    console.log(res)
    return res
}