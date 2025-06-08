"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import LexicalEditor from "../layouts/rich-text-editor/lexical-editor";
import { Input } from "../ui/input";
import { ChevronUp, Loader2 } from "lucide-react";
import { FeedbackType } from "../ui/feedback-type";
import { PrioritySelector } from "../ui/priority-selector";

import { ListItemVisibilityStatus } from "../ui/list-item-visibility-status";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { useMutationUpdateRequest } from "@/api/useMutationUpdateRequest";
import { toast } from "sonner";

const STATUS_VALUE_MAP = {
  "in-review": "In Review",
  "in-progress": "In Progress",
  completed: "Completed",
  declined: "Declined",
};

const TYPE_MAP = {
  issue: "Issue",
  idea: "Idea",
  feedback: "Feedback",
};

const FeedbackDetails = ({ isOpen, onClose, requestData, viewOnly }) => {
  const [title, setTitle] = useState(requestData?.title);
  const [description, setDescription] = useState(requestData?.description);
  const { mutateAsync: updateRequest, isPending: updatingRequest } =
    useMutationUpdateRequest();
  const onUpdateClickHandler = async () => {
    await updateRequest({ id: requestData.id, data: { title, description } });
    toast("Request Updated");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='flex gap-4 flex-col'>
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
        </DialogHeader>
        <Input
          disabled={viewOnly}
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <LexicalEditor
          value={description}
          viewOnly={viewOnly}
          onValueChangeHandler={(value) => setDescription(value)}
        />
        <div>
          <div className='flex gap-2 justify-between'>
            <div className='flex gap-2'>
              <Button variant='outline' className='rounded-xl cursor-pointer'>
                <ChevronUp /> {requestData.voteCount}
              </Button>
              <FeedbackType type={"feedback"} />
              <PrioritySelector priority='high' viewOnly />
            </div>
            <div className='flex gap-2'>
              <Badge variant='outline'>
                {STATUS_VALUE_MAP[requestData.status]}
              </Badge>
              <div>
                <ListItemVisibilityStatus
                  visibility={requestData.isVisible}
                  viewOnly
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          {!viewOnly && (
            <Button
              disabled={updatingRequest}
              className='cursor-pointer'
              onClick={onUpdateClickHandler}
            >
              {updatingRequest ? (
                <Loader2 className='animate-spin' />
              ) : (
                "Update"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { FeedbackDetails };
