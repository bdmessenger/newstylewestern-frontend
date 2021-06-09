// Action Types
export const ADD_ITEM = 'ADD_ITEM'
export const INCREASE = 'INCREASE'
export const DECREASE = 'DECREASE'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const CLEAR = 'CLEAR'

const storeCartItems = (cartItems) => {
    const cart = cartItems.length > 0 ? cartItems : []
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const sumItems = cartItems => {
    storeCartItems(cartItems)

    return {
        itemCount: cartItems.reduce((total, product) => total + product.quantity, 0),
        total: cartItems.reduce((total, product) => total + (product.price * product.quantity), 0)
    }
}

const findCartItemIndex = (state, action) => state.cartItems.findIndex(item => (item.size === action.payload.size & item.color.name === action.payload.color.name))

const cartReducer = (state, action) => {
    switch(action.type) {
        case ADD_ITEM:
            const itemIndex = findCartItemIndex(state, action)
            if (itemIndex === -1) {
                state.cartItems.push({
                    ...action.payload
                })
            } else {
                state.cartItems[itemIndex] = action.payload
            }

            return {
                ...state,
                cartItems: [...state.cartItems],
                ...sumItems(state.cartItems)
            }
        case INCREASE:
            const increaseIndex = findCartItemIndex(state, action)
            if(state.cartItems[increaseIndex].maxQuantity >= state.cartItems[increaseIndex].quantity + 1) {
                state.cartItems[increaseIndex].quantity++
            }

            return {
                ...state,
                cartItems: [...state.cartItems],
                ...sumItems(state.cartItems)
            }
        case DECREASE:
            const decreaseIndex = findCartItemIndex(state, action)

            if (state.cartItems[decreaseIndex].quantity > 1) {
                state.cartItems[decreaseIndex].quantity--
            }

            return {
                ...state,
                cartItems: [...state.cartItems],
                ...sumItems(state.cartItems)
            }
        case REMOVE_ITEM:
            const newCartItems = state.cartItems.filter(item => !(item.size === action.payload.size & item.color.name === action.payload.color.name))

            return {
                ...state,
                cartItems: [...newCartItems],
                ...sumItems(newCartItems)
            }
        case CLEAR:
            localStorage.removeItem('cart')

            return {
                cartItems: [],
                itemCount: 0,
                total: 0
            }
        default:
            return state
    }
}

export default cartReducer