import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, PlayCircle, TrendingUp, Vote } from "lucide-react";
const CARDS_ICONS = {
  "total-requests": <TrendingUp size={18} />,
  "in-progress": <PlayCircle size={18} />,
  completed: <CheckCircle size={18} />,
  "total-voters": <Vote size={18} />,
};

const DashboardCards = ({ cards, isLoading }) => {
  if (!cards || isLoading) {
    return (
      <div className='flex gap-2'>
        {Array(4)
          .fill(".")
          .map((_, index) => (
            <Skeleton
              key={`dc-card-${index}`}
              className='h-30 w-4/12 bg-card'
            />
          ))}
      </div>
    );
  }

  return (
    <div className='flex gap-2'>
      {cards?.map((card) => (
        <Card className='w-full gap-2 py-4' key={card.id}>
          <CardHeader className='px-4'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-sm font-medium'>
                {card.title}
              </CardTitle>{" "}
              <div>{CARDS_ICONS[card.id]}</div>
            </div>
          </CardHeader>
          <CardContent className='px-4'>
            <div className='text-2xl font-bold'>{card.count}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { DashboardCards };
