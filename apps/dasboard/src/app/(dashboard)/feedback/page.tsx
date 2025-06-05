"use client";
import { useQueryGetFeedback } from "@/api/useQueryGetFeedback";
import FeedbackList from "@/components/layouts/feedback/feedback-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuth from "@/hooks/use-auth";
import { useEffect, useState } from "react";

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
  {
    name: "priority",
    options: [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
      { value: "urgent", label: "Urgent" },
    ],
    placeholder: "Priority",
  },
  {
    name: "visibility",
    options: [
      { value: "true", label: "Public" },
      { value: "false", label: "Private" },
    ],
    placeholder: "Visibility",
  },
];

export default function FeedbackPage() {
  const { systemUser } = useAuth();

  const [filter, setFilter] = useState({
    category: "",
    status: "",
    priority: "",
    visibility: "",
  });

  const {
    data: feedbackRequests,
    isLoading,
    isFetching,
  } = useQueryGetFeedback(filter, Boolean(systemUser));

  const onFilterChangeHandler = (name, value) => {
    setFilter((current) => ({ ...current, [name]: value }));
  };

  const onClearFilter = () => {
    setFilter({
      category: "",
      status: "",
      priority: "",
      visibility: "",
    });
  };

  return (
    <div className='px-6 py-6 flex flex-col gap-6 w-full'>
      <div className='bg-card border rounded-xl p-4 shadow-sm '>
        <div className='flex flex-wrap gap-3 items-center justify-between'>
          <div className='flex flex-wrap gap-3'>
            {FILTERS.map(({ placeholder, options, name }) => (
              <Select
                key={placeholder}
                onValueChange={(value) => onFilterChangeHandler(name, value)}
                value={filter[name]}
              >
                <SelectTrigger className='min-w-[140px] h-9 bg-background border-border hover:bg-background/80 transition-colors'>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>

          <Button
            variant='ghost'
            className='mt-2 sm:mt-0'
            onClick={onClearFilter}
          >
            Clear Filters
          </Button>
        </div>
      </div>
      <div className=' flex-1 flex  overflow-hidden'>
        <Card className='flex-1 w-full p-0'>
          <CardContent className='overflow-y-auto p-4'>
            <FeedbackList
              requests={feedbackRequests}
              isLoading={isLoading || isFetching}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
