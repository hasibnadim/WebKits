import React from "react"; 


export default function KitLayout({ children }: { children: React.ReactNode }) {
  // Track which categories are open


  return (
    <div className="flex min-h-screen  ">
      {/* Sidebar */}
    
      {/* Main Content */}
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}