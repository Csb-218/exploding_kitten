import { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import FlipCard from "@/components/ui/cards/FlipCard";
import { useMutation, useQuery } from "react-query";
import { getCards, updateScore } from "@/services/services";
import { useDispatch, useSelector } from "react-redux";
import { cardActions } from "@/store/card-slice";
import { useRouter } from "next/router";
import Defuse from "@/components/ui/modals/Defuse";
import RestartMatch from "@/components/ui/modals/RestartMatch";
import Confetti from 'react-confetti'

const inter = Inter({ subsets: ["latin"] });

let firstRender = true

export default function Home() {

  const router = useRouter()
  const dispatch = useDispatch()

  const token = useSelector(state => state.auth.token)

  const { mutate: LoadCards } = useMutation({
    mutationKey: ['key'],
    mutationFn: () => getCards(),
    onSuccess: (data) => {
      //console.log(data?.data)
      dispatch(cardActions.store({ cards: data?.data?.cards }))
    }
  })

  const { mutate: AddCards } = useMutation({
    mutationKey: ['add'],
    mutationFn: (count) => getCards(count),
    onSuccess: (data) => {
      //console.log(data?.data)
      dispatch(cardActions.addCards({ cards: data?.data?.cards }))
    }
  })

  const { mutate: Win } = useMutation({
    mutationKey: ['update'],
    mutationFn: () => updateScore(100, token),
    onSuccess: () => {
      //console.log(data?.data)
      //console.log('score updated !')
    }
  })


  const restart = useSelector(state => state.cards.restart)
  const toggleDefusal = useSelector(state => state.cards.toggleDiffuse)
  const deck = useSelector(state => state.cards.deck)
  const pickedCard = useSelector(state => state.cards.PickedCard)


  useEffect(() => {

    let out;

    if (pickedCard?.card === 'cat') {
      out = setTimeout(() => {
        dispatch(cardActions.removeCard(pickedCard))

      }, 1000)

    }
    if (pickedCard?.card === 'defuse') {
      out = setTimeout(() => {
        dispatch(cardActions.toggle())
      }, 1000)
    }
    if (pickedCard?.card === 'bomb') {
      out = setTimeout(() => {
        dispatch(cardActions.restartGame())
      }, 1000)
    }
    if (pickedCard?.card === 'shuffle') {

      out = setTimeout(() => {
        if (deck?.length === 5) {
          return
        }
        else {
          const newCards = 5 - deck?.length
          //console.log(newCards)
          AddCards(newCards)
        }

      }, 1000)
    }


    return () => {
      clearTimeout(out)
    }

  }, [pickedCard, dispatch, LoadCards, AddCards])



  useEffect(() => {
    if (firstRender) {
      firstRender = false
      return
    }

    LoadCards()

  }, [])


  return (
    <>

      <button 
      type="button" 
      className=" absolute right-32 top-5 py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-auto transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
      onClick={()=>router?.push('/leaderBoard')}
      >
        LeaderBoard
      </button>


      <main className='p-5 grid grid-cols-1 gap-y-10 justify-items-center'>

        <div className="flex justify-center space-x-4 ">
          <p className='font-mono text-5xl text-lime-300 py-5'>Exploding Kitten</p>
          <Image src={'/cat.png'} alt="" height={100} width={100} />
        </div>

        <div className='text-left w-1/2'>
          Rules :
          <p> If the card drawn from the deck is a cat card, then the card is removed from the deck.</p>
          <p> If the card is exploding kitten (bomb) then the player loses the game.</p>- If the card is exploding kitten (bomb) then the player loses the game.
          <p> If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.</p>
          <p> If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.</p>
        </div>

        <div className='flex flex-row space-x-4 justify-center '>
          {
            deck ?

              deck?.map((card, index) => <FlipCard key={index} card={card} />)
              :
              [1, 2, 3, 4, 5].map((card, index) => <FlipCard key={index} />)
          }
        </div>

        {
          toggleDefusal && <Defuse />
        }
        {
          restart && <RestartMatch LoadCards={LoadCards} />
        }
        {
          deck?.length === 0 && <RestartMatch LoadCards={LoadCards} Win={Win} />
        }



      </main>

      {
        deck?.length === 0 &&

        <Confetti
          width={2000}
          height={1000}
        />
      }


    </>
  );
}
