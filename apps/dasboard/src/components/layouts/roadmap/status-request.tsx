import { FeedbackDetails } from "@/components/dialogs/feedback-detail";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Archive, ChevronUp, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
const StatusRequest = ({ item }) => {
  const [isDetailDialogOpen, setIsDetailsDialogOpen] = useState(false);

  return (
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
            <Button variant='ghost' size='icon' className='h-6 w-6 shrink-0'>
              <MoreHorizontal className='h-3 w-3' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setIsDetailsDialogOpen(true)}>
              <Eye className='h-4 w-4 mr-2' />
              View Details
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
          {item.voteCount}
        </div>

        {/* Assignee */}
        <div className='flex items-center gap-1'>
          {item.author ? (
            <Avatar className='h-5 w-5'>
              <AvatarImage
                src={item.author.displayPicture || undefined}
                alt={item.author.name}
              />
              <AvatarFallback className='text-xs'>
                {item.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className='w-5 h-5 rounded-full bg-muted flex items-center justify-center'>
              <span className='text-xs text-muted-foreground'>?</span>
            </div>
          )}
        </div>
      </div>
      <FeedbackDetails
        viewOnly
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        requestData={item}
      />
    </div>
  );
};

export { StatusRequest };
