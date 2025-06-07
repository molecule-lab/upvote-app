"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, MessageCircle, ExternalLink } from "lucide-react";
import useTenant from "@/hooks/use-tenant";
import { useQueryGetChangelog } from "@/api/useQueryGetChangelog";
import { lexicalJSONToPlainText } from "@/lib/lexcialJSONToPlainText";
import { ChangelogItem } from "@/components/layouts/changelog/changelog-item";

// Mock changelog data

const getCategoryColor = (category: string) => {
  switch (category) {
    case "feature":
      return "bg-blue-500 text-white border-blue-500 hover:bg-blue-600";
    case "improvement":
      return "bg-green-500 text-white border-green-500 hover:bg-green-600";
    case "bugfix":
      return "bg-red-500 text-white border-red-500 hover:bg-red-600";
    default:
      return "";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function ChangeLogPage() {
  const { tenant } = useTenant();

  const { data: changelogData } = useQueryGetChangelog(Boolean(tenant), {});

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
                  placeholder='Search changelog...'
                  className='pl-10 h-10'
                />
              </div>
              <Button className='w-full sm:w-auto bg-primary hover:bg-primary/90 px-6'>
                <Bell className='mr-2 h-4 w-4' />
                Subscribe to Updates
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Changelog Entries List */}
        <div className='flex-1 overflow-y-auto flex flex-col gap-2'>
          {changelogData?.map((changelog) => (
            <ChangelogItem key={changelog.id} changelog={changelog} />
          ))}

          {/* Empty State */}
          {changelogData?.length === 0 && (
            <div className='text-center py-12 text-muted-foreground'>
              <Bell className='h-12 w-12 mx-auto mb-4 opacity-50' />
              <h3 className='text-lg font-medium mb-2'>No changelog entries</h3>
              <p className='text-sm'>
                Check back later for updates and new features
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
