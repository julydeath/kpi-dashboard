//@ts-nocheck
"use client";

import { useState } from "react";
import { X, Heart, Link, BarChart2, FileText, Layout } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BusinessQuestions from "./BusinessQuestions";
import { api, Asset, ChartType } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import ChartTypeSelector from "./ChartTypeSelector";
import { DynamicChart } from "./ui/chart";

interface AssetModalProps {
  asset: Asset;
  onClose: () => void;
}

export default function AssetModal({ asset, onClose }: AssetModalProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showRequestAccess, setShowRequestAccess] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [selectedChartType, setSelectedChartType] = useState<ChartType>("bar");

  const { data: assetDetails } = useQuery({
    queryKey: ["asset", asset.type, asset.id],
    queryFn: () => api.getKPIDetails(asset.id, asset.type),
  });

  // Fetch business questions
  const { data: businessQuestions = [] } = useQuery({
    queryKey: ["businessQuestions"],
    queryFn: api.getBusinessQuestions,
    enabled: activeTab === "questions",
  });

  const getIcon = () => {
    switch (asset.type) {
      case "kpi":
        return <BarChart2 className="h-6 w-6 text-black" />;
      case "dataviz":
        return <BarChart2 className="h-6 w-6 text-black" />;
      case "layout":
        return <Layout className="h-6 w-6 text-black" />;
      case "storyboard":
        return <FileText className="h-6 w-6 text-black" />;
      default:
        return <BarChart2 className="h-6 w-6 text-black" />;
    }
  };

  console.log({ assetDetails });

  const chartData = assetDetails?.data || assetDetails?.chartData || [];
  const availableChartTypes: ChartType[] =
    (assetDetails?.visualsAvailable
      ?.map((type) => {
        if (type.toLowerCase().includes("bar")) return "bar";
        if (type.toLowerCase().includes("line")) return "line";
        if (type.toLowerCase().includes("area")) return "area";
        if (type.toLowerCase().includes("pie")) return "pie";
        return "bar";
      })
      .filter(Boolean) as ChartType[]) ||
    (assetDetails?.chartType ? [assetDetails.chartType] : ["bar"]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const copyLink = () => {
    alert("Link copied to clipboard!");
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center bg-black/50 justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-full">{getIcon()}</div>
              <h2 className="text-2xl font-semibold">{asset.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 hover: cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium text-sm hover: cursor-pointer ${
                activeTab === "info"
                  ? "text-black border-b-2 border-gray-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("info")}
            >
              Info
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm hover: cursor-pointer ${
                activeTab === "chart"
                  ? "text-black border-b-2 border-gray-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("chart")}
            >
              Chart
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm hover: cursor-pointer ${
                activeTab === "questions"
                  ? "text-black border-b-2 border-gray-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("questions")}
            >
              Business Questions
            </button>
          </div>

          <div className="p-6">
            {activeTab === "info" && (
              <div>
                <p className="text-black text-xl font-semibold">
                  {asset.description}
                </p>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">Type</p>
                      <p className="text-gray-900 capitalize">{asset.type}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">
                        Last Updated
                      </p>
                      <p className="text-gray-900">March 15, 2024</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">
                        Created By
                      </p>
                      <p className="text-gray-900">Analytics Team</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">Usage</p>
                      <p className="text-gray-900">Used in 5 layouts</p>
                    </div>
                  </div>
                </div>

                {assetDetails?.calculation && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Calculation</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="font-mono text-sm">
                        {assetDetails.calculation}
                      </p>
                    </div>
                  </div>
                )}

                {assetDetails?.affiliateApplicability &&
                  assetDetails.affiliateApplicability.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">
                        Affiliate Applicability
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {assetDetails.affiliateApplicability.map(
                          (affiliate, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                            >
                              {affiliate}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            )}

            {activeTab === "chart" && (
              <div>
                {availableChartTypes.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Chart Type
                    </h3>
                    <ChartTypeSelector
                      selectedType={selectedChartType}
                      onChange={setSelectedChartType}
                      avalibleTypes={availableChartTypes}
                    />
                  </div>
                )}

                <div className="h-80 bg-white p-4 rounded-lg border border-gray-200">
                  {chartData && chartData.length > 0 ? (
                    <DynamicChart
                      data={chartData}
                      type={selectedChartType}
                      height="100%"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">
                        No chart data available for this asset.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Chart Details</h3>
                  <p className="text-gray-700">
                    This chart shows the data for {asset.title}. The data is
                    aggregated from multiple sources and updated daily.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "questions" && (
              <BusinessQuestions questions={businessQuestions} />
            )}
          </div>

          <div className="flex justify-between p-6 border-t">
            <div className="flex gap-3">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  isFavorite
                    ? "bg-red-50 text-red-600"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:cursor-pointer"
                }`}
                onClick={toggleFavorite}
              >
                <Heart
                  className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
                />
                {isFavorite ? "Favorited" : "Favorite"}
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 hover:cursor-pointer"
                onClick={copyLink}
              >
                <Link className="h-4 w-4" />
                Copy Link
              </button>
            </div>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 hover:cursor-pointer"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
