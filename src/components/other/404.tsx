import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl md:text-9xl font-bold text-center">404</h1>
      <p className="text-lg md:text-2xl font-semibold text-center mt-2">
        Sayfa bulunamadı
      </p>
    </div>
  );
};

export default NotFound;
