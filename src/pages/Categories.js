import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
const categories = useCategory();


 return (
  <Layout title={"All Categories | Paws to Whiskers"}>
    <div className="container all-categories-section">
      <h1 className="text-center mb-5 fw-bold">Explore Our Categories</h1>
      <div className="row justify-content-center">
        {categories.map((c) => (
          <div className="col-md-6 mb-4" key={c._id}>
            <Link
              to={`/category/${c.slug}`}
              className={`category-card ${c.slug}`}
            >
              <div className="category-overlay"></div>
              <div className="category-content">
                <h4>{c.name}</h4>
                <p>Discover amazing products for {c.name.toLowerCase()}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);
};

export default Categories;