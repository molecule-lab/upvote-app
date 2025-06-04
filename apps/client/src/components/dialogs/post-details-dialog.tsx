import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { ChevronUp, Lightbulb, BadgeAlert, CircleEllipsis } from "lucide-react";

interface PostDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post?: {
    id: number;
    title: string;
    description: string;
    author: string;
    date: string;
    type: string;
    status: string;
    votes: number;
  };
}

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

const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "default";
    case "in-progress":
      return "secondary";
    case "in-review":
      return "outline";
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

const PostDetailsDialog = ({
  isOpen,
  onClose,
  post,
}: PostDetailsDialogProps) => {
  // Dummy post for testing
  const dummyPost = {
    id: 1,
    title: "Add dark mode support",
    description:
      "It would be great to have a dark mode option for better user experience during night time usage. This feature would help reduce eye strain and provide a more comfortable viewing experience in low-light environments.",
    author: "John Doe",
    date: "2024-01-15",
    type: "idea",
    status: "in-review",
    votes: 12,
  };

  const displayPost = post || dummyPost;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='sr-only'>Post Details</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          {/* Row 1: Title/Description on left, Votes on right */}
          <div className='flex items-start gap-4'>
            <div className='flex-1'>
              <h3 className='font-medium text-base mb-2'>
                {displayPost.title}
              </h3>
              <p className='text-xs leading-relaxed'>
                {displayPost.description}
              </p>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <Button
                variant='secondary'
                size='icon'
                className='h-9 w-9 rounded-xl border-1'
              >
                <ChevronUp className='h-4 w-4 stroke-primary' />
              </Button>
              <span className='text-xs font-medium'>{displayPost.votes}</span>
            </div>
          </div>

          {/* Row 2: Author/Date on left, Tags on right */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Avatar className='size-5'>
                <AvatarFallback className='text-xs'>
                  {displayPost.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className='text-xs text-muted-foreground'>
                {displayPost.author}
              </span>
              <span className='text-xs text-muted-foreground'>•</span>
              <span className='text-xs text-muted-foreground'>
                {new Date(displayPost.date).toLocaleDateString()}
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Badge
                variant={getTypeVariant(displayPost.type)}
                className={`text-xs ${getTypeClassName(displayPost.type)}`}
              >
                {getTypeIcon(displayPost.type)}
                {displayPost.type.charAt(0).toUpperCase() +
                  displayPost.type.slice(1)}
              </Badge>
              <Badge
                variant={getStatusVariant(displayPost.status)}
                className='text-xs'
              >
                {displayPost.status
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { PostDetailsDialog };
