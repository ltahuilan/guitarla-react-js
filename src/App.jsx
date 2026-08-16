import Guitar from "./components/Guitar"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useCart } from "./hooks/useCart"

function App() {

    const {
        data,
        cart,
        total,
        isEmpty,
        addToCart,
        decreaceQuantity,
        increaceQuantity,
        deleteItem,
        clearCart
    } = useCart()
    
    

    return (
        <>
            <Header
                cart={cart}
                total={total}
                isEmpty={isEmpty}
                increaceQuantity={increaceQuantity}
                decreaceQuantity={decreaceQuantity}
                deleteItem={deleteItem}
                clearCart={clearCart}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>
                <div className="row mt-5">
                    {data.map( (guitar) => (
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </main>

            <Footer />

        </>
    )
}

export default App
