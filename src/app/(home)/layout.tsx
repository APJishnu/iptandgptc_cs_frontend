import Footer from "@/themes/components/footer/footer";
import Navbar from "@/themes/components/navbar/navbar";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <> 
      <Navbar />
        {children}
      <Footer />
      </>
  );
}
