import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[12rem_1fr] lg:grid-cols-[16rem_1fr] h-full lg:gap-12 sm:gap-6 gap-0">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
