import { useMutationDeleteRequest } from "@/api/useMutationDeleteRequest";
import { useMutationUpdateRequest } from "@/api/useMutationUpdateRequest";
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
import {
  Archive,
  ChevronUp,
  Delete,
  Eye,
  Loader2,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

const STATUS_VALUE_MAP = {
  "in-review": "In Review",
  "in-progress": "In Progress",
  completed: "Completed",
  declined: "Declined",
};

const RequestComponent = ({ requestData }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCategoryPopoverOpen, setIsCategoryPopoverOpen] = useState(false);
  const [isStatusPopoverOpen, setIsStatusPopoverOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    requestData.category
  );
  const { mutateAsync: updateRequest, isPending: isUpdatingRequest } =
    useMutationUpdateRequest();
  const { mutateAsync: deleteRequest, isPending: isDeletingRequest } =
    useMutationDeleteRequest();

  const [selectedStatus, setSelectedStatus] = useState(requestData.status);

  const onCategoryClickHandler = (category) => {
    setSelectedCategory(category);
  };

  const onStatusClickHandler = (category) => {
    setSelectedStatus(category);
  };

  const onSaveCategory = async () => {
    await updateRequest({
      id: requestData.id,
      data: { category: selectedCategory },
    });
    setIsCategoryPopoverOpen(false);
  };

  const onSaveStatus = async () => {
    await updateRequest({
      id: requestData.id,
      data: { status: selectedStatus },
    });
    setIsStatusPopoverOpen(false);
  };

  const onVisibilityToggle = async () => {
    await updateRequest({
      id: requestData.id,
      data: { isVisible: !requestData.isVisible },
    });
  };

  const onArchiveChange = async () => {
    await updateRequest({
      id: requestData.id,
      data: { isArchived: !requestData.isArchived },
    });
  };

  const onPriorityChange = async (priority) => {
    await updateRequest({
      id: requestData.id,
      data: { priority },
    });
  };

  const onDeleteRequestClick = async () => {
    await deleteRequest({ id: requestData.id });
  };

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
        <Popover
          open={isCategoryPopoverOpen}
          onOpenChange={() => setIsCategoryPopoverOpen(!isCategoryPopoverOpen)}
        >
          <PopoverTrigger>
            <div>
              <FeedbackType type={requestData.category} />
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-40 flex flex-col gap-1 bg-background p-1'>
            <Toggle
              pressed={selectedCategory === "idea"}
              onClick={() => onCategoryClickHandler("idea")}
              className='w-full flex justify-start'
            >
              Idea
            </Toggle>
            <Toggle
              pressed={selectedCategory === "issue"}
              onClick={() => onCategoryClickHandler("issue")}
              className='w-full flex justify-start'
            >
              Issue
            </Toggle>
            <Toggle
              onClick={() => onCategoryClickHandler("feedback")}
              pressed={selectedCategory === "feedback"}
              className='w-full flex justify-start'
            >
              Feedback
            </Toggle>
            <Separator />
            <Button
              variant='secondary'
              disabled={
                selectedCategory === requestData.category || isUpdatingRequest
              }
              onClick={onSaveCategory}
            >
              {isUpdatingRequest ? (
                <Loader2 className='animate-spin' />
              ) : (
                "Save"
              )}
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      <div className='w-2/12'>
        <Popover
          open={isStatusPopoverOpen}
          onOpenChange={() => setIsStatusPopoverOpen(!isStatusPopoverOpen)}
        >
          <PopoverTrigger className='w-full' asChild>
            <Button variant='outline' className='w-full cursor-pointer'>
              {STATUS_VALUE_MAP[requestData.status]}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-40 flex flex-col gap-1 bg-background p-1'>
            <Toggle
              pressed={selectedStatus === "in-review"}
              className='w-full flex justify-start'
              onClick={() => onStatusClickHandler("in-review")}
            >
              In Review
            </Toggle>
            <Toggle
              pressed={selectedStatus === "in-progress"}
              className='w-full flex justify-start'
              onClick={() => onStatusClickHandler("in-progress")}
            >
              In Progress
            </Toggle>
            <Toggle
              pressed={selectedStatus === "completed"}
              className='w-full flex justify-start'
              onClick={() => onStatusClickHandler("completed")}
            >
              Completed
            </Toggle>
            <Toggle
              pressed={selectedStatus === "declined"}
              className='w-full flex justify-start'
              onClick={() => onStatusClickHandler("declined")}
            >
              Declined
            </Toggle>
            <Separator />
            <Button
              variant='outline'
              onClick={onSaveStatus}
              disabled={
                selectedStatus === requestData.status || isUpdatingRequest
              }
            >
              {isUpdatingRequest ? (
                <Loader2 className='animate-spin' />
              ) : (
                "Save"
              )}
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <ListItemVisibilityStatus
          visibility={requestData.isVisible}
          onClick={onVisibilityToggle}
        />
      </div>
      <div>
        <PrioritySelector
          priority={requestData.priority}
          onChange={(priority) => onPriorityChange(priority)}
        />
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
            <DropdownMenuItem onClick={onArchiveChange}>
              <Archive className='h-4 w-4 mr-2' />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem
              variant='destructive'
              onClick={onDeleteRequestClick}
            >
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
