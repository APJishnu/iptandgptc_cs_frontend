import ModuleHeaderWrapper from "@/themes/admin/components/module-header-wrapper/module-header-wrapper";
import NavBar from "@/themes/admin/components/nav-bar/nav-bar";
import './home.scss'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <NavBar />
        <ModuleHeaderWrapper />
        {children}
      </>
  );
}
