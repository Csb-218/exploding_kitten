import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { cardActions } from "@/store/card-slice";


const RestartMatch = ({LoadCards,Win}) => {

    const dispatch = useDispatch()

    const deck = useSelector(state => state.cards.deck)
    const handleWin = () =>{
        Win && Win()
        LoadCards(5)
    }

    return (
        <>
            
            <div className="h-screen w-screen backdrop-blur-sm absolute">
                <div className="relative top-1/3 left-1/3  overflow-hidden transition-all transform sm:align-middle sm:max-w-lg" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div>
                        <div className="rounded-lg p-0  bg-white shadow">
                            <div className="bg-white dark:bg-gray-800 rounded-lg ">
                                <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
                                    <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
                                        <span className="block">
                                            
                                            {
                                                deck?.length === 0 ?
                                                'Hurray! You Won '
                                                :
                                                'Oops You Lost 😱 !!'
                                            }
                                        </span>
                                        
                                    </h2>
                                    <div className="lg:mt-0 lg:flex-shrink-0">
                                        <div className="mt-12 inline-flex rounded-md shadow">
                                            <button type="button" 
                                            className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                            onClick={handleWin}
                                            >
                                                {
                                                    deck?.length === 0  ? 
                                                    'Play Again' 
                                                    :
                                                    'Try Again'
                                                
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>



    )
}

export default RestartMatch