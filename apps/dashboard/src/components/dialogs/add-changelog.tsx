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
import { toast } from "sonner";

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
  const [editorValue, setEditorValue] = useState<any>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState("true");

  const { mutateAsync: createChangLog, isPending: creatingChangeLog } =
    useMutationCreateChangeLog();
  const { mutateAsync: updateChangeLog, isPending: updatingChangeLog } =
    useMutationUpdateChangeLog();

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
        } as any);
        toast("Changelog Updated");
      } else {
        await createChangLog({ data: formData } as any);
        toast("Changelog Created");
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
      <DialogContent className='w-[95vw] max-w-2xl flex flex-col p-3 sm:p-6'>
        <DialogHeader className='flex-shrink-0 '>
          <DialogTitle className='text-base sm:text-xl font-semibold'>
            Add Changelog
          </DialogTitle>
          <DialogDescription className='text-xs sm:text-sm text-muted-foreground'>
            Create a new changelog entry with an image and title.
          </DialogDescription>
        </DialogHeader>

        <div className='flex flex-col gap-2 sm:gap-4  overflow-hidden'>
          {/* Image Upload Section */}
          <div className='flex gap-1 flex-col'>
            <Label className='text-xs sm:text-sm font-medium'>
              Thumbnail Image
            </Label>
            <div className='flex flex-col items-center'>
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
                <div className='w-full h-20 sm:h-28 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/30 hover:bg-muted/50 transition-colors'>
                  {logoPreview || changelogData?.coverImage ? (
                    <img
                      src={logoPreview || changelogData?.coverImage}
                      alt='Changelog thumbnail'
                      className='w-full h-full object-cover rounded-lg'
                    />
                  ) : (
                    <div className='flex flex-col items-center gap-1 text-muted-foreground px-2'>
                      <Upload className='h-4 w-4 sm:h-6 sm:w-6' />
                      <p className='text-xs font-medium text-center'>
                        Click to upload
                      </p>
                      <p className='text-xs text-center hidden sm:block'>
                        PNG or JPG
                      </p>
                    </div>
                  )}
                </div>
              </Label>
            </div>
          </div>

          {/* Title Input */}
          <div className='flex gap-1 flex-col '>
            <Label
              htmlFor='changelog-title'
              className='text-xs sm:text-sm font-medium'
            >
              Title
            </Label>
            <Input
              id='changelog-title'
              placeholder='Enter changelog title...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='h-8 sm:h-10 text-sm'
            />
          </div>

          {/* Rich Text Editor */}
          <div className='flex gap-1 flex-col'>
            <Label className='text-xs sm:text-sm font-medium'>
              Description
            </Label>
            <div className='max-h-[200px]'>
              <LexicalEditorComponent
                value={editorValue}
                viewOnly={false}
                onValueChangeHandler={(value: any) => setEditorValue(value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter className='flex-shrink-0 '>
          <div className='flex flex-col sm:flex-row justify-between w-full gap-2 sm:gap-3'>
            <div className='w-full sm:w-auto'>
              <Select
                value={isVisible}
                onValueChange={(value) => setIsVisible(value)}
              >
                <SelectTrigger className='w-full sm:w-[120px] h-8 sm:h-10 text-sm'>
                  <SelectValue placeholder='Published' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='true'>Published</SelectItem>
                  <SelectItem value='false'>Unpublished</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={onCreateUpdateChangeLog}
              disabled={
                !title.trim() ||
                isSubmitting ||
                creatingChangeLog ||
                updatingChangeLog
              }
              className='w-full sm:w-auto h-8 sm:h-10 text-sm'
            >
              {Boolean(changelogData) ? "Update" : "Create"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { AddChangelogDialog };
