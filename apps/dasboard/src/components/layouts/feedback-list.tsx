"use client";
import {
  Archive,
  ChevronUp,
  Delete,
  Eye,
  MoreHorizontal,
  MessageSquareText,
} from "lucide-react";
import { Button } from "../ui/button";
import { FeedbackType } from "../ui/feedback-type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ListItemVisibilityStatus } from "../ui/list-item-visibility-status";
import { PrioritySelector } from "../ui/priority-selector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { FeedbackDetails } from "../dialogs/feedback-detail";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Toggle } from "../ui/toggle";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const FeedbackList = ({ requests, isLoading }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className='flex gap-2 flex-col'>
        {Array(5)
          .fill(".")
          .map(() => (
            <Skeleton className='h-14 bg-background/50' />
          ))}
      </div>
    );
  }

  // Empty state when no requests
  if (!requests || requests.length === 0) {
    return (
      <div className='text-center py-12 text-muted-foreground'>
        <div className='w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4'>
          <MessageSquareText className='w-8 h-8' />
        </div>
        <h3 className='text-lg font-medium text-foreground mb-2'>
          No feedback yet
        </h3>
        <p className='text-sm'>
          When users submit feedback requests, they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2 '>
      {requests?.map((request) => {
        return (
          <div className='border p-2 rounded-xl flex gap-2 items-center hover:bg-muted/30'>
            <div className='w-16'>
              <Badge
                variant='outline'
                className='rounded bg-primary/10 border-primary/30 h-8 w-full'
              >
                <ChevronUp className='stroke-primary' /> {request.voteCount}
              </Badge>
            </div>
            <div>{request.request.title}</div>

            <div className='ml-auto'>
              <Popover>
                <PopoverTrigger>
                  <FeedbackType type={request.request.category} />
                </PopoverTrigger>
                <PopoverContent className='w-40 flex flex-col gap-1 bg-background p-2'>
                  <Toggle pressed={true} className='w-full flex justify-start'>
                    Idea
                  </Toggle>
                  <Toggle className='w-full flex justify-start'>Issue</Toggle>
                  <Toggle className='w-full flex justify-start'>
                    Feedback
                  </Toggle>
                </PopoverContent>
              </Popover>
            </div>
            <div className='w-2/12'>
              <Popover>
                <PopoverTrigger className='w-full'>
                  <Button variant='outline' className='w-full'>
                    {request.request.status}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-40 flex flex-col gap-1 bg-background'>
                  <Toggle className='w-full flex justify-start'>
                    In Review
                  </Toggle>
                  <Toggle className='w-full flex justify-start'>
                    In Progress
                  </Toggle>
                  <Toggle className='w-full flex justify-start'>
                    Completed
                  </Toggle>
                  <Toggle className='w-full flex justify-start'>
                    Declined
                  </Toggle>
                  <Separator />
                  <Button>Save</Button>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <ListItemVisibilityStatus />
            </div>
            <div>
              <PrioritySelector priority={request.request.priority} />
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                    <Eye className='h-4 w-4 mr-2' />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className='h-4 w-4 mr-2' />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem variant='destructive'>
                    <Delete className='h-4 w-4 mr-2' />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        );
      })}
      <FeedbackDetails
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default FeedbackList;
