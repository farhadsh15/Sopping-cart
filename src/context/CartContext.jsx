import { useContext, useReducer } from "react";
import { createContext } from "react";
import { sumProducts } from "../helpers/helper";

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};

const reducer = (state, { type, payload }) => {
  console.log(type, payload)
  switch (type) {
    case "ADD_ITEM":
      if (!state.selectedItems.find((item) => item.id === payload.id)) {
        state.selectedItems.push({ ...payload, quantity: 1 });
      }
      return {
        ...state,
        ...sumProducts(state.selectedItems),
        checkout: false,
      };
    case "REMOVE_ITEM":
      const newSelectesItems = state.selectedItems.filter(
        (item) => item.id !== payload.id
      );

      return {
        ...state,
        selectedItems: [...newSelectesItems],
        ...sumProducts(newSelectesItems),
      };
    case "INCREASE":
      // console.log("first")
      const increaseIndex = state.selectedItems.findIndex(
        (item) => item.id === payload.id
      );
      state.selectedItems[increaseIndex].quantity++;
      return {
        ...state,
        ...sumProducts(state.selectedItems),
      };
    case "DECREASE":
      const decreaseIndex = state.selectedItems.findIndex(
        (item) => item.id === payload.id
      );
      state.selectedItems[decreaseIndex].quantity--;
      return {
        ...state,
        ...sumProducts(state.selectedItems),
      };
    case "CHECKOUT":
      return {
        selectedItems: [],
        itemeCounter: 0,
        total: 0,
        checkout: true,
      };
    default:
      throw new Error("Invalid Action!");
  }
};

const CartContext = createContext();

function CartProvider({ children }) {
  const [state, despatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, despatch }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const { state, despatch } = useContext(CartContext);
  return [state, despatch];
};

export { useCart };
export default CartProvider;
