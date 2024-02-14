export default function NavbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="sticky top-0 z-50 flex h-16 w-full flex-row items-center bg-[#ffffff] p-4">
        <span className="text-xl">Navbar</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
