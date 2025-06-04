"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Mail,
  MoreHorizontal,
  Shield,
  User,
  Calendar,
  ThumbsUp,
  FileText,
  Search,
} from "lucide-react";

// Mock user data
const USERS_DATA = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
    createdAt: "2024-01-15",
    votes: 156,
    posts: 23,
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150",
    createdAt: "2024-01-12",
    votes: 289,
    posts: 45,
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol.davis@example.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    createdAt: "2024-01-18",
    votes: 78,
    posts: 12,
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    createdAt: "2024-01-08",
    votes: 34,
    posts: 8,
  },
  {
    id: "5",
    name: "Emma Brown",
    email: "emma.brown@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    createdAt: "2024-01-20",
    votes: 142,
    posts: 19,
  },
  {
    id: "6",
    name: "Frank Miller",
    email: "frank.miller@example.com",
    avatar: null,
    createdAt: "2024-01-22",
    votes: 5,
    posts: 2,
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query
  const filteredUsers = USERS_DATA.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className='px-6 py-4 flex flex-col gap-4 w-full '>
      {/* Users List */}
      <div className='flex-1 flex overflow-hidden'>
        <Card className='flex-1 w-full'>
          <CardContent className='overflow-y-auto'>
            {/* Search Bar */}
            <div className='relative mb-4'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search users by name or email...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10 h-10'
              />
            </div>

            {/* Header Bar */}
            <div className='border px-4 py-2 rounded-xl flex gap-2 items-center text-sm font-medium text-muted-foreground mb-2'>
              {/* User Name Label */}
              <div className='flex items-center gap-3'>
                <div>Name</div>
              </div>

              {/* Created At Label */}
              <div className='ml-auto flex items-center gap-1 w-2/12'>
                Created At
              </div>

              {/* Votes Label */}
              <div className='flex items-center gap-1 w-1/12 justify-center'>
                Votes
              </div>

              {/* Posts Label */}
              <div className='flex items-center gap-1 w-1/12 justify-center'>
                Posts
              </div>
            </div>

            <div className='flex flex-col gap-2 overflow-y-auto'>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className='border py-2 px-4 rounded-xl flex gap-2 items-center'
                  >
                    {/* User Info */}
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage
                          src={user.avatar || undefined}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='font-medium'>{user.name}</div>
                        <div className='text-sm text-muted-foreground'>
                          {user.email}
                        </div>
                      </div>
                    </div>

                    {/* Created At */}
                    <div className='ml-auto flex items-center gap-1 text-sm text-muted-foreground w-2/12'>
                      <Calendar className='h-4 w-4' />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>

                    {/* Votes */}
                    <div className='flex items-center gap-1 w-1/12'>
                      <Button
                        variant='outline'
                        className='rounded-xl cursor-pointer h-9 px-3 w-full'
                      >
                        <ThumbsUp className='h-4 w-4 stroke-primary' />
                        {user.votes}
                      </Button>
                    </div>

                    {/* Posts */}
                    <div className='flex items-center gap-1 w-1/12'>
                      <Button
                        variant='outline'
                        className='rounded-xl cursor-pointer h-9 px-3 w-full'
                      >
                        <FileText className='h-4 w-4 stroke-primary' />
                        {user.posts}
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center py-8 text-muted-foreground'>
                  <Search className='h-8 w-8 mx-auto mb-2 opacity-50' />
                  <p>No users found matching "{searchQuery}"</p>
                  <p className='text-sm'>Try adjusting your search terms</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
