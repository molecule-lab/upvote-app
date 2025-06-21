import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  ChevronUp,
  Lightbulb,
  BadgeAlert,
  CircleEllipsis,
  ChevronDown,
} from "lucide-react";
import { lexicalJSONToPlainText } from "@/lib/lexcialJSONToPlainText";
import useAuth from "@/hooks/use-auth";
import { useMutationAddVote } from "@/api/useMutationAddVote";
import { useMutationDeleteVote } from "@/api/useMutationDeleteVote";

interface PostDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post?: any;
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
  const { firebaseUser, setIsLoginDialogOpen, userProfile } = useAuth();

  const { mutateAsync: addVote } = useMutationAddVote();
  const { mutateAsync: deleteVote } = useMutationDeleteVote();

  const hasVoted = userProfile?.votes?.some(
    (vote) => vote.requestId === post?.id
  );

  const onUpvoteClickHandler = async () => {
    if (!firebaseUser) {
      setIsLoginDialogOpen(true);
      onClose();
      return;
    }

    if (hasVoted) {
      await deleteVote({ data: { requestId: post.id } });
    }

    if (!hasVoted) {
      await addVote({ data: { requestId: post.id } });
    }
  };

  if (!post) {
    return;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-[90%] max-h-[80%] overflow-hidden'>
        <DialogHeader>
          <DialogTitle className='sr-only'>Post Details</DialogTitle>
        </DialogHeader>

        <div className='flex flex-col gap-2'>
          {/* Row 1: Title/Description on left, Votes on right */}
          <div className='flex items-start gap-4'>
            <div className='flex-1 overflow-hidden'>
              <h3 className='font-medium text-xl mb-2'>{post.title}</h3>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <Button
                variant='secondary'
                size='icon'
                className='h-9 w-9 rounded-xl border-1 cursor-pointer'
                onClick={onUpvoteClickHandler}
              >
                {hasVoted ? (
                  <ChevronDown className='h-4 w-4 stroke-primary ' />
                ) : (
                  <ChevronUp className='h-4 w-4 stroke-primary ' />
                )}
              </Button>
              <span className='text-xs font-medium'>{post.voteCount}</span>
            </div>
          </div>

          <div>
            <p className='text-sm leading-relaxed h-[300px] overflow-auto'>
              {lexicalJSONToPlainText(post.description, false)}
            </p>
          </div>

          {/* Row 2: Author/Date on left, Tags on right */}
          <div className='flex md:items-center md:justify-between md:flex-row flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <Avatar className='size-5'>
                <AvatarImage src={post.authoredBy.displayPicture} />
                <AvatarFallback className='text-xs'>
                  {post?.authoredBy?.name
                    ?.split(" ")
                    ?.map((n) => n[0])
                    ?.join("")}
                </AvatarFallback>
              </Avatar>
              <span className='text-xs text-muted-foreground'>
                {post?.authoredBy?.name}
              </span>
              <span className='text-xs text-muted-foreground'>•</span>
              <span className='text-xs text-muted-foreground'>
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Badge
                variant={getTypeVariant(post.category)}
                className={`text-xs ${getTypeClassName(post.category)}`}
              >
                {getTypeIcon(post.category)}
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </Badge>
              <Badge
                variant={getStatusVariant(post.status)}
                className='text-xs'
              >
                {post.status
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
