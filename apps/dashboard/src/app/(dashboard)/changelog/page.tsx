"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";
import { Search, Plus, Image as ImageIcon, FileText } from "lucide-react";
import { AddChangelogDialog } from "@/components/dialogs/add-changelog";
import { useQueryGetChangelog } from "@/api/useQueryGetChangelog";
import useAuth from "@/hooks/use-auth";
import { ChangeLogItem } from "@/components/layouts/changelog/changelog-item";

// Mock changelog data

export default function ChangelogPage() {
  const { systemUser } = useAuth();
  const [filter, setFilter] = useState({
    search: "",
  });
  const { data: changelogData } = useQueryGetChangelog(
    Boolean(systemUser),
    filter
  );

  const [isAddChangeLogDialogOpen, setIsChangeLogDialogOpen] = useState(false);

  return (
    <div className='px-6 py-6 flex flex-col gap-6 w-full'>
      {/* Main Card */}
      <div className='flex-1 flex overflow-hidden'>
        <Card className='flex-1 w-full p-0'>
          <CardContent className='overflow-y-auto p-4'>
            {/* Search and Add Changelog */}
            <div className='flex flex-col sm:flex-row gap-4 items-center justify-between mb-6'>
              <div className='relative flex-1 w-full sm:max-w-md'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Search changelogs...'
                  value={filter.search}
                  onChange={(e) =>
                    setFilter((current) => ({
                      ...current,
                      search: e.target.value,
                    }))
                  }
                  className='pl-10 h-10'
                />
              </div>
              <Button
                className='w-full sm:w-auto'
                onClick={() => setIsChangeLogDialogOpen(true)}
              >
                <Plus className='h-4 w-4 mr-2' />
                Add Changelog
              </Button>
            </div>

            {/* Changelog Grid */}
            {changelogData && changelogData.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {changelogData.map((changelog: any) => (
                  <ChangeLogItem changelog={changelog} key={changelog.id} />
                ))}
              </div>
            ) : (
              // Empty State
              <div className='flex flex-col items-center justify-center h-full min-h-[400px]'>
                <div className='flex flex-col items-center gap-4 text-center'>
                  <div className='rounded-full bg-muted p-4'>
                    <FileText className='h-8 w-8 text-muted-foreground' />
                  </div>
                  <div className='space-y-2'>
                    <h3 className='text-lg font-semibold'>
                      No changelogs found
                    </h3>
                    <p className='text-sm text-muted-foreground max-w-sm'>
                      {filter.search
                        ? `No changelogs match your search "${filter.search}". Try adjusting your search terms.`
                        : "You haven't created any changelogs yet. Click the button above to create your first changelog entry."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <AddChangelogDialog
        isOpen={isAddChangeLogDialogOpen}
        onClose={() => setIsChangeLogDialogOpen(false)}
      />
    </div>
  );
}
