import { React } from "react";
import Cart from "./Cart";
import { useEffect,useState} from "react";
import "./Carts.css"
import Counter from "./Counter";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";



function Carts() {
  const carro = useSelector((state) => state?.cart.stock)
  console.log(carro,'esto es el carro')
  let cart;
  
  cart = localStorage.getItem("cart");
  
  const [product, setProduct] = useState(JSON.parse(cart));

useEffect(() => {
    const cart2= localStorage.getItem("cart");
   // const product2 = JSON.parse(cart2);

}, [cart])
 
  function handleDelete(id) {
    // console.log(id,'soy el id')
    // e.preventDefault();
    // dispatch(deleteCart(id))
    const filter = product.filter((f) => f.id !== id);
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(filter));
    setProduct(filter)
    // console.log(product,'soy el produc actualizado')

    // const pro = localStorage.getItem(cart);
  }
  
  
 

  const [count, setCount] = useState(1);

  // let contador2 = product.filter((e) => e.id === id);
  // console.log(contador2[0].quantity, "con2");

  function counter(e,id) {
    e.preventDefault();
    const { name } = e.target;

    if (name === "mas") {
      if (product.find((p) => p.id === id).quantity < carro) {
        product.find((p) => p.id === id).quantity += 1;
        let contador = product.filter((e) => e.id === id);

        setCount(contador[0].quantity);

        localStorage.setItem("cart", JSON.stringify(product));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No hay más stock!",
          
        });
      }
    } else if (name === "menos") {
      if (
        product.find((p) => p.id === id).quantity <= carro &&
        product.find((p) => p.id === id).quantity > 1
      ) {
        product.find((p) => p.id === id).quantity -= 1;

        let contador = product.filter((e) => e.id === id);

        setCount(contador[0].quantity);

        localStorage.setItem("cart", JSON.stringify(product));
      }
    }
  }

  
  return (
    <>
      <div>
        {product?.length
          ? product?.map((e) => (
            
            <Cart
                
                counter={counter}
                product={product}
                handleDelete={handleDelete}
                carro={e.carro}
                price={e.price}
                id={e.id}
                key={e.id}
                name={e.name}
                image={e.image}
                brandName={e.brand?.name}
              />
            ))
          : "Tu carrito está vacío"}
      </div>
      <Counter product={product} />
    </>
  );
}

export default Carts;
