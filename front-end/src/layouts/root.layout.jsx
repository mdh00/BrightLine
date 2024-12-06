import Navigation from "@/components/shared/Navigation";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

function RootLayout() {
  return (
    <ThemeProvider>
    <div className="container px-4">
      <Navigation />
      <Outlet />
    </div>
    </ThemeProvider>
  );
}

export default RootLayout;
