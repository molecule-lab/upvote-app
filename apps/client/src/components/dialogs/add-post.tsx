import { useEffect, useState } from "react";
import LexicalEditorComponent from "../layouts/rich-text-editor/lexical-editor";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutationCreatePost } from "@/api/useMutationCreatePost";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useMutationUpdatePost } from "@/api/useMutationUpdateFeedback";

interface AddPostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post?: any;
}

const AddPostDialog = ({ isOpen, onClose, post }: AddPostDialogProps) => {
  const [editorValue, setEditorValue] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<{ title?: string; category?: string }>(
    {}
  );
  const { mutateAsync: createPost, isPending: isCreatePostPending } =
    useMutationCreatePost();
  const { mutateAsync: updatePost, isPending: isUpdatePostPending } =
    useMutationUpdatePost();
  const validateFields = () => {
    const newErrors: { title?: string; category?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onCloseHandler = () => {
    setCategory("");
    setEditorValue(null);
    setTitle("");
    onClose();
  };
  const onSubmitHandler = async () => {
    if (!validateFields()) {
      return;
    }

    const data = {
      title: title,
      description: editorValue,
      category: category,
    };

    if (Boolean(post)) {
      await updatePost({ data, requestId: post.id });
    } else {
      await createPost({ data });
    }

    toast(`${category} ${Boolean(post) ? "updated" : "created"} successfully`);
    onCloseHandler();
  };

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setEditorValue(post.description);
      setCategory(post.category);
    }
  }, [post, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onCloseHandler}>
      <DialogContent className='max-w-[95vw] w-full sm:max-w-[500px] max-h-[90vh] flex flex-col p-4 sm:p-6'>
        <DialogTitle className='text-lg font-semibold '>
          Create Post
        </DialogTitle>
        <div className='flex-1 flex gap-4 flex-col overflow-y-auto'>
          <div>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger
                className={`w-full ${errors.category ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder='Category' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='issue'>Issue</SelectItem>
                <SelectItem value='idea'>Idea</SelectItem>
                <SelectItem value='feedback'>Feedback</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className='text-red-500 text-sm'>{errors.category}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Input
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full ${errors.title ? "border-red-500" : ""}`}
            />
            {errors.title && (
              <p className='text-red-500 text-sm'>{errors.title}</p>
            )}
          </div>
          <div className='min-h-[200px]'>
            <LexicalEditorComponent
              value={editorValue}
              onValueChangeHandler={(value: string) => setEditorValue(value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={isCreatePostPending || isUpdatePostPending}
            onClick={onSubmitHandler}
            className='w-full sm:w-auto'
          >
            {isCreatePostPending || isUpdatePostPending ? (
              <Loader2 className='animate-spin mr-2 h-4 w-4' />
            ) : Boolean(post) ? (
              "Update"
            ) : (
              "Submit"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { AddPostDialog };
