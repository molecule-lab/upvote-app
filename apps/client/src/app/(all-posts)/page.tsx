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
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddPostDialog } from "@/components/dialogs/add-post";
import { PostDetailsDialog } from "@/components/dialogs/post-details-dialog";
import useTenant from "@/hooks/use-tenant";
import { useQueryGetFeedback } from "@/api/useQueryGetFeedback";
import { FeedbackRequest } from "@/components/layouts/all-posts/feedback-request";
import useAuth from "@/hooks/use-auth";

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
];

export default function Home() {
  const [isAddPostDialogOpen, setIsAppPostDialogOpen] = useState(false);
  const [isViewPostDialogOpen, setIsViewPostDialogOpen] = useState(false);
  const { firebaseUser, setIsLoginDialogOpen } = useAuth();
  const { tenant } = useTenant();
  const [filter, setFilter] = useState({
    category: "",
    status: "",
    search: "",
  });

  const { data: feedbackRequests } = useQueryGetFeedback(
    filter,
    Boolean(tenant)
  );

  const onFilterChangeHandler = (name, value) => {
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
            {feedbackRequests?.map((post) => (
              <FeedbackRequest key={post.id} post={post} />
            ))}
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
