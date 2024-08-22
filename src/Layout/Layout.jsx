import { PiShoppingCartBold } from "react-icons/pi"
import { Link } from "react-router-dom"

import styles from "./Layout.module.css"
import { useSelector } from "react-redux"

function Layout({children}) {

    const state = useSelector(store => store.cart)

  return (
    <>
        <header className={styles.header}>
            <Link to="/Products">FSH Shop</Link>
            <div>
                <Link to="/cheackout">
                    <PiShoppingCartBold />
                </Link>
                {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
                
            </div>
        </header>
        {children}
        <footer className={styles.footer}>
            <p>Developed by Farhad with ❤️</p>
        </footer>
    </>
  )
}

export default Layout