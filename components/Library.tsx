"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useSearchParams } from "next/navigation";
import AssetGrid from "./AssetGrid";
import { api } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import LayoutDashboard from "./LayoutDashboard";

export default function Library() {
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "featured";

  const { data: featureAssets = [], isLoading: featuredAssetsLoading } =
    useQuery({
      queryKey: ["featured", "assets"],
      queryFn: () => api.getFeaturesAssets(),
      enabled: activeTab === "featured",
    });

  const { data: trendingAssets = [], isLoading: trendingAssetsLoading } =
    useQuery({
      queryKey: ["trending", "assets"],
      queryFn: () => api.getTrendingAssets(),
      enabled: activeTab === "featured",
    });

  const { data: kpis = [], isLoading: kpisLoading } = useQuery({
    queryKey: ["kpi", "assets"],
    queryFn: () => api.getKpis(),
    enabled: activeTab === "kpis",
  });

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Library</h1>
            <p className="text-gray-500 mt-1">
              Browse for assets needed for report and dashboard analysis.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-black rounded-md text-white hover:bg-gray-800 hover:cursor-pointer">
              Request
            </button>
          </div>
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="bg-gray-200 rounded-md">
          <div className="flex">
            <Link
              className={`px-6 py-3 font-medium text-sm cursor-pointer ${
                activeTab === "featured"
                  ? "text-black border-b-2 border-gray-500"
                  : "text-gray-500"
              }`}
              href={`/?tab=featured`}
            >
              Featured
            </Link>
            <Link
              className={`px-6 py-3 font-medium text-sm cursor-pointer ${
                activeTab === "kpis"
                  ? "text-black border-b-2 border-gray-500"
                  : "text-gray-500"
              }`}
              href={`/?tab=kpis`}
            >
              KPIs
            </Link>
            <Link
              className={`px-6 py-3 font-medium text-sm cursor-pointer ${
                activeTab === "layout"
                  ? "text-black border-b-2 border-gray-500"
                  : "text-gray-500"
              }`}
              href={`/?tab=layout`}
            >
              Layouts
            </Link>
            <Link
              className={`px-6 py-3 font-medium text-sm cursor-pointer ${
                activeTab === "storyboard"
                  ? "text-black border-b-2 border-gray-500"
                  : "text-gray-500"
              }`}
              href={`/?tab=storyboard`}
            >
              Storyboards
            </Link>
          </div>
        </div>

        <>
          {activeTab === "featured" && (
            <>
              <AssetGrid
                title="Featured"
                subtitle="Most popular assets across the organization"
                assets={featureAssets}
                isLoading={featuredAssetsLoading}
              />
              <AssetGrid
                title="Trending"
                subtitle="Most trending assets across the organization"
                assets={trendingAssets}
                isLoading={trendingAssetsLoading}
              />
            </>
          )}

          {activeTab === "kpis" && (
            <AssetGrid
              title="Key Performance Indicators"
              subtitle="Metrics to track business performance"
              assets={kpis}
              isLoading={kpisLoading}
            />
          )}

          {activeTab === "layout" && (
            <div>
              <LayoutDashboard />
            </div>
          )}
          {activeTab === "storyboard" && <div>Story Board</div>}
        </>
      </div>
    </div>
  );
}
