"use client";

import { useState } from "react";
import LayoutModel from "./LayoutModel";
import { Plus } from "lucide-react";
import type { Layout } from "@/lib/data";

interface LayoutDashboardProps {
  layouts: Layout[];
  isLoading: boolean;
}

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-24" />
    ))}
  </div>
);

export default function LayoutDashboard({
  layouts,
  isLoading,
}: LayoutDashboardProps) {
  const [selectedAsset, setSelectedAsset] = useState(null);
  return (
    <div className="mt-6">
      <div>
        <div className="mt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Layout</h1>
              <p className="text-gray-500 mt-1">
                Browse for assets needed for report and dashboard analysis.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="px-4 py-2 bg-black rounded-md text-white hover:bg-gray-800 hover:cursor-pointer">
                Create Layout
              </button>
            </div>
          </div>

          {isLoading ? (
            <LoadingSkeleton />
          ) : layouts?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {layouts.map((layout) => (
                <div
                  key={layout.id}
                  className="border border-gray-400 rounded-lg p-4"
                >
                  <h3 className="font-medium text-gray-900">{layout.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {layout.description}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">
                      {layout.pages} pages
                    </span>
                    <span className="text-xs text-gray-500">
                      {layout.kpis.length} KPIs
                    </span>
                  </div>
                </div>
              ))}

              <div className="bg-white p-4 rounded-lg border border-dashed border-gray-300 hover:border-gray-700 transition-colors cursor-pointer flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <Plus />
                </div>
                <h3 className="font-medium text-gray-900">Create New Layout</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Build a custom dashboard with your KPIs
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
              <p className="text-gray-500 pb-8">
                No layouts are avalible. Create your first layout
              </p>

              <button className="px-4 py-2 bg-black rounded-md text-white hover:bg-gray-800 hover:cursor-pointer">
                Create Layout
              </button>
            </div>
          )}

          {selectedAsset && <LayoutModel />}
        </div>
      </div>
    </div>
  );
}
