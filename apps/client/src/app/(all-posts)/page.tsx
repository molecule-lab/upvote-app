"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, MessageSquareText } from "lucide-react";
import { useState } from "react";
import { AddPostDialog } from "@/components/dialogs/add-post";
import { PostDetailsDialog } from "@/components/dialogs/post-details-dialog";
import useTenant from "@/hooks/use-tenant";
import { useQueryGetFeedback } from "@/api/useQueryGetFeedback";
import { FeedbackRequest } from "@/components/layouts/all-posts/feedback-request";
import useAuth from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

const FILTERS = [
  {
    name: "category",
    options: [
      { value: "idea", label: "Idea" },
      { value: "issue", label: "Issue" },
      { value: "feedback", label: "Feedback" },
    ],
    placeholder: "Category",
  },
  {
    name: "status",
    options: [
      { value: "in-review", label: "In Review" },
      { value: "in-progress", label: "In Progress" },
      { value: "completed", label: "Completed" },
      { value: "declined", label: "Declined" },
    ],
    placeholder: "Status",
  },
] as const;

type FilterName = "category" | "status" | "search";

export default function Home() {
  const [isAddPostDialogOpen, setIsAppPostDialogOpen] = useState(false);
  const [isViewPostDialogOpen, setIsViewPostDialogOpen] = useState(false);
  const { firebaseUser, setIsLoginDialogOpen } = useAuth();
  const { tenant } = useTenant();
  const [filter, setFilter] = useState<Record<FilterName, string>>({
    category: "",
    status: "",
    search: "",
  });

  const { data: feedbackRequests, isLoading: isFetchingFeedback } =
    useQueryGetFeedback(filter, Boolean(tenant));

  const onFilterChangeHandler = (name: FilterName, value: string) => {
    setFilter((current) => ({ ...current, [name]: value }));
  };

  const onAddPostClickHandler = () => {
    if (!firebaseUser) {
      setIsLoginDialogOpen(true);
      return;
    }

    setIsAppPostDialogOpen(true);
  };

  const onClickClearFilters = () => {
    setFilter({ category: "", status: "", search: "" });
  };

  return (
    <div className=' py-4 flex w-full h-full'>
      <div className=' flex-1 flex overflow-hidden'>
        <Card className='bg-background w-full flex-1 p-2 gap-2'>
          <CardHeader className='px-0'>
            <div className='sm:hidden space-y-2'>
              <div className='flex items-center gap-2'>
                <Input
                  placeholder='Search'
                  className='flex-1'
                  value={filter.search}
                  onChange={(e) =>
                    setFilter((current) => ({
                      ...current,
                      search: e.target.value,
                    }))
                  }
                />

                <Button
                  className='sm:w-auto sm:px-4'
                  size='icon'
                  onClick={onAddPostClickHandler}
                >
                  <Plus className='sm:mr-2' />
                  <span className='hidden sm:inline'>Post</span>
                </Button>
              </div>

              <div className='flex items-center gap-2'>
                {FILTERS.map(({ placeholder, options, name }) => (
                  <Select
                    key={placeholder}
                    onValueChange={(value) =>
                      onFilterChangeHandler(name, value)
                    }
                    value={filter[name]}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ))}
                <Button onClick={onClickClearFilters} variant='ghost'>
                  Clear Filters
                </Button>
              </div>
            </div>

            <div className='hidden sm:flex items-center gap-2'>
              <Input
                placeholder='Search'
                className='w-64'
                value={filter.search}
                onChange={(e) =>
                  setFilter((current) => ({
                    ...current,
                    search: e.target.value,
                  }))
                }
              />
              {FILTERS.map(({ placeholder, options, name }) => (
                <Select
                  key={placeholder}
                  onValueChange={(value) => onFilterChangeHandler(name, value)}
                  value={filter[name]}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
              <Button onClick={onClickClearFilters} variant='ghost'>
                Clear Filters
              </Button>

              <div className='ml-auto'>
                <Button onClick={onAddPostClickHandler}>
                  <Plus /> Post
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className='flex-1 px-0 gap-2 flex flex-col overflow-y-auto'>
            {isFetchingFeedback && (
              <div className='flex flex-col gap-2'>
                {Array(6)
                  .fill(".")
                  .map((_, index) => {
                    return (
                      <Skeleton
                        key={`skel_${index}`}
                        className='h-[80px] w-full rounded-xl bg-card/70'
                      />
                    );
                  })}
              </div>
            )}

            {!isFetchingFeedback &&
              feedbackRequests?.map((post: any) => (
                <FeedbackRequest key={post.id} post={post} />
              ))}

            {!isFetchingFeedback && feedbackRequests?.length === 0 && (
              <div className='text-center py-12 text-muted-foreground'>
                <div className='w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <MessageSquareText className='w-8 h-8' />
                </div>
                <h3 className='text-lg font-medium text-foreground mb-2'>
                  No posts yet
                </h3>
                <p className='text-sm'>
                  Be the first to share your ideas and feedback. Click the Post
                  button to get started!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <AddPostDialog
        isOpen={isAddPostDialogOpen}
        onClose={() => setIsAppPostDialogOpen(false)}
      />
      <PostDetailsDialog
        isOpen={isViewPostDialogOpen}
        onClose={() => setIsViewPostDialogOpen(false)}
      />
    </div>
  );
}
