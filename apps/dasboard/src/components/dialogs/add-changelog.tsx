"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Upload, Image as ImageIcon } from "lucide-react";
import { LexicalEditor } from "lexical";
import LexicalEditorComponent from "../layouts/rich-text-editor/lexical-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AddChangelogDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddChangelogDialog = ({ isOpen, onClose }: AddChangelogDialogProps) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Handle submit logic here
    console.log("Creating changelog:", { title, image });

    // Reset form and close dialog
    setTitle("");
    setImage(null);
    setIsSubmitting(false);
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setImage(null);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='min-w-8/12'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold'>
            Add Changelog
          </DialogTitle>
          <DialogDescription className='text-sm text-muted-foreground'>
            Create a new changelog entry with an image and title.
          </DialogDescription>
        </DialogHeader>

        <div className='flex flex-col gap-2'>
          {/* Image Upload Section */}
          <div className='space-y-2'>
            <Label className='text-sm font-medium'>Thumbnail Image</Label>
            <div className='flex flex-col items-center gap-2'>
              {/* Image Preview/Upload Area */}
              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className='hidden'
                id='changelog-image-upload'
              />
              <Label
                htmlFor='changelog-image-upload'
                className='w-full cursor-pointer'
              >
                <div className='w-full h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/30 hover:bg-muted/50 transition-colors'>
                  {image ? (
                    <img
                      src={image}
                      alt='Changelog thumbnail'
                      className='w-full h-full object-cover rounded-lg'
                    />
                  ) : (
                    <div className='flex flex-col items-center gap-2 text-muted-foreground'>
                      <Upload className='h-8 w-8' />
                      <p className='text-sm font-medium'>
                        Click to upload image
                      </p>
                      <p className='text-xs'>
                        Recommended: 16:9 aspect ratio, PNG or JPG
                      </p>
                    </div>
                  )}
                </div>
              </Label>
            </div>
          </div>

          {/* Title Input */}
          <div className='space-y-2'>
            <Label htmlFor='changelog-title' className='text-sm font-medium'>
              Title
            </Label>
            <Input
              id='changelog-title'
              placeholder='Enter changelog title...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='h-10'
            />
          </div>

          <div>
            <LexicalEditorComponent />
          </div>
        </div>

        <DialogFooter>
          <div className='flex justify-between w-full'>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Published' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='published'>Pubished</SelectItem>
                  <SelectItem value='unpublished'>Unpublished</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!title.trim() || isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Changelog"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { AddChangelogDialog };
