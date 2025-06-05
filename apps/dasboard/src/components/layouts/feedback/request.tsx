import { FeedbackDetails } from "@/components/dialogs/feedback-detail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FeedbackType } from "@/components/ui/feedback-type";
import { ListItemVisibilityStatus } from "@/components/ui/list-item-visibility-status";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PrioritySelector } from "@/components/ui/priority-selector";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { Archive, ChevronUp, Delete, Eye, MoreHorizontal } from "lucide-react";
import { useState } from "react";

const STATUS_VALUE_MAP = {
  "in-review": "In Review",
  "in-progress": "In Progress",
  completed: "Completed",
  declined: "Declined",
};

const RequestComponent = ({ requestData }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className='border p-2 rounded-xl flex gap-2 items-center hover:bg-muted/30'>
      <div className='w-16'>
        <Badge
          variant='outline'
          className='rounded bg-primary/10 border-primary/30 h-8 w-full'
        >
          <ChevronUp className='stroke-primary' /> {requestData.voteCount}
        </Badge>
      </div>
      <div>{requestData.title}</div>

      <div className='ml-auto'>
        <Popover>
          <PopoverTrigger>
            <FeedbackType type={requestData.category} />
          </PopoverTrigger>
          <PopoverContent className='w-40 flex flex-col gap-1 bg-background p-2'>
            <Toggle pressed={true} className='w-full flex justify-start'>
              Idea
            </Toggle>
            <Toggle className='w-full flex justify-start'>Issue</Toggle>
            <Toggle className='w-full flex justify-start'>Feedback</Toggle>
          </PopoverContent>
        </Popover>
      </div>
      <div className='w-2/12'>
        <Popover>
          <PopoverTrigger className='w-full'>
            <Button variant='outline' className='w-full'>
              {STATUS_VALUE_MAP[requestData.status]}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-40 flex flex-col gap-1 bg-background'>
            <Toggle className='w-full flex justify-start'>In Review</Toggle>
            <Toggle className='w-full flex justify-start'>In Progress</Toggle>
            <Toggle className='w-full flex justify-start'>Completed</Toggle>
            <Toggle className='w-full flex justify-start'>Declined</Toggle>
            <Separator />
            <Button>Save</Button>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <ListItemVisibilityStatus />
      </div>
      <div>
        <PrioritySelector priority={requestData.priority} />
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
      <FeedbackDetails
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        requestData={requestData}
      />
    </div>
  );
};

export { RequestComponent };
