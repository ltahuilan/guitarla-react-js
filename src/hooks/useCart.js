import { useState, useEffect, useMemo} from "react"
import { db } from "../data/db"


export const useCart = () => {
    
    const initialCart = () => {
        const data = localStorage.getItem( 'cart-guitarla' )
        return data ? JSON.parse(data) : []
    }

    //state
    const [data, setData] = useState(db)
    const [cart, setCart] = useState(initialCart)

    //state derivado
    const isEmpty = useMemo(() => cart.length === 0) 
    const total = useMemo( () => cart.reduce( (subtotal, item) => subtotal + (item.quantity * item.price), 0) )

    useEffect( () => {
        localStorage.setItem( 'cart-guitarla', JSON.stringify(cart) );
    }, [cart])

    const MIN_QUANTITY = 1
    const MAX_QUANTITY = 5

    function addToCart(guitar) {

        setCart( prevCart => {
            const itemIndex = prevCart.findIndex( item => item.id === guitar.id)
            // item ya existe
            if(itemIndex >= 0) {
                const item = prevCart[itemIndex];
                // no incrementar si esta en el máximo
                if(item.quantity >= MAX_QUANTITY) {
                    return prevCart
                }
                return prevCart.map( (item, index) => 
                    index === itemIndex ? {...item, quantity: item.quantity +1 } : item
                )
            }
            // sin no existe: agregar
            return [...prevCart, {...guitar, quantity: 1}]
        })

        // //si existe devuelve -1, de lo contrario su posición
        // const itemExist = cart.findIndex( item => item.id == guitar.id) //destructuring ({id}) => id
        // if(itemExist >= 0) {
        //     const updatedCart = [...cart]
        //     if(updatedCart[itemExist].quantity < MAX_QUANTITY) {
        //         updatedCart[itemExist].quantity++
        //         setCart(updatedCart)
        //     }
        // } else {
        //     guitar.quantity = 1
        //     setCart( [...cart, guitar] )
        // }
    }

    function decreaceQuantity(id) {
        setCart(prevCart => prevCart.map( (item) => {   //prevCart representa el estado actual de react
            if(item.id === id && item.quantity > MIN_QUANTITY) {
                return {
                    ...item,
                    quantity: item.quantity-1
                }
            }
            return item;
        }));

        // const updatedCart = cart.map((item) => {
        //     if(item.id == id && item.quantity > MIN_QUANTITY) {
        //         return {...item, quantity: item.quantity--};
        //     }
        //     return item;
        // })
    }

    function increaceQuantity(id) {
        setCart( prevCart => prevCart.map( (item) => {
            if(item.id === id && item.quantity < MAX_QUANTITY) {
                return {
                    ...item, 
                    quantity: item.quantity+1
                }
            }
            return item
        }));
    }

    function deleteItem(id) {
        const updatedCart = cart.filter(item => item.id != id)
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }

    return {
        data,
        cart,
        isEmpty,
        total,
        addToCart,
        decreaceQuantity,
        increaceQuantity,
        deleteItem,
        clearCart
    }
}