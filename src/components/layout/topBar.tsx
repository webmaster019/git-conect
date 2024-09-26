import React from "react";

const TopBar = () => {
    return (
        <header className="bg-white shadow p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
                <button className="bg-blue-500 text-white px-3 py-1 rounded">Button</button>
            </div>
        </header>
    )
}
export default TopBar
