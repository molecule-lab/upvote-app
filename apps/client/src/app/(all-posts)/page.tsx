"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plus,
  ChevronUp,
  Lightbulb,
  BadgeAlert,
  CircleEllipsis,
} from "lucide-react";
import { useState } from "react";
import { AddPostDialog } from "@/components/dialogs/add-post";
import { PostDetailsDialog } from "@/components/dialogs/post-details-dialog";

// Mock data for posts
const posts = [
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
    author: "Jane Smith",
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
    author: "Mike Johnson",
    date: "2024-01-13",
    type: "feedback",
    status: "completed",
    votes: 15,
  },
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
    author: "Jane Smith",
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
    author: "Mike Johnson",
    date: "2024-01-13",
    type: "feedback",
    status: "completed",
    votes: 15,
  },
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
    author: "Jane Smith",
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
    author: "Mike Johnson",
    date: "2024-01-13",
    type: "feedback",
    status: "completed",
    votes: 15,
  },
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
    author: "Jane Smith",
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
    author: "Mike Johnson",
    date: "2024-01-13",
    type: "feedback",
    status: "completed",
    votes: 15,
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

export default function Home() {
  const [isAddPostDialogOpen, setIsAppPostDialogOpen] = useState(false);
  const [isViewPostDialogOpen, setIsViewPostDialogOpen] = useState(false);

  return (
    <div className=' py-4 flex w-full h-full'>
      <div className=' flex-1 flex overflow-hidden'>
        <Card className='bg-background w-full flex-1 p-2 gap-2'>
          <CardHeader className='px-0'>
            <div className='sm:hidden space-y-2'>
              <div className='flex items-center gap-2'>
                <Input placeholder='Search' className='flex-1' />
                <Button
                  className='sm:w-auto sm:px-4'
                  size='icon'
                  onClick={() => setIsAppPostDialogOpen(true)}
                >
                  <Plus className='sm:mr-2' />
                  <span className='hidden sm:inline'>Post</span>
                </Button>
              </div>

              <div className='flex items-center gap-2'>
                <Select>
                  <SelectTrigger className='flex-1'>
                    <SelectValue placeholder='Category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All</SelectItem>
                    <SelectItem value='issue'>Issue</SelectItem>
                    <SelectItem value='idea'>Idea</SelectItem>
                    <SelectItem value='feedback'>Feedback</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className='flex-1'>
                    <SelectValue placeholder='Status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All</SelectItem>
                    <SelectItem value='in-review'>In Review</SelectItem>
                    <SelectItem value='in-progress'>In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='hidden sm:flex items-center gap-2'>
              <Input placeholder='Search' className='w-64' />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All</SelectItem>
                  <SelectItem value='issue'>Issue</SelectItem>
                  <SelectItem value='idea'>Idea</SelectItem>
                  <SelectItem value='feedback'>Feedback</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All</SelectItem>
                  <SelectItem value='in-review'>In Review</SelectItem>
                  <SelectItem value='in-progress'>In Progress</SelectItem>
                </SelectContent>
              </Select>
              <div className='flex-1'></div>
              <Button onClick={() => setIsAppPostDialogOpen(true)}>
                <Plus /> Post
              </Button>
            </div>
          </CardHeader>
          <CardContent className='flex-1 px-0 gap-2 flex flex-col overflow-y-auto'>
            {posts.map((post) => (
              <div
                key={post.id}
                className='border p-3 rounded-xl transition-colors bg-card hover:bg-card/70 '
                onClick={() => setIsViewPostDialogOpen(true)}
              >
                <div className='flex items-start gap-2 mb-2'>
                  <div className='flex-1'>
                    <h3 className='font-medium text-base mb-1'>{post.title}</h3>
                    <p className='text-xs '>{post.description}</p>
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
                      <ChevronUp className='h-4 w-4 stroke-primary ' />
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
          </CardContent>
        </Card>
      </div>
      <AddPostDialog
        isOpen={isAddPostDialogOpen}
        onClose={() => setIsAppPostDialogOpen(false)}
      />
      <PostDetailsDialog
        isOpen={isViewPostDialogOpen}
        onClose={() => setIsViewPostDialogOpen(false)}
      />
    </div>
  );
}
