import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
function Hero() {
  return (
    <section className="py-20 bg-lime-300 flex justify-center items-center rounded-xl shadow-sm shadow-gray-300 border-white hero">
      <div>
        <h1 className="text-black">Your All-in-One Cleaning Service Solution.</h1>
        <div className="flex justify-center mt-10">
        <Button asChild size="lg" className="text-lg">
          <Link to={"/add-booking"}>Book Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
