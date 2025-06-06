import { AddChangelogDialog } from "@/components/dialogs/add-changelog";
import { lexicalJSONToPlainText } from "@/lib/lexicalJSONToPlainText";
import { Calendar, ImageIcon } from "lucide-react";
import { useState } from "react";

const ChangeLogItem = ({ changelog }) => {
  const [isAddChangeLogDialogOpen, setIsChangeLogDialogOpen] = useState(false);
  return (
    <div
      key={changelog.id}
      className='border rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer'
    >
      {/* Thumbnail */}
      <div
        className='relative h-32 bg-muted'
        onClick={() => setIsChangeLogDialogOpen(true)}
      >
        {changelog.coverImage ? (
          <img
            src={changelog.coverImage}
            alt={changelog.title}
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            <ImageIcon className='h-8 w-8 text-muted-foreground' />
          </div>
        )}
      </div>

      {/* Content */}
      <div className='p-3 space-y-2'>
        {/* Header */}
        <div className='flex items-start justify-between gap-2'>
          <h3 className='font-semibold text-sm leading-tight line-clamp-2'>
            {changelog.title}
          </h3>
        </div>

        {/* Description */}
        <p className='text-xs text-muted-foreground line-clamp-2'>
          {lexicalJSONToPlainText(changelog.description)}
        </p>

        {/* Footer */}
        <div className='flex items-center justify-between pt-1'>
          <div className='flex items-center gap-1 text-xs text-muted-foreground'>
            <Calendar className='h-3 w-3' />
            {new Date(changelog.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      <AddChangelogDialog
        isOpen={isAddChangeLogDialogOpen}
        onClose={() => setIsChangeLogDialogOpen(false)}
        changelogData={changelog}
      />
    </div>
  );
};

export { ChangeLogItem };
