"use clent";

import AssetModal from "./AssetModel";
import MetricCard from "./MetricCard";
import { useState } from "react";
import type {Asset} from '@/lib/data'

interface AssetGridProps {
  title: string
  subtitle?: string
  assets: Asset[]
}

export const featuredAssets = [
  {
    id: "1",
    title: "Sales Performance",
    description:
      "Track monthly sales performance across all regions and product categories",
    type: "kpi",
    icon: "chart",
  },
  {
    id: "2",
    title: "Customer Retention",
    description: "Measure customer retention rates and identify churn patterns",
    type: "kpi",
    icon: "clock",
  },
  {
    id: "3",
    title: "Marketing ROI",
    description:
      "Analyze return on investment for marketing campaigns across channels",
    type: "dataviz",
    icon: "chart",
  },
  {
    id: "4",
    title: "Operational Efficiency",
    description:
      "Monitor key operational metrics and identify optimization opportunities",
    type: "kpi",
    icon: "chart",
  },
];

export default function AssetGrid() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const handleModelClose = () => {
    setSelectedAsset(null);
  };
  return (
    <div className="mt-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Title</h2>
        <p className="text-sm text-gray-500">Sub Title</p>
      </div>

      {featuredAssets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredAssets.map((asset) => (
            <MetricCard
              key={asset.id}
              title={asset.title}
              description={asset.description}
              icon={asset.icon}
              onClick={() => handleAssetClick(asset)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-500">No assets available.</p>
        </div>
      )}

      {selectedAsset && (
        <AssetModal asset={selectedAsset} onClose={handleModelClose} />
      )}
    </div>
  );
}
