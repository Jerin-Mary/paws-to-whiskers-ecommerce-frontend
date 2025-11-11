import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
      total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

 //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
 const handlePayment = async () => {
  try {
    setLoading(true);
    const { nonce } = await instance.requestPaymentMethod();
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
      { nonce, cart }
    );

    setLoading(false);

    if (data?.success) {
      toast.success("Payment Completed Successfully");
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
    } else {
      toast.error("Payment failed. Please try again.");
    }
  } catch (error) {
    console.error("Payment error:", error);
    toast.error("Something went wrong during payment");
    setLoading(false);
  }
};


  return (
    <Layout title={"Cart | Paws To Whiskers"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">

          {/* Cart Items Section */}
          <div className="col-md-7 mb-4 mt-3">
           {cart?.map((p, index) => (
  <div className="row align-items-center mb-3 p-2 card flex-row" key={`${p._id}-${index}`}
    style={{ borderRadius: "10px" }}>
      
              <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="img-fluid rounded"
                    alt={p.name}
                    style={{ maxHeight: "160px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-center">
                  <p className="mb-1 fw-semibold">{p.name}</p>
                  {/* <p>{p.description.substring(0, 30)}</p> */}
                  <p className="mb-1">Price : ${p.price}</p>
                  <button
                    className="btn btn-sm btn-danger mt-2 align-self-start"
                    onClick={() => removeCartItem(p._id)}
                  > Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

            {/* Checkout Section */}
          <div className="col-md-5 text-center mt-3 mb-3">
            <div className="card p-3 shadow-sm">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h3 className="mb-3" >Total : {totalPrice()} </h3>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h5>Current Address</h5>
                  <p className="text-muted">{auth?.user?.address}</p>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}

{/* payment checkout */}
 <div className="mt-2">
 {!clientToken || !cart?.length ? ("") : (<>
    <DropIn
     options={{
     authorization: clientToken,
       paypal:false,}}
            onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;