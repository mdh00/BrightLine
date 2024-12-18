import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Navigation() {
  const { user } = useUser();

  const isAdmin = user?.publicMetadata?.role === "admin";
  return (
    <nav className="flex py-12 justify-between items-center border-x-0 border border-blue-gray-300 mb-5">
    <div>
      <Link to={"/"} className="text-4xl font-extrabold text-underlay-1">
        BrightLine
      </Link>
    </div>
    <div className="flex justify-center gap-x-8 items-center">
      <Link to="/">Home</Link>
      <div className="flex gap-x-4 items-center">
        <SignedIn>
        {isAdmin && (
              <Button asChild>
                <Link to="/admin/bookings">Admin Dashboard</Link>
              </Button>
            )}
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link to={"/sign-in"}>Sign In</Link>
          <Button asChild>
            <Link to={"/sign-up"}>Sign Up</Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  </nav>
  );
}

export default Navigation;