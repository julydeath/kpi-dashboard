"use client";

import { X, Plus, Edit, Copy } from "lucide-react";
import { useState } from "react";
import type { Layout, KPI, ChartType } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/data";

interface LayoutModalProps {
  layout?: Layout | null;
  onClose: () => void;
}

export default function LayoutModal({ layout, onClose }: LayoutModalProps) {
  // If no layout is provided, show the create layout screen
  const isCreating = !layout;

  // Default values for new layout
  const defaultLayout = {
    id: "new",
    title: "New Layout",
    description: "Create a new dashboard layout",
    pages: 1,
    kpis: [],
    preview: "/placeholder.svg?height=400&width=600",
  };

  const currentLayout = layout || defaultLayout;

  // State for form fields
  const [title, setTitle] = useState(currentLayout.title);
  const [description, setDescription] = useState(currentLayout.description);
  const [pages, setPages] = useState(currentLayout.pages);
  const [selectedTemplate, setSelectedTemplate] = useState<
    "2x2" | "3x1" | "1x3"
  >("2x2");
  const [activeTab, setActiveTab] = useState(isCreating ? "create" : "preview");
  const [selectedKpis, setSelectedKpis] = useState<
    Array<{ kpi: KPI; chartType: ChartType }>
  >([]);

  // Show KPI selector when adding KPIs
  const [showKpiSelector, setShowKpiSelector] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6">
          <h2 className="text-2xl font-semibold">
            {isCreating ? "Create New Layout" : currentLayout.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {!isCreating && (
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "preview"
                  ? "text-black border-b-2 border-gray-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("preview")}
            >
              Preview
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "kpis"
                  ? "text-black border-b-2 border-gray-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("kpis")}
            >
              KPIs Used
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "settings"
                  ? "text-black border-b-2 border-gray-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </div>
        )}

        <form>
          <div className="p-6">
            {isCreating || activeTab === "create" ? (
              <div>
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Layout Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter layout title"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the purpose of this layout"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="pages"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Number of Pages
                  </label>
                  <input
                    type="number"
                    id="pages"
                    name="pages"
                    min="1"
                    value={pages}
                    onChange={(e) =>
                      setPages(Number.parseInt(e.target.value) || 1)
                    }
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Add KPIs</h3>
                  {showKpiSelector ? (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Select KPIs</h4>
                        <button
                          onClick={() => setShowKpiSelector(false)}
                          className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                          <X className="h-5 w-5 cursor-pointer" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300 text-center">
                      <button
                        className="flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-black rounded-md text-white hover:bg-gray-700 cursor-pointer"
                        onClick={() => setShowKpiSelector(true)}
                      >
                        <Plus className="h-4 w-4" />
                        Add KPIs from Library
                      </button>
                      <p className="text-sm text-gray-500 mt-2">
                        Select KPIs to include in your layout
                      </p>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Layout Template
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div
                      className={`border rounded-lg p-2 cursor-pointer ${
                        selectedTemplate === "2x2"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => setSelectedTemplate("2x2")}
                    >
                      <div className="aspect-video bg-white border border-gray-200 rounded-md mb-2 flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-2 p-2 w-full h-full">
                          <div className="bg-gray-100 rounded"></div>
                          <div className="bg-gray-100 rounded"></div>
                          <div className="bg-gray-100 rounded"></div>
                          <div className="bg-gray-100 rounded"></div>
                        </div>
                      </div>
                      <p className="text-center text-sm font-medium">
                        2x2 Grid
                      </p>
                    </div>

                    <div
                      className={`border rounded-lg p-2 cursor-pointer ${
                        selectedTemplate === "3x1"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => setSelectedTemplate("3x1")}
                    >
                      <div className="aspect-video bg-white border border-gray-200 rounded-md mb-2 flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-2 p-2 w-full h-full">
                          <div className="bg-gray-100 rounded"></div>
                          <div className="bg-gray-100 rounded"></div>
                          <div className="bg-gray-100 rounded"></div>
                          <div className="bg-gray-100 rounded col-span-3"></div>
                        </div>
                      </div>
                      <p className="text-center text-sm font-medium">
                        3x1 Grid
                      </p>
                    </div>

                    <div
                      className={`border rounded-lg p-2 cursor-pointer ${
                        selectedTemplate === "1x3"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => setSelectedTemplate("1x3")}
                    >
                      <div className="aspect-video bg-white border border-gray-200 rounded-md mb-2 flex items-center justify-center">
                        <div className="grid grid-cols-1 gap-2 p-2 w-full h-full">
                          <div className="bg-gray-100 rounded"></div>
                          <div className="bg-gray-100 rounded"></div>
                          <div className="bg-gray-100 rounded"></div>
                        </div>
                      </div>
                      <p className="text-center text-sm font-medium">
                        1x3 Grid
                      </p>
                    </div>
                  </div>
                </div>

                {selectedKpis.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">
                      Layout Preview
                    </h3>
                  </div>
                )}
              </div>
            ) : (
              <>
                {activeTab === "preview" && (
                  <div>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
                      {selectedKpis.length > 0 ? (
                        <div>Preview</div>
                      ) : (
                        <img
                          src={currentLayout.preview || "/placeholder.svg"}
                          alt="Layout preview"
                          className="w-full h-auto"
                        />
                      )}
                    </div>

                    <div className="flex flex-col justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Layout Details
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {currentLayout.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 p-4">
                        <span className="text-sm text-gray-500">
                          {currentLayout.pages}{" "}
                          {currentLayout.pages === 1 ? "page" : "pages"}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                          {selectedKpis.length || currentLayout.kpis.length}{" "}
                          {(selectedKpis.length ||
                            currentLayout.kpis.length) === 1
                            ? "KPI"
                            : "KPIs"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "kpis" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      KPIs Being Used
                    </h3>

                    {selectedKpis.length > 0 ? (
                      <div className="space-y-3">
                        {selectedKpis.map(({ kpi, chartType }) => (
                          <div
                            key={kpi.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{kpi.title}</span>
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                {chartType.charAt(0).toUpperCase() +
                                  chartType.slice(1)}{" "}
                                Chart
                              </span>
                            </div>
                            <button className="text-black hover:text-blue-800 text-sm">
                              View Details
                            </button>
                          </div>
                        ))}

                        <button
                          className="flex items-center gap-2 mt-4 text-black hover:text-blue-800"
                          onClick={() => setShowKpiSelector(true)}
                        >
                          <Plus className="h-4 w-4" />
                          Add More KPIs
                        </button>
                      </div>
                    ) : currentLayout.kpis.length > 0 ? (
                      <div className="space-y-3">
                        {currentLayout.kpis.map((kpi) => (
                          <div
                            key={kpi.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{kpi.title}</span>
                              {kpi.chartType && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                  {kpi.chartType.charAt(0).toUpperCase() +
                                    kpi.chartType.slice(1)}{" "}
                                  Chart
                                </span>
                              )}
                            </div>
                            <button className="text-black hover:text-blue-800 text-sm cursor-pointer">
                              View Details
                            </button>
                          </div>
                        ))}

                        <button
                          className="flex items-center gap-2 mt-4 text-black hover:text-gray-800 cursor-pointer"
                          onClick={() => setShowKpiSelector(true)}
                        >
                          <Plus className="h-4 w-4" />
                          Add More KPIs
                        </button>
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <p className="text-gray-500 mb-4">
                          No KPIs added to this layout yet
                        </p>
                        <button
                          className="flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-black rounded-md text-white hover:bg-gray-700 cursor-pointer"
                          onClick={() => setShowKpiSelector(true)}
                        >
                          <Plus className="h-4 w-4" />
                          Add KPIs
                        </button>
                      </div>
                    )}

                    {showKpiSelector && (
                      <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-300">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Select KPIs</h4>
                          <button
                            onClick={() => setShowKpiSelector(false)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "settings" && (
                  <div>
                    <div className="mb-6">
                      <label
                        htmlFor="edit-title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Layout Title
                      </label>
                      <input
                        type="text"
                        id="edit-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="edit-description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Description
                      </label>
                      <textarea
                        id="edit-description"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="pages"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Number of Pages
                      </label>
                      <input
                        type="number"
                        id="pages"
                        min="1"
                        value={pages}
                        onChange={(e) =>
                          setPages(Number.parseInt(e.target.value) || 1)
                        }
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">
                        Layout Template
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div
                          className={`border rounded-lg p-2 cursor-pointer ${
                            selectedTemplate === "2x2"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                          onClick={() => setSelectedTemplate("2x2")}
                        >
                          <div className="aspect-video bg-white border border-gray-200 rounded-md mb-2 flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-2 p-2 w-full h-full">
                              <div className="bg-gray-100 rounded"></div>
                              <div className="bg-gray-100 rounded"></div>
                              <div className="bg-gray-100 rounded"></div>
                              <div className="bg-gray-100 rounded"></div>
                            </div>
                          </div>
                          <p className="text-center text-sm font-medium">
                            2x2 Grid
                          </p>
                        </div>

                        <div
                          className={`border rounded-lg p-2 cursor-pointer ${
                            selectedTemplate === "3x1"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                          onClick={() => setSelectedTemplate("3x1")}
                        >
                          <div className="aspect-video bg-white border border-gray-200 rounded-md mb-2 flex items-center justify-center">
                            <div className="grid grid-cols-3 gap-2 p-2 w-full h-full">
                              <div className="bg-gray-100 rounded"></div>
                              <div className="bg-gray-100 rounded"></div>
                              <div className="bg-gray-100 rounded"></div>
                              <div className="bg-gray-100 rounded col-span-3"></div>
                            </div>
                          </div>
                          <p className="text-center text-sm font-medium">
                            3x1 Grid
                          </p>
                        </div>

                        <div
                          className={`border rounded-lg p-2 cursor-pointer ${
                            selectedTemplate === "1x3"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                          onClick={() => setSelectedTemplate("1x3")}
                        >
                          <div className="aspect-video bg-white border border-gray-200 rounded-md mb-2 flex items-center justify-center">
                            <div className="grid grid-cols-1 gap-2 p-2 w-full h-full">
                              <div className="bg-gray-100 rounded"></div>
                              <div className="bg-gray-100 rounded"></div>
                              <div className="bg-gray-100 rounded"></div>
                            </div>
                          </div>
                          <p className="text-center text-sm font-medium">
                            1x3 Grid
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-1">
                        Sharing Settings
                      </h3>
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          id="public"
                          className="h-4 w-4 text-black focus:ring-gray-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="public"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Make this layout public to all team members
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex justify-end gap-3 p-6 border-t">
            <button
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>

            {isCreating ? (
              <button
                type="submit"
                className="px-4 py-2 bg-black rounded-md text-white hover:bg-gray-700 cursor-pointer"
                disabled={!title.trim() || selectedKpis.length === 0}
              >
                Create Layout
              </button>
            ) : (
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <Copy className="h-4 w-4" />
                  Duplicate
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-black rounded-md text-white hover:bg-gray-700 cursor-pointer"
                  type="submit"
                >
                  <Edit className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
