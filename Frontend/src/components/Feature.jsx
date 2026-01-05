import React from 'react';

const Feature = () => {
  const features = [
    { imgSrc: "https://i.postimg.cc/PrN2Y6Cv/f1.png", text: "Free Shipping" },
    { imgSrc: "https://i.postimg.cc/qvycxW4q/f2.png", text: "Online Order" },
    { imgSrc: "https://i.postimg.cc/1Rdphyz4/f3.png", text: "Save Money" },
    // { imgSrc: "https://i.postimg.cc/GpYc2JFZ/f4.png", text: "Promotions" },
    { imgSrc: "https://i.postimg.cc/4yFCwmv6/f5.png", text: "Happy Sell" },
    { imgSrc: "https://i.postimg.cc/gJN1knTC/f6.png", text: "F24/7 Support" }
  ];

  return (
    <section id="feature" className="section-p1">
      {features.map((feature, index) => (
        <div className="fe-box" key={index}>
          <img src={feature.imgSrc} alt={feature.text} />
          <h6>{feature.text}</h6>
        </div>
      ))}
    </section>
  );
}

export default Feature;
