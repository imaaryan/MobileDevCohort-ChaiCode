import React from "react";
import "flowbite";
import Card from "./components/Card";

const App = () => {
 const cardData = [
  {
    imgLink:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2670&auto=format&fit=crop",
    title: "How Remote Teams Stay Productive Without Burnout",
    desc: "Discover practical systems used by modern startups to improve communication, reduce unnecessary meetings, and keep teams focused.",
    cta: "Read Article",
  },
  {
    imgLink:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
    title: "Why Most Startup Websites Fail to Convert",
    desc: "A breakdown of common UX mistakes that quietly kill conversions, trust, and user retention on modern business websites.",
    cta: "Explore Insights",
  },
  {
    imgLink:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop",
    title: "Building Better Products Through User Feedback",
    desc: "Learn how fast-growing companies collect meaningful feedback and turn customer pain points into product improvements.",
    cta: "Read More",
  },
  {
    imgLink:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    title: "The Future of Design Systems in Modern Teams",
    desc: "Scalable design systems help teams ship faster, maintain consistency, and reduce development overhead across products.",
    cta: "View Details",
  },
];

  return (
    <>
      <div className="p-7 flex gap-7">
        {cardData.map((data, index) => (
          <Card
            key={index}
            imgLink={data.imgLink}
            title={data.title}
            desc={data.desc}
            cta={data.cta}
          />
        ))}
      </div>
    </>
  );
};

export default App;
