import { lexicalJSONToPlainText } from "@/lib/lexcialJSONToPlainText";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const ChangelogDialog = ({ isOpen, onClose, changelog }) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogTitle className='font-medium text-xl'>
          {changelog.title}
        </DialogTitle>
        <div className='text-xs text-muted-foreground'>
          {formatDate(changelog.createdAt)}
        </div>
        <div className='text-sm leading-relaxed h-[300px] overflow-auto'>
          {lexicalJSONToPlainText(changelog.description, false)}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { ChangelogDialog };
