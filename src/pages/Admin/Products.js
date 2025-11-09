import React, { useState, useEffect } from 'react';
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const Products = () => {
    const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting Products");
    }
  };

//lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

return (
  <Layout title={"All Products | Admin Dashboard"}>
    <div
      className="container-fluid py-4"
    >
      <div className="row">
        {/* Left Menu */}
        <div className="col-md-3">
          <AdminMenu />
        </div>

        {/* Right Content */}
        <div className="col-md-9">
          <h1 className="text-center mb-4 fw-bold">All Products</h1>

          <div
            className="d-flex flex-wrap justify-content-start gap-3"
            style={{
              paddingBottom: "40px",
            }}
          >
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="text-decoration-none text-dark"
                style={{ flex: "1 1 260px", maxWidth: "260px" }}
              >
                <div
                  className="card shadow-sm"
                  style={{
                    height: "100%",
                    minHeight: "200px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "#f8f8fe",
                    transition: "transform 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{
                      height: "180px",
                      objectFit: "cover",
                      paddingTop: "10px",
                      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-semibold" style={{
                        fontSize: "1rem", color: "2A2A2A",}}>
                      {p.name}
                    </h5>
                    <p
                      className="card-text text-muted"
                      style={{
                        fontSize: "0.6rem",
                        lineHeight: "1.4",
                        maxHeight: "80px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.description.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
};

export default Products;