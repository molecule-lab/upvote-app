import FeedbackList from "@/components/layouts/feedback-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const topRequests = [
  {
    id: 1,
    title: "Dark mode support for mobile app",
    board: "Mobile App",
    votes: 342,
    status: "planned",
    submittedAt: "2024-01-15",
    type: "idea",
    priority: "low",
  },
  {
    id: 2,
    title: "Advanced search filters",
    board: "Web Platform",
    votes: 298,
    status: "in-progress",
    submittedAt: "2024-01-12",
    type: "issue",
    priority: "medium",
  },
  {
    id: 3,
    title: "Webhook support for real-time updates",
    board: "API & Integrations",
    votes: 267,
    status: "planned",
    submittedAt: "2024-01-18",
    type: "feedback",
    priority: "high",
  },
  {
    id: 4,
    title: "Bulk export functionality",
    board: "Web Platform",
    votes: 234,
    status: "completed",
    submittedAt: "2024-01-08",
    type: "issue",
    priority: "urgent",
  },
  {
    id: 5,
    title: "Component documentation improvements",
    board: "Design System",
    votes: 189,
    status: "in-progress",
    type: "idea",
    submittedAt: "2024-01-20",
    priority: "low",
  },
  {
    id: 1,
    title: "Dark mode support for mobile app",
    board: "Mobile App",
    votes: 342,
    status: "planned",
    submittedAt: "2024-01-15",
    type: "idea",
    priority: "low",
  },
  {
    id: 2,
    title: "Advanced search filters",
    board: "Web Platform",
    votes: 298,
    status: "in-progress",
    submittedAt: "2024-01-12",
    type: "issue",
    priority: "medium",
  },
  {
    id: 3,
    title: "Webhook support for real-time updates",
    board: "API & Integrations",
    votes: 267,
    status: "planned",
    submittedAt: "2024-01-18",
    type: "feedback",
    priority: "high",
  },
  {
    id: 4,
    title: "Bulk export functionality",
    board: "Web Platform",
    votes: 234,
    status: "completed",
    submittedAt: "2024-01-08",
    type: "issue",
    priority: "urgent",
  },
  {
    id: 5,
    title: "Component documentation improvements",
    board: "Design System",
    votes: 189,
    status: "in-progress",
    type: "idea",
    submittedAt: "2024-01-20",
    priority: "low",
  },
  {
    id: 1,
    title: "Dark mode support for mobile app",
    board: "Mobile App",
    votes: 342,
    status: "planned",
    submittedAt: "2024-01-15",
    type: "idea",
    priority: "low",
  },
  {
    id: 2,
    title: "Advanced search filters",
    board: "Web Platform",
    votes: 298,
    status: "in-progress",
    submittedAt: "2024-01-12",
    type: "issue",
    priority: "medium",
  },
  {
    id: 3,
    title: "Webhook support for real-time updates",
    board: "API & Integrations",
    votes: 267,
    status: "planned",
    submittedAt: "2024-01-18",
    type: "feedback",
    priority: "high",
  },
  {
    id: 4,
    title: "Bulk export functionality",
    board: "Web Platform",
    votes: 234,
    status: "completed",
    submittedAt: "2024-01-08",
    type: "issue",
    priority: "urgent",
  },
  {
    id: 5,
    title: "Component documentation improvements",
    board: "Design System",
    votes: 189,
    status: "in-progress",
    type: "idea",
    submittedAt: "2024-01-20",
    priority: "low",
  },
];
export default function FeedbackPage() {
  return (
    <div className='px-6 py-6 flex flex-col gap-6 w-full'>
      <div className='bg-card border rounded-xl p-4 shadow-sm '>
        <div className='flex flex-wrap gap-3 items-center justify-between'>
          <div className='flex flex-wrap gap-3'>
            {["Category", "Status", "Priority", "Visibility", "Sort By"].map(
              (placeholder) => (
                <Select key={placeholder}>
                  <SelectTrigger className='min-w-[140px] h-9 bg-background border-border hover:bg-background/80 transition-colors'>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='feature'>Feature Request</SelectItem>
                    <SelectItem value='bug'>Bug Report</SelectItem>
                    <SelectItem value='improvement'>Improvement</SelectItem>
                    <SelectItem value='other'>Other</SelectItem>
                  </SelectContent>
                </Select>
              )
            )}
          </div>

          <Button variant='ghost' className='mt-2 sm:mt-0'>
            Clear Filters
          </Button>
        </div>
      </div>
      <div className=' flex-1 flex  overflow-hidden'>
        <Card className='flex-1 w-full p-0'>
          <CardContent className='overflow-y-auto p-4'>
            <FeedbackList requests={[]} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
