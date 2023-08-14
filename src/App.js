import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from './components/Cart/Cart';
import CartProvider from "./store/CartProvider";

function App() {
  const [ShowCart, setIsShowCart] = useState(false);
  
  const cartClickHandler = () => {
    setIsShowCart (true);
  }

  const cartCloseHandler = () => {
    setIsShowCart (false);
  }

  return (
    <CartProvider>
      { ShowCart && <Cart onCartClose={cartCloseHandler}/>}
      <Header onCartClick={cartClickHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
