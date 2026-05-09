import React from "react";
import "flowbite";
import Card from "./components/Card";

const App = () => {
  const cardData = [
    {
      imgLink:
        "https://images.unsplash.com/photo-1773227881000-07b791984bf1?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Streamlining your design process today. 1",
      desc: "In today’s fast-paced digital landscape, fostering seamless collaboration among Developers and IT Operations.",
      cta: "Read More",
    },
    {
      imgLink:
        "https://images.unsplash.com/photo-1773227881000-07b791984bf1?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Streamlining your design process today. 2",
      desc: "In today’s fast-paced digital landscape, fostering seamless collaboration among Developers and IT Operations.",
      cta: "Read More",
    },
    {
      imgLink:
        "https://images.unsplash.com/photo-1773227881000-07b791984bf1?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Streamlining your design process today. 3",
      desc: "In today’s fast-paced digital landscape, fostering seamless collaboration among Developers and IT Operations.",
      cta: "Read More",
    },
    {
      imgLink:
        "https://images.unsplash.com/photo-1773227881000-07b791984bf1?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Streamlining your design process today. 4",
      desc: "In today’s fast-paced digital landscape, fostering seamless collaboration among Developers and IT Operations.",
      cta: "Read More",
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
