import { useMutationAddVote } from "@/api/useMutationAddVote";
import { useMutationDeleteVote } from "@/api/useMutationDeleteVote";
import { PostDetailsDialog } from "@/components/dialogs/post-details-dialog";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const RoadmapItem = ({ post }) => {
  const [isPostDetailsDialogOpen, setIsPostDetailsDialogOpen] = useState(false);
  const { firebaseUser, setIsLoginDialogOpen, userProfile } = useAuth();

  const { mutateAsync: addVote } = useMutationAddVote();
  const { mutateAsync: deleteVote } = useMutationDeleteVote();

  const hasVoted = userProfile?.votes?.some(
    (vote) => vote.requestId === post.id
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
        className='border p-2 rounded-xl hover:bg-card/70 transition-colors bg-card w-full'
        onClick={() => setIsPostDetailsDialogOpen(true)}
      >
        {/* Single row with two columns */}
        <div className='flex items-center justify-between gap-3'>
          {/* Left column: Title, time, and type badge */}
          <div className='flex-1 min-w-0'>
            <h4 className='font-medium text-sm leading-tight mb-1 truncate'>
              {post.title}
            </h4>
            <div className='flex items-center gap-2'>
              <span className='text-xs text-muted-foreground'>
                {format(post?.createdAt, "PPP")}
              </span>
            </div>
          </div>

          {/* Right column: Upvote button */}
          <div className='flex flex-col items-center gap-1 flex-shrink-0'>
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
      </div>
      <PostDetailsDialog
        isOpen={isPostDetailsDialogOpen}
        onClose={() => setIsPostDetailsDialogOpen(false)}
        post={post}
      />
    </>
  );
};

export { RoadmapItem };
