// Types
export interface Asset {
    id: string
    title: string
    description: string
    type: "kpi" | "dataviz" | "layout" | "storyboard"
    icon?: "chart" | "clock" | "alert"
  }
  
  export interface KPI extends Asset {
    businessQuestions: Array<{
      id: string
      question: string
      description: string
    }>
    calculation: string
    visualsAvailable: string[]
    affiliateApplicability: string[]
  }
  
  export interface DataViz extends Asset {
    chartData: any[]
  }
  
  export interface Layout {
    id: string
    title: string
    description: string
    pages: number
    kpis: Array<{
      id: string
      title: string
    }>
    preview: string
  }
  
  export interface Storyboard {
    id: string
    title: string
    description: string
    kpis: string[]
    affiliates: string[]
    preview: string
  }
  
  export interface BusinessQuestion {
    id: string
    question: string
    description: string
  }
  
  // Mock data
  export const featuredAssets: Asset[] = [
    {
      id: "1",
      title: "Sales Performance",
      description: "Track monthly sales performance across all regions and product categories",
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
      description: "Analyze return on investment for marketing campaigns across channels",
      type: "dataviz",
      icon: "chart",
    },
    {
      id: "4",
      title: "Operational Efficiency",
      description: "Monitor key operational metrics and identify optimization opportunities",
      type: "kpi",
      icon: "chart",
    },
  ]
  
  export const trendingAssets: Asset[] = [
    {
      id: "5",
      title: "Revenue Growth",
      description: "Track year-over-year revenue growth by product line and region",
      type: "kpi",
      icon: "chart",
    },
    {
      id: "6",
      title: "Customer Satisfaction",
      description: "Monitor NPS scores and customer satisfaction metrics over time",
      type: "dataviz",
      icon: "chart",
    },
    {
      id: "7",
      title: "Inventory Turnover",
      description: "Analyze inventory turnover rates and identify slow-moving products",
      type: "kpi",
      icon: "clock",
    },
    {
      id: "8",
      title: "Employee Productivity",
      description: "Measure employee productivity metrics across departments",
      type: "dataviz",
      icon: "chart",
    },
  ]
  
  export const kpiDetails: Record<string, KPI> = {
    "1": {
      id: "1",
      title: "Sales Performance",
      description: "Track monthly sales performance across all regions and product categories",
      type: "kpi",
      icon: "chart",
      businessQuestions: [
        {
          id: "q1",
          question: "How are sales trending over time?",
          description: "Analyze month-over-month and year-over-year sales growth",
        },
        {
          id: "q2",
          question: "Which regions are performing best?",
          description: "Compare sales performance across different geographic regions",
        },
        {
          id: "q3",
          question: "What product categories drive the most revenue?",
          description: "Identify top-performing product categories by revenue contribution",
        },
      ],
      calculation: "SUM(sales_amount) GROUP BY time_period, region, product_category",
      visualsAvailable: ["Bar Chart", "Line Chart", "Heat Map", "Geo Map"],
      affiliateApplicability: ["North America", "Europe", "Asia Pacific", "Latin America"],
    },
    "2": {
      id: "2",
      title: "Customer Retention",
      description: "Measure customer retention rates and identify churn patterns",
      type: "kpi",
      icon: "clock",
      businessQuestions: [
        {
          id: "q1",
          question: "What is our customer retention rate?",
          description: "Calculate the percentage of customers who continue to use our products/services",
        },
        {
          id: "q2",
          question: "What are the main reasons for customer churn?",
          description: "Identify patterns and factors contributing to customer attrition",
        },
      ],
      calculation: "(Customers at End of Period - New Customers) / Customers at Start of Period",
      visualsAvailable: ["Line Chart", "Cohort Analysis", "Funnel Chart"],
      affiliateApplicability: ["North America", "Europe"],
    },
    // Add more KPIs as needed
  }
  
  export const dataVizDetails: Record<string, DataViz> = {
    "3": {
      id: "3",
      title: "Marketing ROI",
      description: "Analyze return on investment for marketing campaigns across channels",
      type: "dataviz",
      icon: "chart",
      chartData: [
        { name: "Social Media", value: 4000 },
        { name: "Email", value: 3000 },
        { name: "Search", value: 2000 },
        { name: "Display", value: 2780 },
        { name: "Content", value: 1890 },
        { name: "Events", value: 2390 },
      ],
    },
    "6": {
      id: "6",
      title: "Customer Satisfaction",
      description: "Monitor NPS scores and customer satisfaction metrics over time",
      type: "dataviz",
      icon: "chart",
      chartData: [
        { name: "Jan", value: 75 },
        { name: "Feb", value: 78 },
        { name: "Mar", value: 82 },
        { name: "Apr", value: 80 },
        { name: "May", value: 85 },
        { name: "Jun", value: 83 },
      ],
    },
    // Add more DataViz as needed
  }
  
  export const layouts: Layout[] = [
    {
      id: "layout1",
      title: "Sales Dashboard",
      description: "Comprehensive view of sales performance across regions",
      pages: 3,
      kpis: [
        { id: "1", title: "Sales Performance" },
        { id: "5", title: "Revenue Growth" },
        { id: "3", title: "Marketing ROI" },
      ],
      preview: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "layout2",
      title: "Customer Insights",
      description: "Key metrics related to customer behavior and satisfaction",
      pages: 2,
      kpis: [
        { id: "2", title: "Customer Retention" },
        { id: "6", title: "Customer Satisfaction" },
      ],
      preview: "/placeholder.svg?height=400&width=600",
    },
  ]
  
  export const storyboards: Storyboard[] = [
    {
      id: "storyboard1",
      title: "Quarterly Business Review",
      description: "Executive presentation of quarterly performance metrics",
      kpis: ["Sales Performance", "Revenue Growth", "Customer Satisfaction"],
      affiliates: ["North America", "Europe", "Asia Pacific"],
      preview: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "storyboard2",
      title: "Marketing Campaign Analysis",
      description: "Detailed analysis of marketing campaign performance",
      kpis: ["Marketing ROI", "Customer Acquisition Cost", "Conversion Rate"],
      affiliates: ["North America", "Europe"],
      preview: "/placeholder.svg?height=400&width=600",
    },
  ]
  
  export const businessQuestions: BusinessQuestion[] = [
    {
      id: "1",
      question: "How does this metric compare to industry benchmarks?",
      description: "Understand how our performance compares to industry standards and competitors",
    },
    {
      id: "2",
      question: "What factors are driving changes in this KPI over time?",
      description: "Identify key drivers and influencing factors affecting this metric",
    },
    {
      id: "3",
      question: "How does this metric vary across different segments?",
      description: "Analyze performance variations across customer segments, regions, or product categories",
    },
    {
      id: "4",
      question: "What actions can improve this metric in the short term?",
      description: "Determine actionable steps to positively impact this KPI in the next quarter",
    },
  ]