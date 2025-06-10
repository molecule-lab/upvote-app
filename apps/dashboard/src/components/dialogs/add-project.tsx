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
import { useMutationCreateTenant } from "@/api/useMutationCreateTenant";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AddProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProjectDialog = ({ isOpen, onClose }: AddProjectDialogProps) => {
  const { mutateAsync: createTenant, isPending: creatingTenant } =
    useMutationCreateTenant();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const onCreateProjectClick = async () => {
    await createTenant({ data: { name, slug: slug.toLowerCase() } });
    setName("");
    setSlug("");
    toast("Project Created Successfully");
    onClose();
  };

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
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(e.target.value.replace(" ", "-").toLowerCase());
              }}
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
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
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
          <Button className='px-4' onClick={onCreateProjectClick}>
            {creatingTenant ? (
              <Loader2 className='animate-spin' />
            ) : (
              "Create Project"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { AddProjectDialog };
