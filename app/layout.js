import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";

import Header from "./_components/Header";
import ReservationProvider from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurios cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

//Children prop => current page
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} min-h-screen text-primary-100 flex flex-col bg-primary-950 antialiased relative `}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid ">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
