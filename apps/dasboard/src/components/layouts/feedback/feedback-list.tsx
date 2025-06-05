"use client";
import { MessageSquareText } from "lucide-react";

import { useState } from "react";
import { FeedbackDetails } from "../../dialogs/feedback-detail";

import { Skeleton } from "../../ui/skeleton";
import { RequestComponent } from "./request";

const FeedbackList = ({ requests, isLoading }) => {
  if (isLoading) {
    return (
      <div className='flex gap-2 flex-col'>
        {Array(5)
          .fill(".")
          .map(() => (
            <Skeleton className='h-14 bg-background/50' />
          ))}
      </div>
    );
  }

  // Empty state when no requests
  if (!requests || requests.length === 0) {
    return (
      <div className='text-center py-12 text-muted-foreground'>
        <div className='w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4'>
          <MessageSquareText className='w-8 h-8' />
        </div>
        <h3 className='text-lg font-medium text-foreground mb-2'>
          No feedback yet
        </h3>
        <p className='text-sm'>
          When users submit feedback requests, they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2 '>
      {requests?.map((request) => <RequestComponent requestData={request} />)}
    </div>
  );
};

export default FeedbackList;
