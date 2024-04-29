import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AboutUs from "../../components/AboutUs";
import ArtCraftCard from "../../components/ArtCraftCard";
import Slider from "../../components/Slider";

export default function Home() {
  const [artCraft, setArtCraft] = useState()
  useEffect(() => {
    fetch('http://localhost:5000/artcrafts')
      .then(res => res.json())
      .then(data => {
        setArtCraft(data.slice(0, 3))
      })
  }, [])
  return (
    <>
      <Slider></Slider>
      <div className="mt-0 lg:mt-[900px]">
        <h2 className="text-center text-3xl text-[#70D2C0] my-10">Our Products</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {
            !artCraft ? <div className="justify-center flex my-20"><span className="loading loading-spinner loading-lg"></span></div> : artCraft?.map((artCraft) => {
              return (
                <ArtCraftCard key={artCraft._id} artCraft={artCraft}></ArtCraftCard>
              )
            })
          }
        </div>
          <Link to='/allartcraft'><button className="border border-gray-400 px-4 py-2 my-6 mx-auto block rounded">Show All</button></Link>
        <AboutUs></AboutUs>
      </div>
    </>
  )
}
