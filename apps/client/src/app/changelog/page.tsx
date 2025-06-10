"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import useTenant from "@/hooks/use-tenant";
import { useQueryGetChangelog } from "@/api/useQueryGetChangelog";
import { ChangelogItem } from "@/components/layouts/changelog/changelog-item";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChangeLogPage() {
  const { tenant } = useTenant();
  const [filter, setFilter] = useState({
    search: "",
  });

  const { data: changelogData, isLoading: isChangelogDataFetching } =
    useQueryGetChangelog(Boolean(tenant), filter);

  return (
    <div className='py-4 flex w-full h-full'>
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Header Card with Search and Subscribe */}
        <Card className='bg-background w-full p-2 flex gap-2 mb-4 '>
          <CardHeader className='px-0 py-0 gap-0'>
            <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
              <div className='relative w-full sm:max-w-md'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  value={filter.search}
                  onChange={(e) =>
                    setFilter((current) => ({
                      ...current,
                      search: e.target.value,
                    }))
                  }
                  placeholder='Search changelog...'
                  className='pl-10 h-10'
                />
              </div>
              {/* <Button className='w-full sm:w-auto bg-primary hover:bg-primary/90 px-6'>
                <Bell className='mr-2 h-4 w-4' />
                Subscribe to Updates
              </Button> */}
            </div>
          </CardHeader>
        </Card>

        {/* Changelog Entries List */}
        <div className='flex-1 overflow-hidden flex flex-col gap-2'>
          <Card className='bg-background w-full flex-1 p-2 gap-2 overflow-auto'>
            {!isChangelogDataFetching &&
              changelogData?.map((changelog) => (
                <>
                  <ChangelogItem key={changelog.id} changelog={changelog} />
                </>
              ))}

            {isChangelogDataFetching && (
              <div className='flex flex-col gap-2'>
                {Array(5)
                  .fill("-")
                  .map(() => (
                    <Skeleton className='h-[100px] w-full bg-card/70' />
                  ))}
              </div>
            )}
            {changelogData?.length === 0 && (
              <div className='text-center py-12 text-muted-foreground'>
                <Bell className='h-12 w-12 mx-auto mb-4 opacity-50' />
                <h3 className='text-lg font-medium mb-2'>
                  No changelog entries
                </h3>
                <p className='text-sm'>
                  Check back later for updates and new features
                </p>
              </div>
            )}
          </Card>

          {/* Empty State */}
        </div>
      </div>
    </div>
  );
}
