"use client";
import { useQueryGetDashboard } from "@/api/useQueryGetDashboard";
import { DashboardCards } from "@/components/layouts/dashboard/dashboard-cards";
import FeedbackList from "@/components/layouts/feedback/feedback-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuth from "@/hooks/use-auth";

import { useEffect } from "react";

export default function Dashboard() {
  const { systemUser } = useAuth();

  const { data: dashboardData, isLoading } = useQueryGetDashboard(
    Boolean(systemUser)
  );

  return (
    <div className='px-6 py-4 flex flex-1 flex-col gap-4 w-full overflow-auto outline-0'>
      <DashboardCards cards={dashboardData?.cards} isLoading={isLoading} />
      <div>
        <Card className='py-4 gap-2'>
          <CardHeader className='px-4'>
            <CardTitle>Top Requests</CardTitle>
            <CardDescription>Most upvoted feature requests</CardDescription>
          </CardHeader>
          <CardContent className='px-4'>
            <FeedbackList
              isLoading={isLoading}
              requests={dashboardData?.latestsRequest}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
