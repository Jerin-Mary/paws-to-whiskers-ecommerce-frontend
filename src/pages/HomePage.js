import React, { useState, useEffect, useCallback } from 'react'
import Layout from './../components/Layout/Layout';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/HomePage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // ===== Fetch categories =====
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ===== Fetch total product count =====
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // ===== Fetch products =====
  // ===== Fetch all products =====
const getAllProducts = useCallback(async () => {
  try {
    setLoading(true);
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
    );
    setLoading(false);
    setProducts(data.products);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
}, [page]);

  // ===== Load more products =====
  const loadMore = useCallback(async () => {
  try {
    setLoading(true);
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
    );
    setLoading(false);
    setProducts(prev => [...prev, ...data.products]); // safer, uses previous state
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
}, [page]);

// ===== Watch for page changes =====
useEffect(() => {
  if (page === 1) return;
  loadMore();
}, [page, loadMore]);

  // ===== Handle filter =====
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };


 // ===== Filtered products =====
const filterProduct = useCallback(async () => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
      { checked, radio }
    );
    setProducts(data?.products);
  } catch (error) {
    console.log(error);
  }
}, [checked, radio]);

 // ===== Watch for filter changes =====
useEffect(() => {
  if (checked.length === 0 && radio.length === 0) {
    getAllProducts();
  } else {
    filterProduct();
  }
}, [checked, radio, getAllProducts, filterProduct]);

  // ===== Hero Carousel Settings =====
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  // ===== Banner Images =====
  const banners = [
    {
      img: "/images/banner-1.jpg",
      title: "Healthy, Happier Pets",
      desc: "Premium supplies and treats for your furry friends.",
      btn: "Shop Now",
    },
    {
      img: "/images/banner-2.jpg",
      title: "Everything Your Pet Needs",
      desc: "Food, toys, and accessories in one place.",
      btn: "Explore Products",
    },
    {
      img: "/images/banner-3.jpg",
      title: "New Arrivals Every Week",
      desc: "Fresh collections and exclusive deals for pet lovers.",
      btn: "Discover Now",
    },
  ];

  return (
    <Layout title={"Home | Paws To Whiskers"}>
      {/* ===== Hero Carousel ===== */}
      <section className="hero-carousel">
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div key={index} className="banner-slide">
              <img src={banner.img} alt={banner.title} className="banner-img" />
              <div className="banner-overlay">
                <h2>{banner.title}</h2>
                <p>{banner.desc}</p>
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/categories")}
                >
                  {banner.btn}
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </section>

{/* ===== Promo Cards Section ===== */}
<section className="promo-section">
  <div className="promo-card promo-orange" data-aos="fade-up">
    <div className="promo-icon">
      <i className="fas fa-truck"></i>
    </div>
    <div className="promo-text">
      <h4>Save 35%</h4>
      <p>On your first repeat delivery order</p>
    </div>
  </div>

  <div className="promo-card promo-purple" data-aos="fade-up">
    <div className="promo-icon">
      <i className="fas fa-bolt"></i>
    </div>
    <div className="promo-text">
      <h4>Latest Deals</h4>
      <p>Save up to $100/year</p>
    </div>
  </div>

  <div className="promo-card promo-blue" data-aos="fade-up">
    <div className="promo-icon">
      <i className="fas fa-star"></i>
    </div>
    <div className="promo-text">
      <h4>Top Rated Products</h4>
      <p>Recommended pet favourites</p>
    </div>
  </div>

  <div className="promo-card promo-green" data-aos="fade-up">
    <div className="promo-icon">
      <i className="fas fa-paw"></i>
    </div>
    <div className="promo-text">
      <h4>Pet Essentials</h4>
      <p>Daily care products for your pets</p>
    </div>
  </div>
</section>


{/* ===== Community & Offers Section ===== */}
<section className="community-section">
  <div className="community-card join-card" data-aos="fade-up">
    <div className="community-icon">🐱</div>
    <h4 className='community-text'>Know more about us now</h4>
    <button className="community-btn" onClick={() => navigate("/about")}>READ MORE</button>
  </div>

  <div className="community-card deal-card" data-aos="fade-up">
    <img src="/images/deal-dog.png" alt="Dog Offer" className="community-img" />
    <div className="deal-overlay">
      <h2>50% OFF</h2>
      <p>Amazing deals</p>
    </div>
  </div>

  <div className="community-card news-card" data-aos="fade-up">
    <div className="community-icon">🤙</div>
    <h4 className='news-text'>Want to connect with us?</h4>
    <button className="news-btn" onClick={() => navigate("/contact")}>CONTACT</button>
  </div>
</section>

      {/* ===== Main Content ===== */}
      <div className="container-fluid row homepage-bg" >
        <div className="col-md-2 homepage-section" data-aos="fade-up">
          <h5>Filter By Category</h5>
          <div className="d-flex flex-column homepage-filters">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                checked={checked.includes(c._id)}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h5 className="mt-4">Filter By Price</h5>
          <div className="homepage-filters d-flex flex-column ">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div className="mb-2" key={p._id} >
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column mt-3 mb-4">
            <button
              className="btn btn-danger"
              onClick={() => {
                setChecked([]);
                setRadio([]);
                getAllProducts();
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="col-md-10">
          <h1 className="text-center" data-aos="fade-up">All Products</h1>
          <div className="product-grid" data-aos="fade-up">
            {products?.map((p) => (
              <div className="product-card" key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="product-img"
                />
                <div className="product-info">
                  <h6>{p.name}</h6>
                  <p>{p.description.substring(0, 40)}...</p>
                  <p className="price">${p.price}</p>
                  <div className="buttons">
                    <button
                      className="btn-details"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn-cart"
                      onClick={() => {const updatedCart = [...cart, p];
                      setCart(updatedCart);
                      localStorage.setItem("cart", JSON.stringify(updatedCart));
                      toast.success(`${p.name} added to cart`); }} >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products && products.length < total && (
            <div className="text-center m-4">
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>

 {/* ===== Single Promo Banner Section ===== */}
<section className="single-banner-section" data-aos="fade-up">
  <div className="banner-single-overlay" data-aos="fade-up">
    <div className="banner-text-right">
      <h2>
        Pets <span className="highlight">Comfort</span> & <span className="highlight">Joy</span>
      </h2>
      <p>
        Providing premium products for dogs and cats — from nutritious food and
        fun toys to cozy essentials. Trusted, reputable, and full of love.
      </p>
      <button className="btn btn-single" onClick={() => navigate("/categories")}>
        Shop Now
      </button>
    </div>
  </div>
</section>

{/* ===== Service Highlights Section ===== */}
<section className="service-highlights container my-5">
  <div className="row g-4 text-center">
    <div className="col-md-3 col-sm-6" data-aos="fade-up">
      <div className="service-card" style={{ backgroundColor: '#DEE1FF' }}>
        <i className="fas fa-shipping-fast service-icon-p"></i>
        <h5 className="mt-3">Fast Shipping</h5>
        <p>Order by 2pm local time to get free delivery on same day.</p>
      </div>
    </div>

    <div className="col-md-3 col-sm-6" data-aos="fade-up">
      <div className="service-card" style={{ backgroundColor: '#FFE2DB' }}>
        <i className="fas fa-undo service-icon-o"></i>
        <h5 className="mt-3">Easy Returns</h5>
        <p>Customers can exchange or return products within 7 days.</p>
      </div>
    </div>

    <div className="col-md-3 col-sm-6" data-aos="fade-up">
      <div className="service-card" style={{ backgroundColor: '#DEE1FF' }}>
        <i className="fas fa-headset service-icon-p"></i>
        <h5 className="mt-3">24/7 Support</h5>
        <p>Always ready to serve you day or night. We are here for you.</p>
      </div>
    </div>

    <div className="col-md-3 col-sm-6" data-aos="fade-up">
      <div className="service-card" style={{ backgroundColor: '#FFE2DB' }}>
        <i className="fas fa-lock service-icon-o"></i>
        <h5 className="mt-3">Secure Payment</h5>
        <p>Protect customer financial information, including payments.</p>
      </div>
    </div>
  </div>
</section>
    </Layout>
  );
};

export default HomePage;