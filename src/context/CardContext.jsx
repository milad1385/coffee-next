"use client";
import {
  calculateTotalPrice,
  getLocalStorage,
  setToLocalStorage,
} from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useReducer } from "react";

const CardContext = createContext();

const initState = {
  basket: [],
  totalPrice: 0,
  withCopen: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CARD": {
      const isExistProduct = state.basket.some(
        (pro) => pro.id === action.payload.id
      );
      if (isExistProduct) {
        state.basket.some((item) => {
          if (item.id === action.payload.id) {
            item.count += 1;
            return false;
          }
        });
        setToLocalStorage(state.basket, "basket");
      } else {
        setToLocalStorage([...state.basket, action.payload], "basket");
      }
      return {
        ...state,
        basket: [...state.basket, action.payload],
        totalPrice: calculateTotalPrice(state.basket),
      };
    }

    case "REMOVE": {
      const basket = getLocalStorage("basket") || [];
      const mainCards = basket.filter((item) => item.id !== action.payload.id);
      setToLocalStorage(mainCards, "basket");
      return {
        ...state,
        basket: mainCards,
        totalPrice: calculateTotalPrice(mainCards),
      };
    }

    case "INCREASE": {
      const basket = getLocalStorage("basket") || [];
      basket.some((item) => {
        if (item.id === action.payload.id) {
          item.count += 1;
          return false;
        }
      });
      setToLocalStorage(basket, "basket");
      return {
        ...state,
        basket: basket,
        totalPrice: calculateTotalPrice(basket),
      };
    }

    case "DECREASE": {
      const basket = getLocalStorage("basket") || [];
      const mainCards = basket.map((item) => {
        if (item.id === action.payload.id) {
          if (item.count > 1) {
            item.count = item.count - 1;
          } else {
            item.count = 1;
          }
        }

        return item;
      });
      setToLocalStorage(mainCards, "basket");
      return {
        ...state,
        basket: mainCards,
        totalPrice: calculateTotalPrice(mainCards),
      };
    }

    case "LOAD": {
      const basket = getLocalStorage("basket") || [];
      return {
        ...state,
        basket: basket,
        totalPrice: calculateTotalPrice(basket),
      };
    }

    case "DISCOUNT": {
      document.cookie = `discount = ${Number(
        action.price
      )}; path=/ ;max-age=7200`;
      return {
        ...state,
        withCopen: action.price,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

function CardProvider({ children }) {
  const path = usePathname();
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    dispatch({ type: "LOAD" });
  }, [path]);
  return (
    <CardContext.Provider value={{ state, dispatch }}>
      {children}
    </CardContext.Provider>
  );
}

export function useCardContext() {
  const { state, dispatch } = useContext(CardContext);

  return { state, dispatch };
}

export default CardProvider;

// const getUserInfo = async () => {
//   const res = await fetch(`http://localhost:3000/api/auth/me`);
//   if (res.status === 401) {
//     const res = await fetch(`http://localhost:3000/api/auth/refresh`);
//     console.log("refresh response => ", res);
//     if (res.status === 200) {
//       router.refresh();
//     } else if (res.status === 401) {
//       router.replace("/login-register");
//     }
//     router.refresh();
//   }
// };
// getUserInfo();
