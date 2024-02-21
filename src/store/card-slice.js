import { createSlice } from "@reduxjs/toolkit";

const CardSlice = createSlice({
    name:"cards",
    initialState:{
        flipCount:0,
        cardsFlipped:[],
        deck:null,
        PickedCard:null,
        Defusal:'undefuse',
        toggleDiffuse:false,
        restart : false
    },
    
    reducers:{

        flip(state,action){

          const pickedCard = action.payload.card
          console.log( pickedCard )
          state.PickedCard =  pickedCard 

          pickedCard && state.flipCount++

        },

        store(state,action){
            const cards = action.payload.cards
            console.log(cards)

            
            if(cards){
                
                const array = []
                cards?.forEach((card,index) =>{
                    const Card = {
                       card : card,
                       cardId : `${index}${card}`,
                       flipped : false
                    }
                    array.push(Card)
                })
                state.deck = array
            }
            state.PickedCard =  null
            state.restart = false
        },

        addCards(state,action){
            const cards = action.payload.cards
            console.log(cards)

            if(cards){
                cards?.forEach((card,index) =>{
                    const Card = {
                       card : card,
                       cardId : `${index}${card}`,
                       flipped : false
                    }
                    state.deck.push(Card)
                })
                
            }
            
            state.PickedCard =  null
        },

        removeCard(state,action){

            const card = action.payload
            const {cardId} = card
            // const toBeRemoved = state.deck?.find(item=>card === item)

            const filteredArray = state.deck?.filter(item => item?.cardId !== cardId )
            console.log(card,cardId,filteredArray)
            state.deck = [...filteredArray]
            // state.cardsFlipped.splice(state.cardsFlipped.indexOf(state.PickedCard),1)
            state.toggleDiffuse = false
            state.PickedCard =  null
        },

        defuseBomb(state,action){


                const toBeRemoved = state.deck?.find(item =>{ return (item['card'] ==='bomb')})
                console.log(toBeRemoved)
                const filteredArray = state.deck?.filter(item => item !== toBeRemoved )
                // state.deck.splice(state.deck.indexOf(toBeRemoved),1)
                state.deck = [...filteredArray]
                state.toggleDiffuse = false
                // state.cardsFlipped.splice(state.cardsFlipped.indexOf(state.PickedCard),1)
                state.PickedCard =  null
        },

        toggle(state,action){
            state.toggleDiffuse = true
        },

        restartGame(state,action){
            state.restart = true
        }

        

        
    }
})

export const cardActions = CardSlice.actions

export default CardSlice