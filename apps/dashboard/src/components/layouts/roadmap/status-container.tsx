import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { StatusRequest } from "./status-request";

const getStatusTitle = (status: string) => {
  switch (status) {
    case "in-review":
      return "In Review";
    case "in-progress":
      return "In Progress";
    case "completed":
      return "Completed";
    case "declined":
      return "Declined";
    default:
      return status;
  }
};

const StatusContainer = ({ statusData }) => {
  return (
    <div className='flex-1 flex overflow-hidden  min-h-[500px]'>
      <Card className='flex-1 w-full p-0  h-full'>
        <CardContent className='flex flex-col overflow-hidden p-4 h-full'>
          {/* Column Header */}
          <div className='border px-4 py-2 rounded-xl flex items-center justify-between text-sm font-medium text-muted-foreground mb-4'>
            <h3 className='font-semibold'>
              {getStatusTitle(statusData.status)}
            </h3>
            <Badge variant='secondary' className='text-xs'>
              {statusData?.items?.length}
            </Badge>
          </div>

          {/* Column Content */}
          <div className='flex-1 h-0 overflow-y-auto'>
            <div className='space-y-2'>
              {statusData?.items?.map((item) => (
                <StatusRequest key={item.id} item={item} />
              ))}

              {statusData?.items?.length === 0 && (
                <div className='text-center py-8 text-muted-foreground'>
                  <p className='text-sm'>
                    No items in {statusData.status.toLowerCase()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { StatusContainer };
