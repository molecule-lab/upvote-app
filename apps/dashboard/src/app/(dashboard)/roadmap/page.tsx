"use client";

import { useQueryGetRoadmap } from "@/api/useQueryGetRoadmap";
import useAuth from "@/hooks/use-auth";
import { StatusContainer } from "@/components/layouts/roadmap/status-container";

// Mock roadmap data

export default function RoadmapPage() {
  const { systemUser } = useAuth();
  const { data: roadmap } = useQueryGetRoadmap(Boolean(systemUser));

  return (
    <div className='px-6 py-4 flex flex-col gap-4 w-full h-full'>
      {/* Kanban Board */}
      <div className='flex-1 overflow-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4'>
        {roadmap?.map((statusData, index) => {
          return (
            <StatusContainer
              key={`${statusData.status}_${index}`}
              statusData={statusData}
            />
          );
        })}
      </div>
    </div>
  );
}
