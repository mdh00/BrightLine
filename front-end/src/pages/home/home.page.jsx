import Hero from "./components/Hero";
import UserBookings from "./components/UserBookings";
import { useAuth } from "@clerk/clerk-react";

function HomePage() {
  const {isSignedIn} = useAuth();
  return (
    <main>      
      <div>
        <Hero />
        {isSignedIn && <UserBookings />}
      </div>
    </main>
  );
}

export default HomePage;
