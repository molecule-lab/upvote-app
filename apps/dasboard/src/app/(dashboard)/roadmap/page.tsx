"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MessageSquare,
  ThumbsUp,
  MoreHorizontal,
  Eye,
  Archive,
  Trash2,
  ChevronUp,
} from "lucide-react";

// Mock roadmap data
const ROADMAP_DATA = [
  {
    id: "1",
    title: "Advanced Analytics Dashboard",
    description:
      "Comprehensive analytics with real-time metrics and custom reporting capabilities.",
    priority: "high",
    category: "feature",
    votes: 234,
    comments: 12,
    assignee: {
      name: "Alice Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
    },
    createdAt: "2024-01-15",
    status: "in-review",
  },
  {
    id: "2",
    title: "Mobile App Dark Mode",
    description: "Implement dark mode support across all mobile app screens.",
    priority: "medium",
    category: "improvement",
    votes: 189,
    comments: 8,
    assignee: {
      name: "Bob Smith",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150",
    },
    createdAt: "2024-01-12",
    status: "in-review",
  },
  {
    id: "3",
    title: "API Rate Limiting",
    description:
      "Implement proper rate limiting for all API endpoints to prevent abuse.",
    priority: "urgent",
    category: "security",
    votes: 156,
    comments: 15,
    assignee: {
      name: "Carol Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    },
    createdAt: "2024-01-18",
    status: "in-review",
  },
  {
    id: "4",
    title: "Bulk Export Feature",
    description:
      "Allow users to export large datasets in multiple formats (CSV, JSON, Excel).",
    priority: "low",
    category: "feature",
    votes: 98,
    comments: 6,
    assignee: {
      name: "David Wilson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    },
    createdAt: "2024-01-08",
    status: "in-review",
  },
  {
    id: "5",
    title: "Social Media Integration",
    description:
      "Connect with popular social media platforms for content sharing.",
    priority: "low",
    category: "feature",
    votes: 67,
    comments: 4,
    assignee: null,
    createdAt: "2024-01-20",
    status: "in-review",
  },
  {
    id: "6",
    title: "Enhanced Search Filters",
    description:
      "Add advanced filtering options with date ranges and custom criteria.",
    priority: "medium",
    category: "improvement",
    votes: 145,
    comments: 9,
    assignee: {
      name: "Emma Brown",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    },
    createdAt: "2024-01-22",
    status: "in-review",
  },
];

const STATUSES = [
  {
    key: "in-review",
    label: "In Review",
  },
  {
    key: "in-progress",
    label: "In Progress",
  },
  {
    key: "completed",
    label: "Completed",
  },
  {
    key: "declined",
    label: "Declined",
  },
];

export default function RoadmapPage() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "feature":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "improvement":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "security":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getItemsByStatus = (status: string) => {
    return ROADMAP_DATA.filter((item) => item.status === status);
  };

  return (
    <div className='px-6 py-4 flex flex-col gap-4 w-full h-full'>
      {/* Kanban Board */}
      <div className='flex-1 overflow-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4'>
        {STATUSES.map((status) => {
          const items = getItemsByStatus(status.key);

          return (
            <div className='flex-1 flex overflow-hidden  min-h-[500px]'>
              <Card key={status.key} className='flex-1 w-full p-0'>
                <CardContent className='overflow-hidden p-4'>
                  {/* Column Header */}
                  <div className='border px-4 py-2 rounded-xl flex items-center justify-between text-sm font-medium text-muted-foreground mb-4'>
                    <h3 className='font-semibold'>{status.label}</h3>
                    <Badge variant='secondary' className='text-xs'>
                      {items.length}
                    </Badge>
                  </div>

                  {/* Column Content */}
                  <div className='flex-1 h-full overflow-y-auto'>
                    <div className='space-y-2'>
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className='border p-2 rounded-xl flex flex-col gap-2 hover:bg-muted/30 transition-colors'
                        >
                          {/* Header Row */}
                          <div className='flex items-start justify-between gap-2'>
                            <h4 className='font-medium text-sm leading-tight line-clamp-2 flex-1'>
                              {item.title}
                            </h4>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='h-6 w-6 shrink-0'
                                >
                                  <MoreHorizontal className='h-3 w-3' />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Eye className='h-4 w-4 mr-2' />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Archive className='h-4 w-4 mr-2' />
                                  Archive
                                </DropdownMenuItem>
                                <DropdownMenuItem className='text-destructive'>
                                  <Trash2 className='h-4 w-4 mr-2' />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {/* Description */}
                          <p className='text-xs text-muted-foreground line-clamp-2'>
                            {item.description}
                          </p>

                          {/* Stats Row */}
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                              <ChevronUp className='h-3 w-3' />
                              {item.votes}
                            </div>

                            {/* Assignee */}
                            <div className='flex items-center gap-1'>
                              {item.assignee ? (
                                <Avatar className='h-5 w-5'>
                                  <AvatarImage
                                    src={item.assignee.avatar || undefined}
                                    alt={item.assignee.name}
                                  />
                                  <AvatarFallback className='text-xs'>
                                    {item.assignee.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              ) : (
                                <div className='w-5 h-5 rounded-full bg-muted flex items-center justify-center'>
                                  <span className='text-xs text-muted-foreground'>
                                    ?
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {items.length === 0 && (
                        <div className='text-center py-8 text-muted-foreground'>
                          <p className='text-sm'>
                            No items in {status.label.toLowerCase()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
