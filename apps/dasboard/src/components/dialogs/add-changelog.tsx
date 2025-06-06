"use client";

import { useEffect, useState } from "react";
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
import { useMutationCreateChangeLog } from "@/api/useMutationCreateChangelog";
import { useMutationUpdateChangeLog } from "@/api/useMutationUpdateChangelog";

interface AddChangelogDialogProps {
  isOpen: boolean;
  onClose: () => void;
  changelogData?: any;
}

const AddChangelogDialog = ({
  isOpen,
  onClose,
  changelogData,
}: AddChangelogDialogProps) => {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editorValue, setEditorValue] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isVisible, setIsVisible] = useState("true");

  const { mutateAsync: createChangLog } = useMutationCreateChangeLog();
  const { mutateAsync: updateChangeLog } = useMutationUpdateChangeLog();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Store the actual file object
      setLogoFile(file);

      // Create preview URL for display
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setTitle("");
    setLogoPreview(null);
    setLogoFile(null);
    setIsSubmitting(false);
    onClose();
  };

  const onCreateUpdateChangeLog = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", JSON.stringify(editorValue));
      formData.append("isVisible", isVisible);

      if (logoFile) {
        formData.append("file", logoFile);
      }

      if (Boolean(changelogData)) {
        await updateChangeLog({
          data: formData,
          changeLogId: changelogData.id,
        });
      } else {
        await createChangLog({ data: formData });
      }
    } catch (error) {
    } finally {
      setLogoPreview(null);
      setLogoFile(null);
    }
  };

  useEffect(() => {
    setTitle(changelogData?.title || "");
    setEditorValue(changelogData?.description || "");
    setIsVisible(changelogData?.isVisible.toString() || "true");
  }, [isOpen, changelogData]);

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
                  {logoPreview || changelogData?.coverImage ? (
                    <img
                      src={logoPreview || changelogData?.coverImage}
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
            <LexicalEditorComponent
              value={editorValue}
              onValueChangeHandler={(value) => setEditorValue(value)}
            />
          </div>
        </div>

        <DialogFooter>
          <div className='flex justify-between w-full'>
            <div>
              <Select
                value={isVisible}
                onValueChange={(value) => setIsVisible(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Published' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='true'>Pubished</SelectItem>
                  <SelectItem value='false'>Unpublished</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={onCreateUpdateChangeLog}
              disabled={!title.trim() || isSubmitting}
            >
              {Boolean(changelogData) ? "Update Changelog" : "Create Changelog"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { AddChangelogDialog };
