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

export default function AssetModal({ asset, onClose } : any) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showRequestAccess, setShowRequestAccess] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [chartData, setChartData] = useState<any[]>([]);
  const [businessQuestions, setBusinessQuestions] = useState([]);

  const getIcon = () => {
    switch (asset.type) {
      case "kpi":
        return <BarChart2 className="h-6 w-6 text-blue-500" />;
      case "dataviz":
        return <BarChart2 className="h-6 w-6 text-green-500" />;
      case "layout":
        return <Layout className="h-6 w-6 text-purple-500" />;
      case "storyboard":
        return <FileText className="h-6 w-6 text-orange-500" />;
      default:
        return <BarChart2 className="h-6 w-6 text-blue-500" />;
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const copyLink = () => {
    alert("Link copied to clipboard!")
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center bg-black/50 justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
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
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "info"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("info")}
            >
              Info
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "chart"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("chart")}
            >
              Chart
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "questions"
                  ? "text-blue-600 border-b-2 border-blue-600"
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
                <p className="text-gray-700">{asset.description}</p>

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
              </div>
            )}

            {activeTab === "chart" && (
              <div>
                <div className="h-80 bg-white p-4 rounded-lg border border-gray-200">
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
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
                    This chart shows the monthly trend for {asset.title}. The
                    data is aggregated from multiple sources and updated daily.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'questions' && <BusinessQuestions questions={businessQuestions}/>}
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
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 hover:cursor-pointer" onClick={copyLink}>
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
