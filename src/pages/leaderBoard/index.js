import Image from 'next/image'
import React from 'react'
import { getLeaderBoard } from '@/services/services'
import { useQuery } from 'react-query'
import Cookies from 'universal-cookie'
import { useRouter } from "next/router";

const cookie = new Cookies()
const token = cookie.get("token")
console.log(token)

const LeaderBoard = () => {


  const router = useRouter()

  const { data: results } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => getLeaderBoard(token),
    enabled: !!token
  })

  console.log(results)

  return (
    <>
      <button
        type="button"
        className=" absolute right-36 top-5 py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-auto transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        onClick={() => router?.push('/')}
      >
        Play
      </button>
      <div className="container max-w-3xl px-4 mx-auto sm:px-8">
        <div className="py-8">
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className=" inline-block min-w-full overflow-hidden rounded-lg shadow">

              <table className="min-w-full leading-normal">
                <thead>
                  <tr>

                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left  uppercase  border-b border-gray-200">
                      Player
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left  uppercase border-b border-gray-200">
                      Rank
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left  uppercase  border-b border-gray-200">
                      Score
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {
                    results?.data?.map((player, index) => {
                      return (
                        <>
                          <tr>
                            <td className="px-5 py-5 text-sm border-b border-gray-200">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">
                                  <a href="#" className="relative block">
                                    <img alt="profil" src="/player.jpg" className="mx-auto object-cover rounded-full h-10 w-10  " />
                                  </a>
                                </div>
                                <div className="ml-3">
                                  <p className=" whitespace-no-wrap">
                                    {player?.value?.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 text-sm border-b border-gray-200">
                              <p className=" whitespace-no-wrap">
                                {index + 1}
                              </p>
                            </td>
                            <td className="px-5 py-5 text-sm border-b border-gray-200">
                              <p className=" whitespace-no-wrap">
                                {player?.value?.score}
                              </p>
                            </td>
                          </tr>
                        </>

                      )
                    })
                  }


                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>


  )
}

export default LeaderBoard