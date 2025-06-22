"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronUp,
  Lightbulb,
  BadgeAlert,
  CircleEllipsis,
  LogOut,
} from "lucide-react";
import useAuth from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import Login06 from "@/components/ui/login-3";
import { useQueryGetUserProfile } from "@/api/useQueryGetUserProfile";
import { FeedbackRequest } from "@/components/layouts/all-posts/feedback-request";
import { useEffect } from "react";
import { format } from "date-fns";

export default function ProfilePage() {
  const { systemUser, logout, firebaseUser, userProfile } = useAuth();

  if (!systemUser || !firebaseUser) {
    return (
      <div className='flex items-center justify-center  w-full'>
        <Login06 />
      </div>
    );
  }

  return (
    <div className='py-4 flex w-full h-full'>
      <div className='flex-1 flex flex-col overflow-hidden gap-4'>
        {/* Section 1: Profile */}
        <Card className='bg-background w-full p-4 gap-2'>
          <CardHeader className='px-0 py-0 '>
            <CardTitle className='font-medium text-base'>Profile</CardTitle>
          </CardHeader>
          <CardContent className='px-0 py-0'>
            {/* 3 Columns: DP, Name/Email, Logout */}
            <div className='flex items-center gap-4'>
              {/* Column 1: Profile Picture */}
              <div className='flex-shrink-0'>
                <Avatar className='size-16'>
                  <AvatarImage
                    src={systemUser?.displayPicture}
                    alt={systemUser?.name}
                  />
                  <AvatarFallback className='text-lg'>
                    {systemUser?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Column 2: Name and Email */}
              <div className='flex-1'>
                <h3 className='font-medium text-base mb-1'>
                  {systemUser?.name}
                </h3>
                <p className='text-xs text-muted-foreground'>
                  {systemUser?.email}
                </p>
                <p className='text-xs text-muted-foreground mt-1'>
                  Joined {format(systemUser?.createdAt, "PPP")}
                </p>
              </div>

              {/* Column 3: Logout Button */}
              <div className='flex-shrink-0'>
                <Button
                  variant='outline'
                  onClick={logout}
                  className='flex items-center gap-2'
                >
                  <LogOut className='h-4 w-4' />
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Posts */}
        <Card className='bg-background w-full flex-1 p-2 gap-2  overflow-y-auto'>
          <CardHeader className='px-0'>
            <CardTitle className='font-medium text-base px-2'>
              My Posts ({userProfile?.posts?.length})
            </CardTitle>
          </CardHeader>
          <CardContent className='flex-1 px-0 gap-2 flex flex-col'>
            {userProfile?.posts?.map((post) => (
              <FeedbackRequest key={post.id} post={post} />
            ))}

            {/* Empty State */}
            {userProfile?.posts?.length === 0 && (
              <div className='text-center py-12 text-muted-foreground'>
                <h3 className='text-lg font-medium mb-2'>No posts yet</h3>
                <p className='text-sm'>
                  You haven't created any posts. Start sharing your ideas!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
