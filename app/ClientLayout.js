"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import CartDrawer from "@/components/cart/CartDrawer";
import { CartProvider } from "@/context/CartContext";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <CartProvider>
      {!isAdmin && <Header />}
      <CartDrawer />
      {isAdmin ? (
        children
      ) : (
        <main className="flex-grow">
          <PageWrapper>
            {children}
          </PageWrapper>
        </main>
      )}
      {!isAdmin && <Footer />}
    </CartProvider>
  );
}