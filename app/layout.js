
import { Geist, Geist_Mono } from "next/font/google";
import ChatSidebar from "./Componants/ChatSidebar";
import Footer from "./Componants/Footer";
import NavbarWithLinks from "./Componants/navbar";
import { CartProvider } from "./contexts/CartContext";
import { ChatProvider } from "./contexts/ChatContext";
import { TranslationProvider } from "./contexts/TranslationContext";
import { Toaster } from 'react-hot-toast';
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children  }) {

  return (
    
    <html>

     <body>

   <TranslationProvider>
   <Toaster position="top-center" />
   
     <CartProvider>
     <NavbarWithLinks />

<ChatProvider>
        {children}
<ChatSidebar />
</ChatProvider>

        <Footer />
     </CartProvider>
       
    </TranslationProvider>
      </body>
      </html>
    
  );
}
