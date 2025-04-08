import HeroSection from "./components/Hero";
import Highlight from "./components/Highlight";
import Collection from "./components/Collection";
import CardCollection from "./components/CardCollection";
import WhatWeOffer from "./components/WhatWeOffer";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Highlight />
      <Collection />
      <CardCollection />
      <WhatWeOffer />
    </div>
  );
};

export default Home;
