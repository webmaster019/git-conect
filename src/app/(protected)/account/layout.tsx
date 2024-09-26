import React from "react";
import TopBar from "@/components/layout/topBar";
import Sidebar from "@/components/layout/sidebar";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen">
            <Sidebar/>

            <div className="flex-1 bg-gray-100">
                <TopBar/>

                <main className="p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}
