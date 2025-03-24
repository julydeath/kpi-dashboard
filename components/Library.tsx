'use client'

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useSearchParams } from 'next/navigation'
import AssetGrid from "./AssetGrid";

export default function Library() {

  const searchParams = useSearchParams()

  const activeTab = searchParams.get('tab') || "featured"

  // console.log({search})

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
            <Link className={`px-6 py-3 font-medium text-sm ${activeTab === "featured" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`} href={`/?tab=featured`}> 
              Featured
            </Link>
            <Link
              className={`px-6 py-3 font-medium text-sm ${activeTab === "kpi" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              href={`/?tab=kpi`}
            >
              KPIs
            </Link>
            <Link
              className={`px-6 py-3 font-medium text-sm ${activeTab === "layout" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              href={`/?tab=layout`}
            >
              Layouts
            </Link>
            <Link
              className={`px-6 py-3 font-medium text-sm ${activeTab === "storyboard" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              href={`/?tab=storyboard`}
            >
              Storyboards
            </Link>
          </div>
        </div>


        <>
            {activeTab === "featured" && (
              <>
                <AssetGrid />
              </>
            )}

            {activeTab === "kpi" && (
              <AssetGrid />
            )}
          </>
      </div>
    </div>
  );
}
