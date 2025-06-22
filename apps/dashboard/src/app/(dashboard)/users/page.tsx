"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Calendar, ThumbsUp, FileText, Search, Users } from "lucide-react";
import { useQueryGetUsers } from "@/api/useQueryGetUsers";
import useAuth from "@/hooks/use-auth";
import { format } from "date-fns";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { systemUser } = useAuth();

  const { data: users } = useQueryGetUsers(Boolean(systemUser));

  // Filter users based on search query
  return (
    <div className='px-6 py-4 flex flex-col gap-4 w-full '>
      {/* Users List */}
      <div className='flex-1 flex overflow-hidden'>
        <Card className='flex-1 w-full flex flex-col p-0'>
          <CardContent className='flex flex-col h-full p-4'>
            {/* Search Bar */}
            {/* <div className='relative mb-4'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search users by name or email...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10 h-10'
              />
            </div> */}

            {/* Header */}
            <div className='border px-4 py-2 rounded-xl flex gap-2 items-center text-sm font-medium text-muted-foreground mb-2'>
              <div className='flex items-center gap-3'>Name</div>
              <div className='ml-auto flex items-center gap-1 w-2/12'>
                Created At
              </div>
              <div className='flex items-center gap-1 w-1/12 justify-center'>
                Votes
              </div>
              <div className='flex items-center gap-1 w-1/12 justify-center'>
                Posts
              </div>
            </div>

            {/* Scrollable User List */}
            <div className='flex-1 overflow-y-auto flex flex-col gap-2'>
              {users && users.length > 0 ? (
                users.map((user: any, index: number) => (
                  <div
                    key={user.userId}
                    className='border py-2 px-4 rounded-xl flex gap-2 items-center'
                  >
                    {/* Avatar */}
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage
                          src={user.displayPicture || undefined}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user?.name
                            ?.split(" ")
                            ?.map((n: string) => n[0])
                            ?.join("")}
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
                      {format(user.createdAt, "PPP")}
                    </div>

                    {/* Votes */}
                    <div className='flex items-center gap-1 w-1/12'>
                      <div className='rounded-xl cursor-pointer h-9 px-3 w-full flex items-center gap-2 border justify-center'>
                        <ThumbsUp className='h-4 w-4 stroke-primary' />
                        {user.voteCount}
                      </div>
                    </div>

                    {/* Posts */}
                    <div className='flex items-center gap-1 w-1/12'>
                      <div className='rounded-xl cursor-pointer h-9 px-3 w-full flex items-center gap-2 border justify-center'>
                        <FileText className='h-4 w-4 stroke-primary' />
                        {user.postCount}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Empty State
                <div className='flex-1 flex flex-col items-center justify-center py-12'>
                  <div className='flex flex-col items-center gap-4 text-center'>
                    <div className='rounded-full bg-muted p-4'>
                      <Users className='h-8 w-8 text-muted-foreground' />
                    </div>
                    <div className='space-y-2'>
                      <h3 className='text-lg font-semibold'>No users found</h3>
                      <p className='text-sm text-muted-foreground max-w-sm'>
                        There are currently no users in the system. Users will
                        appear here once they start joining your platform.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
