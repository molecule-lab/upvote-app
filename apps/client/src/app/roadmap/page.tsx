"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, Lightbulb, BadgeAlert, CircleEllipsis } from "lucide-react";
import { PostDetailsDialog } from "@/components/dialogs/post-details-dialog";
import { useEffect, useState } from "react";
import useTenant from "@/hooks/use-tenant";
import { useQueryGetRoadmap } from "@/api/useQueryGetRoadmap";
import { RoadmapItem } from "@/components/layouts/roadmap/roadmap-item";

// Mock roadmap data

const getStatusTitle = (status: string) => {
  switch (status) {
    case "in-review":
      return "In Review";
    case "in-progress":
      return "In Progress";
    case "completed":
      return "Completed";
    default:
      return status;
  }
};

const RoadmapColumn = ({ status, items }: { status: string; items: any[] }) => {
  useEffect(() => console.log(items), [items]);

  return (
    <>
      <Card className='flex-1 w-full py-2 bg-background flex flex-col max-h-[500px] md:max-h-none'>
        <CardContent className='overflow-hidden px-2 flex flex-col flex-1'>
          {/* Column Header */}
          <div className='border px-4 py-2 rounded-xl flex items-center justify-between text-sm font-medium text-muted-foreground mb-4'>
            <h3 className='font-semibold'>{getStatusTitle(status)}</h3>
            <Badge variant='secondary' className='text-xs'>
              {items.length}
            </Badge>
          </div>

          {/* Column Content */}
          <div className='flex-1 min-h-0 overflow-hidden'>
            <div className='flex flex-col gap-2 h-full overflow-y-auto'>
              {items.map((item) => (
                <RoadmapItem key={item.id} post={item} />
              ))}

              {items.length === 0 && (
                <div className='text-center py-8 text-muted-foreground'>
                  <p className='text-sm'>
                    No items in {getStatusTitle(status).toLowerCase()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default function RoadmapPage() {
  const { tenant } = useTenant();
  const { data: roadmapData } = useQueryGetRoadmap(Boolean(tenant), {});

  return (
    <div className='py-4 flex flex-col gap-4 w-full h-full'>
      {/* Desktop: 3 columns */}
      <div className='flex flex-col md:flex-row gap-4 flex-1 overflow-auto'>
        {roadmapData?.map((roadmapItem) => (
          <RoadmapColumn
            key={roadmapItem.status}
            status={roadmapItem.status}
            items={roadmapItem.items}
          />
        ))}
      </div>
    </div>
  );
}
