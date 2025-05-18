
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 gradient-bg star-field flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-astral-purple opacity-30 animate-pulse"></div>
            <div className="absolute inset-[15%] rounded-full bg-astral-gold/20 border border-astral-gold"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-12 h-12 text-astral-gold"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-astral-purple to-astral-gold mb-4">
            404
          </h1>
          
          <h2 className="text-2xl font-semibold mb-4">
            Page Not Found
          </h2>
          
          <p className="text-muted-foreground mb-8">
            The cosmic alignment you're seeking doesn't exist. Perhaps the stars have guided you elsewhere.
          </p>
          
          <Button className="bg-astral-purple hover:bg-astral-purple/90" size="lg">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
