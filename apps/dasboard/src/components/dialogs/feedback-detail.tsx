"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import LexicalEditor from "../layouts/rich-text-editor/lexical-editor";
import { Input } from "../ui/input";
import { Badge, ChevronUp } from "lucide-react";
import { FeedbackType } from "../ui/feedback-type";
import { PrioritySelector } from "../ui/priority-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ListItemVisibilityStatus } from "../ui/list-item-visibility-status";

const FeedbackDetails = ({ isOpen, onClose }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write feedback here...</p>",
  });

  if (!editor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='flex gap-4 flex-col'>
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
        </DialogHeader>
        <Input placeholder='Title' />
        <LexicalEditor />
        <div>
          <div className='flex gap-2 justify-between'>
            <div className='flex gap-2'>
              <Button variant='outline' className='rounded-xl cursor-pointer'>
                <ChevronUp /> 100
              </Button>
              <FeedbackType type={"feedback"} />
              <PrioritySelector priority='high' />
            </div>
            <div className='flex gap-2'>
              <div>
                <Select>
                  <SelectTrigger className='w-full h-9 bg-background border-border hover:bg-background/80 transition-colors'>
                    <SelectValue placeholder='Status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='draft'>Draft</SelectItem>
                    <SelectItem value='in-review'>In Review</SelectItem>
                    <SelectItem value='in-progress'>In Progress</SelectItem>
                    <SelectItem value='completed'>Completed</SelectItem>
                    <SelectItem value='declined'>Declined</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <ListItemVisibilityStatus />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { FeedbackDetails };
