'use client'

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useSearchParams } from 'next/navigation'

export default function Library() {

  const searchParams = useSearchParams()

  const search = searchParams.get('tab')
  
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
            <Link className={`px-6 py-3 font-medium text-sm`} href={{
                pathname : '/',
                query : {
                    tab : "featured"
                }
            }}> 
              Featured
            </Link>
            <Link
              className={`px-6 py-3 font-medium text-sm`}
              href={{
                pathname : '/',
                query : {
                    tab : "kpi"
                }
            }}
            >
              KPIs
            </Link>
            <Link
              className={`px-6 py-3 font-medium text-sm`}
              href={{
                pathname : '/',
                query : {
                    tab : "layouts"
                }
            }}
            >
              Layouts
            </Link>
            <Link
              className={`px-6 py-3 font-medium text-sm`}
              href={{
                pathname : '/',
                query : {
                    tab : "storyboards"
                }
            }}
            >
              Storyboards
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
