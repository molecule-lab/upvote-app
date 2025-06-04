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

const AddPostDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Create Post</DialogTitle>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder='Category' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='issue'>Issue</SelectItem>
            <SelectItem value='idea'>Idea</SelectItem>
            <SelectItem value='feedback'>Feedback</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder='Title' />
        <LexicalEditorComponent />
        <DialogFooter>
          <Button>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { AddPostDialog };
