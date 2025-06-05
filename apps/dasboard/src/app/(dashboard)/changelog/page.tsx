"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Calendar,
  Eye,
  EyeOff,
  Image as ImageIcon,
} from "lucide-react";
import { AddChangelogDialog } from "@/components/dialogs/add-changelog";
import { useQueryGetChangelog } from "@/api/useQueryGetChangelog";
import useAuth from "@/hooks/use-auth";

// Mock changelog data
const CHANGELOG_DATA = [
  {
    id: "1",
    title: "New Dashboard Analytics",
    description:
      "Introducing comprehensive analytics dashboard with real-time metrics and advanced filtering capabilities.",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
    publishedAt: "2024-01-20",
    status: "published",
    version: "v2.1.0",
    category: "feature",
  },
  {
    id: "2",
    title: "Performance Improvements",
    description:
      "Significant performance optimizations across the platform, reducing load times by up to 40%.",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    publishedAt: "2024-01-18",
    status: "published",
    version: "v2.0.5",
    category: "improvement",
  },
  {
    id: "3",
    title: "Dark Mode Support",
    description:
      "Full dark mode implementation with automatic theme switching based on system preferences.",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop",
    publishedAt: "2024-01-15",
    status: "unpublished",
    version: "v2.2.0",
    category: "feature",
  },
  {
    id: "4",
    title: "Bug Fixes & Security Updates",
    description:
      "Critical security patches and various bug fixes to improve overall stability and user experience.",
    thumbnail:
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=400&h=200&fit=crop",
    publishedAt: "2024-01-12",
    status: "published",
    version: "v2.0.4",
    category: "bugfix",
  },
  {
    id: "5",
    title: "API v3 Release",
    description:
      "Major API update with improved endpoints, better documentation, and enhanced rate limiting.",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
    publishedAt: "2024-01-10",
    status: "unpublished",
    version: "v3.0.0",
    category: "feature",
  },
  {
    id: "6",
    title: "Mobile App Updates",
    description:
      "Enhanced mobile experience with improved navigation and offline capabilities.",
    thumbnail:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
    publishedAt: "2024-01-08",
    status: "published",
    version: "v1.5.0",
    category: "improvement",
  },
];

export default function ChangelogPage() {
  const { systemUser } = useAuth();
  const { data: changelogData } = useQueryGetChangelog(Boolean(systemUser));

  const [searchQuery, setSearchQuery] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState<string>("");
  const [isAddChangeLogDialogOpen, setIsChangeLogDialogOpen] = useState(false);

  // Filter changelogs based on search query and visibility
  const filteredChangelogs = CHANGELOG_DATA.filter((changelog) => {
    const matchesSearch =
      changelog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      changelog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      changelog.version.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesVisibility =
      !visibilityFilter || changelog.status === visibilityFilter;

    return matchesSearch && matchesVisibility;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "feature":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "improvement":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "bugfix":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    return status === "published" ? (
      <Eye className='h-4 w-4 text-green-600' />
    ) : (
      <EyeOff className='h-4 w-4 text-gray-400' />
    );
  };

  useEffect(() => {
    console.log(changelogData);
  }, [changelogData]);

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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
            {filteredChangelogs.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {changelogData?.map((changelog) => (
                  <div
                    key={changelog.id}
                    className='border rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer'
                  >
                    {/* Thumbnail */}
                    <div className='relative h-32 bg-muted'>
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
                        {changelog.description}
                      </p>

                      {/* Footer */}
                      <div className='flex items-center justify-between pt-1'>
                        <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                          <Calendar className='h-3 w-3' />
                          {new Date(changelog.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-12 text-muted-foreground'>
                <Search className='h-12 w-12 mx-auto mb-4 opacity-50' />
                <h3 className='text-lg font-medium mb-2'>
                  No changelogs found
                </h3>
                <p className='text-sm'>
                  {searchQuery || visibilityFilter
                    ? "Try adjusting your search terms or filters"
                    : "No changelogs have been created yet"}
                </p>
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
