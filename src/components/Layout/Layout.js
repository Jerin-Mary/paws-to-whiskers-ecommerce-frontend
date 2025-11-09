import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';
import ScrollToTopButton from "./ScrollToTopButton";


const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: '70vh' }}>
        <Toaster />
        {children}

      </main>
       <ScrollToTopButton />

      <Footer/>
    </>
  );
};


Layout.defaultProps = {
  title: "Paws To Whiskers | Pet Products",
  description: "MERN Stack Project",
  keywords: "mern, react, node, mongodb, pet, ecommerce",
  author:"JerinM",
};

export default Layout;