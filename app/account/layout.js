import SideNavigation from "@/_components/SideNavigation";

function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem,1fr] h-full gap-12 p-4">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}

export default Layout;
