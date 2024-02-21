
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cardActions } from '@/store/card-slice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const FlipCard = ({ card }) => {

  const [show,setShow] = useState(false)
  const dispatch = useDispatch()
  
  const cardsFlipped = useSelector(state => state.cards.cardsFlipped)

  const pickedCard = useSelector(state => state.cards.PickedCard)

  const flip = () => {
    dispatch(cardActions.flip({ card: card }))
    setShow(true)
  }

  useEffect(()=>{
     let out = setTimeout(()=>{
      setShow(false)
     },1000)

     return ()=>{
      clearTimeout(out)

     }
  },[show])


  

  return (
    <button type='button' onClick={flip}>

      <div className="flip-card" >
        <div className={show?"flip-card-inner" :""} >
          <div className="flip-card-front">
            <p className="title">FLIP ME</p>
            {/* <p>Hover Me</p> */}
          </div>
          <div className="flip-card-back ">
            <p className="title">{card?.card}</p>
            <Image
              src={(card?.card === 'cat' && '/cool.svg') || (card?.card === 'shuffle' && '/shuffle.svg') || (card?.card === 'bomb' && '/bomb.svg') || (card?.card === 'defuse' && '/no-signboard.svg') ||''}
              height={100}
              width={100}
              alt=""
              className='mx-8'
            />

          </div>
        </div>
      </div>
    </button>

  )
}

export default FlipCard