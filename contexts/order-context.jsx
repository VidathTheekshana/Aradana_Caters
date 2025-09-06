"use client"

import { createContext, useContext, useReducer } from "react"

const OrderContext = createContext()

const orderReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id ? { ...item, quantity: Math.max(0, action.payload.quantity) } : item,
          )
          .filter((item) => item.quantity > 0),
      }

    case "CLEAR_ORDER":
      return {
        ...state,
        items: [],
      }

    case "SET_CUSTOMER_INFO":
      return {
        ...state,
        customerInfo: action.payload,
      }

    default:
      return state
  }
}

const initialState = {
  items: [],
  customerInfo: {
    name: "",
    phone: "",
    email: "",
    address: "",
    eventDate: "",
    eventType: "",
    guestCount: "",
    specialRequests: "",
  },
}

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(orderReducer, initialState)

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const clearOrder = () => {
    dispatch({ type: "CLEAR_ORDER" })
  }

  const setCustomerInfo = (info) => {
    dispatch({ type: "SET_CUSTOMER_INFO", payload: info })
  }

  const getTotal = () => {
    return state.items.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("$", ""))
      return total + price * item.quantity
    }, 0)
  }

  const getItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <OrderContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearOrder,
        setCustomerInfo,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider")
  }
  return context
}
