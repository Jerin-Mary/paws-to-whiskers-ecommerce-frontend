import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);


  // Add to Cart Function
const addToCart = (product) => {
  const newCart = [
    ...cart,
    {
      _id: product._id,
      name: product.name,
      price: product.price,
      slug: product.slug,
      photo: `${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`,
    },
  ];

  setCart(newCart);

  try {
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast.success(`${product.name} added to cart!`);
  } catch (err) {
    console.error("Error saving cart:", err);
    toast.error("Cart storage limit reached. Please remove some items.");
  }
};

 const getPrductsByCat = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  }, [params.slug]); 

  // Add getPrductsByCat to dependency array
  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug, getPrductsByCat]);

  return (
   <Layout title={`Category - ${category?.name}`}>
    <div className="category-container container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold page-heading">Category - {category?.name}</h1>
        <p className="text-muted">
          {products?.length} result{products?.length !== 1 && "s"} found
        </p>
      </div>

      <div className="row justify-content-center">
        {products?.map((p) => (
          <div key={p._id} className="col-md-6 col-lg-5 mb-4">
            <div className="category-product-card">
              <div className="product-img-fluid">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="product-img"
                />
              </div>
              <div className="product-card-body">
                <h5 className="product-title">{p.name}</h5>
                <p className="product-description">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="product-bottom">
                  <span className="product-price">₹{p.price}</span>
                  <div>
                    <button
                      className="btn-outline-primary me-2"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      View Details
                    </button>
                    <button className="btn-primary"
                      onClick={() => addToCart(p)}>
                    Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
  );
};

export default CategoryProduct;