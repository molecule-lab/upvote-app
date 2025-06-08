import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface AddProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProjectDialog = ({ isOpen, onClose }: AddProjectDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold'>
            Create Project
          </DialogTitle>
          <DialogDescription className='text-sm text-muted-foreground'>
            Set up your new project with a title and custom URL.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='project-title' className='text-sm font-medium'>
              Project Title
            </Label>
            <Input
              id='project-title'
              placeholder='Acme Inc.'
              className='h-10'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='project-url' className='text-sm font-medium'>
              Project URL
            </Label>
            <div className='flex w-full -space-x-px'>
              <Input
                type='text'
                id='project-url'
                className='rounded-r-none h-10 flex-1'
                placeholder='my-project'
              />
              <span className='inline-flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground min-w-fit'>
                .aura.vote
              </span>
            </div>
          </div>
        </div>

        <div className='flex justify-end space-x-3 pt-4 border-t'>
          <Button variant='outline' onClick={onClose} className='px-4'>
            Cancel
          </Button>
          <Button className='px-4'>Create Project</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { AddProjectDialog };
