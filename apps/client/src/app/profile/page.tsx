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

// Mock user data
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "", // Empty for fallback
  joinedDate: "2024-01-01",
};

// Mock user posts data (same structure as all-posts)
const userPosts = [
  {
    id: 1,
    title: "Add dark mode support",
    description:
      "It would be great to have a dark mode option for better user experience during night time usage.",
    author: "John Doe",
    date: "2024-01-15",
    type: "idea",
    status: "in-review",
    votes: 12,
  },
  {
    id: 2,
    title: "Fix login button not working",
    description:
      "The login button becomes unresponsive after multiple clicks. This needs to be fixed urgently.",
    author: "John Doe",
    date: "2024-01-14",
    type: "issue",
    status: "in-progress",
    votes: 8,
  },
  {
    id: 3,
    title: "Improve search functionality",
    description:
      "The current search is too slow and doesn't return relevant results. Consider implementing better search algorithms.",
    author: "John Doe",
    date: "2024-01-13",
    type: "feedback",
    status: "completed",
    votes: 15,
  },
  {
    id: 4,
    title: "Add user profile customization",
    description:
      "Users should be able to customize their profiles with themes, bio, and profile pictures.",
    author: "John Doe",
    date: "2024-01-12",
    type: "idea",
    status: "in-review",
    votes: 7,
  },
  {
    id: 5,
    title: "Mobile app performance issues",
    description:
      "The mobile app is running slowly on older devices. Need optimization for better performance.",
    author: "John Doe",
    date: "2024-01-11",
    type: "issue",
    status: "completed",
    votes: 23,
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "idea":
      return <Lightbulb className='h-3 w-3' />;
    case "issue":
      return <BadgeAlert className='h-3 w-3' />;
    case "feedback":
      return <CircleEllipsis className='h-3 w-3' />;
    default:
      return null;
  }
};

const getTypeVariant = (type: string) => {
  switch (type) {
    case "idea":
      return "secondary";
    case "issue":
      return "destructive";
    case "feedback":
      return "default";
    default:
      return "outline";
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "default";
    case "in-progress":
      return "secondary";
    case "in-review":
      return "outline";
    default:
      return "outline";
  }
};

const getTypeClassName = (type: string) => {
  switch (type) {
    case "idea":
      return "bg-blue-500 text-white border-blue-500 hover:bg-blue-600";
    case "issue":
      return "";
    case "feedback":
      return "";
    default:
      return "";
  }
};

export default function ProfilePage() {
  const handleLogout = () => {
    console.log("Logout clicked");
    // Add logout logic here
  };

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
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className='text-lg'>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Column 2: Name and Email */}
              <div className='flex-1'>
                <h3 className='font-medium text-base mb-1'>{user.name}</h3>
                <p className='text-xs text-muted-foreground'>{user.email}</p>
                <p className='text-xs text-muted-foreground mt-1'>
                  Joined {new Date(user.joinedDate).toLocaleDateString()}
                </p>
              </div>

              {/* Column 3: Logout Button */}
              <div className='flex-shrink-0'>
                <Button
                  variant='outline'
                  onClick={handleLogout}
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
              My Posts ({userPosts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className='flex-1 px-0 gap-2 flex flex-col'>
            {userPosts.map((post) => (
              <div
                key={post.id}
                className='border p-3 rounded-xl transition-colors bg-card hover:bg-card/70 cursor-pointer'
              >
                <div className='flex items-start gap-2 mb-2'>
                  <div className='flex-1'>
                    <h3 className='font-medium text-base mb-1'>{post.title}</h3>
                    <p className='text-xs'>{post.description}</p>
                  </div>
                  <div className='flex flex-col items-center gap-1'>
                    <Button
                      variant='secondary'
                      size='icon'
                      className='h-9 w-9 rounded-xl border-1'
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Vote UP");
                      }}
                    >
                      <ChevronUp className='h-4 w-4 stroke-primary' />
                    </Button>
                    <span className='text-xs font-medium'>{post.votes}</span>
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Avatar className='size-5'>
                      <AvatarFallback className='text-xs'>
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className='text-xs text-muted-foreground'>
                      {post.author}
                    </span>
                    <span className='text-xs text-muted-foreground'>•</span>
                    <span className='text-xs text-muted-foreground'>
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Badge
                      variant={getTypeVariant(post.type)}
                      className={`text-xs ${getTypeClassName(post.type)}`}
                    >
                      {getTypeIcon(post.type)}
                      {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                    </Badge>
                    <Badge
                      variant={getStatusVariant(post.status)}
                      className='text-xs'
                    >
                      {post.status
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {userPosts.length === 0 && (
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
