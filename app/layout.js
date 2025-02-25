import Logo from "@/_components/Logo";
import Navigation from "@/_components/Navigation";

import "@/_styles/globals.css";

export const metadata = {
  title: {
    template: "%s Wild oasis",
    default: "Welcome to Wild oasis",
    description:
      "Luxurious cabin hotel located in the Italian Dolomites",
  },
};

//this returns a function
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

//calling the function returns an object
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* use the object to body or specific tags ike headers */}
      <body
        className={`${josefin.className} antialiased bg-primary-950
text-primary-100
flex flex-col
`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main
            className="max-w-7xl mx-auto 
          w-full"
          >
            <ReservationProvider>
              {children}{" "}
              {/* Dynamic page content */}
            </ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
