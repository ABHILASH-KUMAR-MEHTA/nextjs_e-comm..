const Banner = () => {
  return (
    <div className="container mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-[60%,40%] px-10 gap-4">
        {/* Left Banner */}
        <div
          className="h-[200px] md:h-[260px] bg-[url('/product-banner-1.jpg')] bg-cover 
          bg-center rounded-xl p-8 md:p-16 flex flex-col justify-between"
        >
          <div>
            <p className="text-xl font-medium text-topHeadingSecondary">
              Sale 20% off all store
            </p>
            <h2 className="text-xl sm:text-3xl font-bold text-topHeadingPrimary max-w-[240px]">
              Smartphone BLU 691 Pro 2023
            </h2>
          </div>
          <a
            className="mt-6 text-accent hover:underline font-medium self-start"
            href="#"
          >
            Shop Now
          </a>
        </div>

        {/* Right Banner */}
        <div
          className="h-[200px] md:h-[260px] lg:h-auto bg-[url('/product-banner-2.jpg')] bg-cover 
          bg-right rounded-xl hidden lg:block"
        />
      </div>
    </div>
  );
};

export default Banner;
