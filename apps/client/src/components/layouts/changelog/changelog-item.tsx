import { ChangelogDialog } from "@/components/dialogs/changelog-details";
import { Card } from "@/components/ui/card";
import { lexicalJSONToPlainText } from "@/lib/lexcialJSONToPlainText";
import { useState } from "react";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const ChangelogItem = ({ changelog }) => {
  const [isChangelogDetailsDialogOpen, setIsChangelogDetailsDialogOpen] =
    useState(false);

  return (
    <>
      <Card
        key={changelog.id}
        className='bg-background w-full p-4 hover:bg-background/70 transition-colors shadow-none'
        onClick={() => setIsChangelogDetailsDialogOpen(true)}
      >
        {/* Single row with two columns */}
        <div className='flex items-start gap-6'>
          {/* Left column: Date - Fixed width */}
          <div className='w-36 text-xs text-muted-foreground font-medium'>
            {formatDate(changelog.createdAt)}
          </div>

          {/* Right column: Title and Description - Takes remaining space */}
          <div className='flex-1'>
            <h3 className='font-medium text-base mb-2'>{changelog.title}</h3>
            <p className='text-xs text-muted-foreground leading-relaxed'>
              {lexicalJSONToPlainText(changelog.description)}
            </p>
          </div>
        </div>
      </Card>
      <ChangelogDialog
        isOpen={isChangelogDetailsDialogOpen}
        onClose={() => setIsChangelogDetailsDialogOpen(false)}
        changelog={changelog}
      />
    </>
  );
};

export { ChangelogItem };
