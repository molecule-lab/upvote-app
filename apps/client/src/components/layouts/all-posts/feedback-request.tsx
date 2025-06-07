import { useMutationAddVote } from "@/api/useMutationAddVote";
import { useMutationDeleteVote } from "@/api/useMutationDeleteVote";
import { AddPostDialog } from "@/components/dialogs/add-post";
import { PostDetailsDialog } from "@/components/dialogs/post-details-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { lexicalJSONToPlainText } from "@/lib/lexcialJSONToPlainText";
import {
  BadgeAlert,
  ChevronDown,
  ChevronUp,
  CircleEllipsis,
  Lightbulb,
} from "lucide-react";
import { useEffect, useState } from "react";
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
      return "outline";
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

const FeedbackRequest = ({ post }) => {
  const [isViewPostDialogOpen, setIsViewPostDialogOpen] = useState(false);
  const { firebaseUser, setIsLoginDialogOpen, userProfile } = useAuth();

  const { mutateAsync: addVote } = useMutationAddVote();
  const { mutateAsync: deleteVote } = useMutationDeleteVote();

  const hasVoted = userProfile?.votes?.some(
    (vote) => vote.requestId === post.id
  );
  const isUserPost = userProfile?.posts?.some(
    (userPost) => userPost.id === post.id
  );

  const onUpvoteClickHandler = async (e) => {
    e.stopPropagation();

    if (!firebaseUser) {
      setIsLoginDialogOpen(true);
      return;
    }

    if (hasVoted) {
      await deleteVote({ data: { requestId: post.id } });
    }

    if (!hasVoted) {
      await addVote({ data: { requestId: post.id } });
    }
  };

  return (
    <>
      <div
        key={post.id}
        className='border p-3 rounded-xl transition-colors bg-card hover:bg-card/70 '
        onClick={() => setIsViewPostDialogOpen(true)}
      >
        <div className='flex items-start gap-2 mb-2'>
          <div className='flex-1'>
            <h3 className='font-medium text-base mb-1'>{post.title}</h3>
            <p className='text-xs '>
              {lexicalJSONToPlainText(post.description)}
            </p>
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

        <div className='flex md:items-center md:justify-between md:flex-row flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <Avatar className='size-5'>
              <AvatarImage
                src={post.authoredBy.displayPicture}
                alt={post.authoredBy.name}
              />
              <AvatarFallback className='text-xs'>
                {post.authoredBy.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className='text-xs text-muted-foreground'>
              {isUserPost ? "Created by You" : post.authoredBy.name}
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
            <Badge variant={getStatusVariant(post.status)} className='text-xs'>
              {post.status
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Badge>
          </div>
        </div>
      </div>
      {!isUserPost && (
        <PostDetailsDialog
          isOpen={isViewPostDialogOpen}
          onClose={() => setIsViewPostDialogOpen(false)}
          post={post}
        />
      )}

      {isUserPost && (
        <AddPostDialog
          isOpen={isViewPostDialogOpen}
          onClose={() => setIsViewPostDialogOpen(false)}
          post={post}
        />
      )}
    </>
  );
};

export { FeedbackRequest };
