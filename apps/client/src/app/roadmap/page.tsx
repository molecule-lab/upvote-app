"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, Lightbulb, BadgeAlert, CircleEllipsis } from "lucide-react";
import { PostDetailsDialog } from "@/components/dialogs/post-details-dialog";
import { useState } from "react";

// Mock roadmap data
const roadmapItems = [
  {
    id: 1,
    title: "Add dark mode support",
    type: "idea",
    status: "in-review",
    votes: 12,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Advanced search filters",
    type: "idea",
    status: "in-review",
    votes: 8,
    createdAt: "2024-01-14",
  },
  {
    id: 3,
    title: "Fix login button issue",
    type: "issue",
    status: "in-progress",
    votes: 15,
    createdAt: "2024-01-13",
  },
  {
    id: 4,
    title: "Improve mobile responsiveness",
    type: "feedback",
    status: "in-progress",
    votes: 23,
    createdAt: "2024-01-12",
  },
  {
    id: 5,
    title: "User authentication system",
    type: "idea",
    status: "completed",
    votes: 45,
    createdAt: "2024-01-10",
  },
  {
    id: 6,
    title: "Database optimization",
    type: "issue",
    status: "completed",
    votes: 32,
    createdAt: "2024-01-08",
  },
  {
    id: 1,
    title: "Add dark mode support",
    type: "idea",
    status: "in-review",
    votes: 12,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Advanced search filters",
    type: "idea",
    status: "in-review",
    votes: 8,
    createdAt: "2024-01-14",
  },
  {
    id: 3,
    title: "Fix login button issue",
    type: "issue",
    status: "in-progress",
    votes: 15,
    createdAt: "2024-01-13",
  },
  {
    id: 4,
    title: "Improve mobile responsiveness",
    type: "feedback",
    status: "in-progress",
    votes: 23,
    createdAt: "2024-01-12",
  },
  {
    id: 5,
    title: "User authentication system",
    type: "idea",
    status: "completed",
    votes: 45,
    createdAt: "2024-01-10",
  },
  {
    id: 6,
    title: "Database optimization",
    type: "issue",
    status: "completed",
    votes: 32,
    createdAt: "2024-01-08",
  },
  {
    id: 1,
    title: "Add dark mode support",
    type: "idea",
    status: "in-review",
    votes: 12,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Advanced search filters",
    type: "idea",
    status: "in-review",
    votes: 8,
    createdAt: "2024-01-14",
  },
  {
    id: 3,
    title: "Fix login button issue",
    type: "issue",
    status: "in-progress",
    votes: 15,
    createdAt: "2024-01-13",
  },
  {
    id: 4,
    title: "Improve mobile responsiveness",
    type: "feedback",
    status: "in-progress",
    votes: 23,
    createdAt: "2024-01-12",
  },
  {
    id: 5,
    title: "User authentication system",
    type: "idea",
    status: "completed",
    votes: 45,
    createdAt: "2024-01-10",
  },
  {
    id: 6,
    title: "Database optimization",
    type: "issue",
    status: "completed",
    votes: 32,
    createdAt: "2024-01-08",
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "idea":
      return <Lightbulb className='h-3 w-3' />;
    case "issue":
      return <BadgeAlert className='h-3 w-3' />;
    case "feedback":
      return <CircleEllipsis className='h-3 w-3' />;
    default:
      return null;
  }
};

const getTypeVariant = (type: string) => {
  switch (type) {
    case "idea":
      return "secondary";
    case "issue":
      return "destructive";
    case "feedback":
      return "default";
    default:
      return "outline";
  }
};

const getTypeClassName = (type: string) => {
  switch (type) {
    case "idea":
      return "bg-blue-500 text-white border-blue-500 hover:bg-blue-600";
    case "issue":
      return "";
    case "feedback":
      return "";
    default:
      return "";
  }
};

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

const getItemsByStatus = (status: string) => {
  return roadmapItems.filter((item) => item.status === status);
};

const RoadmapColumn = ({ status, items }: { status: string; items: any[] }) => {
  const [isPostDetailsDialogOpen, setIsPostDetailsDialogOpen] = useState(false);
  return (
    <>
      <Card className='flex-1 w-full py-2 bg-background'>
        <CardContent className='overflow-y-auto px-2 '>
          {/* Column Header */}
          <div className='border px-4 py-2 rounded-xl flex items-center justify-between text-sm font-medium text-muted-foreground mb-4'>
            <h3 className='font-semibold'>{getStatusTitle(status)}</h3>
            <Badge variant='secondary' className='text-xs'>
              {items.length}
            </Badge>
          </div>

          {/* Column Content */}
          <div className='flex-1 min-h-0 overflow-y-auto'>
            <div className='space-y-2'>
              {items.map((item) => (
                <div
                  key={item.id}
                  className='border p-2 rounded-xl hover:bg-card/70 transition-colors bg-card'
                  onClick={() => setIsPostDetailsDialogOpen(true)}
                >
                  {/* Single row with two columns */}
                  <div className='flex items-center justify-between gap-3'>
                    {/* Left column: Title, time, and type badge */}
                    <div className='flex-1 min-w-0'>
                      <h4 className='font-medium text-sm leading-tight mb-1 truncate'>
                        {item.title}
                      </h4>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs text-muted-foreground'>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Right column: Upvote button */}
                    <div className='flex flex-col items-center gap-1 flex-shrink-0'>
                      <Button
                        variant='secondary'
                        size='icon'
                        className='h-9 w-9 rounded-xl border-1'
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Vote Up");
                        }}
                      >
                        <ChevronUp className='h-4 w-4 stroke-primary' />
                      </Button>
                      <span className='text-xs font-medium'>{item.votes}</span>
                    </div>
                  </div>
                </div>
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
      <PostDetailsDialog
        isOpen={isPostDetailsDialogOpen}
        onClose={() => setIsPostDetailsDialogOpen(false)}
      />
    </>
  );
};

export default function RoadmapPage() {
  const inReviewItems = getItemsByStatus("in-review");
  const inProgressItems = getItemsByStatus("in-progress");
  const completedItems = getItemsByStatus("completed");

  return (
    <div className='py-4 flex flex-col gap-4 w-full h-full'>
      {/* Desktop: 3 columns */}
      <div className='hidden md:flex gap-4 flex-1 overflow-auto'>
        <RoadmapColumn status='in-review' items={inReviewItems} />
        <RoadmapColumn status='in-progress' items={inProgressItems} />
        <RoadmapColumn status='completed' items={completedItems} />
      </div>

      {/* Mobile: 3 rows */}
      <div className='md:hidden space-y-4'>
        <RoadmapColumn status='in-review' items={inReviewItems} />
        <RoadmapColumn status='in-progress' items={inProgressItems} />
        <RoadmapColumn status='completed' items={completedItems} />
      </div>
    </div>
  );
}
