"use client";

import Navbar from "@/components/front/Navbar";
import React, { useState } from "react";
import Cart from "@/components/front/Cart";
import Hero from "@/components/front/Hero";
import Feature from "@/components/front/Feature";
import TrendingProducts from "@/components/front/TrendingProducts";
import Banner from "@/components/front/Banner";
import Footer from "@/components/front/Footer";

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  return (
    <main>
      <Navbar setShowCart={setShowCart} />
      {showCart && <Cart setShowCart={setShowCart} />}
      <Hero />
      <Feature />
      <TrendingProducts />
      <Banner />
      <Footer />
    </main>
  );
}
