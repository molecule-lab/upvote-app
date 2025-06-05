"use client";
import { useQueryGetDashboard } from "@/api/useQueryGetDashboard";
import { DashboardCards } from "@/components/layouts/dashboard/dashboard-cards";
import FeedbackList from "@/components/layouts/feedback/feedback-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuth from "@/hooks/use-auth";

import { CheckCircle, PlayCircle, TrendingUp, Vote } from "lucide-react";
import { useEffect } from "react";

const topRequests = [
  {
    id: 1,
    title: "Dark mode support for mobile app",
    board: "Mobile App",
    votes: 342,
    status: "planned",
    submittedAt: "2024-01-15",
    type: "idea",
    priority: "low",
  },
  {
    id: 2,
    title: "Advanced search filters",
    board: "Web Platform",
    votes: 298,
    status: "in-progress",
    submittedAt: "2024-01-12",
    type: "issue",
    priority: "medium",
  },
  {
    id: 3,
    title: "Webhook support for real-time updates",
    board: "API & Integrations",
    votes: 267,
    status: "planned",
    submittedAt: "2024-01-18",
    type: "feedback",
    priority: "high",
  },
  {
    id: 4,
    title: "Bulk export functionality",
    board: "Web Platform",
    votes: 234,
    status: "completed",
    submittedAt: "2024-01-08",
    type: "issue",
    priority: "urgent",
  },
  {
    id: 5,
    title: "Component documentation improvements",
    board: "Design System",
    votes: 189,
    status: "in-progress",
    type: "idea",
    submittedAt: "2024-01-20",
    priority: "low",
  },
  {
    id: 1,
    title: "Dark mode support for mobile app",
    board: "Mobile App",
    votes: 342,
    status: "planned",
    submittedAt: "2024-01-15",
    type: "idea",
    priority: "low",
  },
  {
    id: 2,
    title: "Advanced search filters",
    board: "Web Platform",
    votes: 298,
    status: "in-progress",
    submittedAt: "2024-01-12",
    type: "issue",
    priority: "medium",
  },
  {
    id: 3,
    title: "Webhook support for real-time updates",
    board: "API & Integrations",
    votes: 267,
    status: "planned",
    submittedAt: "2024-01-18",
    type: "feedback",
    priority: "high",
  },
  {
    id: 4,
    title: "Bulk export functionality",
    board: "Web Platform",
    votes: 234,
    status: "completed",
    submittedAt: "2024-01-08",
    type: "issue",
    priority: "urgent",
  },
  {
    id: 5,
    title: "Component documentation improvements",
    board: "Design System",
    votes: 189,
    status: "in-progress",
    type: "idea",
    submittedAt: "2024-01-20",
    priority: "low",
  },
  {
    id: 1,
    title: "Dark mode support for mobile app",
    board: "Mobile App",
    votes: 342,
    status: "planned",
    submittedAt: "2024-01-15",
    type: "idea",
    priority: "low",
  },
  {
    id: 2,
    title: "Advanced search filters",
    board: "Web Platform",
    votes: 298,
    status: "in-progress",
    submittedAt: "2024-01-12",
    type: "issue",
    priority: "medium",
  },
  {
    id: 3,
    title: "Webhook support for real-time updates",
    board: "API & Integrations",
    votes: 267,
    status: "planned",
    submittedAt: "2024-01-18",
    type: "feedback",
    priority: "high",
  },
  {
    id: 4,
    title: "Bulk export functionality",
    board: "Web Platform",
    votes: 234,
    status: "completed",
    submittedAt: "2024-01-08",
    type: "issue",
    priority: "urgent",
  },
  {
    id: 5,
    title: "Component documentation improvements",
    board: "Design System",
    votes: 189,
    status: "in-progress",
    type: "idea",
    submittedAt: "2024-01-20",
    priority: "low",
  },
];

const STATUS_VARIANT_MAP = {
  complete: "default",
  "in-progress": "outline",
  planned: "outline",
};

export default function Dashboard() {
  const { systemUser } = useAuth();

  const {
    data: dashboardData,
    isLoading,
    isFetching,
  } = useQueryGetDashboard(Boolean(systemUser));

  useEffect(() => {
    console.log(dashboardData);
  }, [dashboardData]);

  return (
    <div className='px-6 py-4 flex flex-1 flex-col gap-4 w-full overflow-auto outline-0'>
      <DashboardCards
        cards={dashboardData?.cards}
        isLoading={isLoading || isFetching}
      />
      <div>
        <Card className='py-4 gap-2'>
          <CardHeader className='px-4'>
            <CardTitle>Top Requests</CardTitle>
            <CardDescription>Most upvoted feature requests</CardDescription>
          </CardHeader>
          <CardContent className='px-4'>
            <FeedbackList
              isLoading={isLoading || isFetching}
              requests={dashboardData?.latestsRequest}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
