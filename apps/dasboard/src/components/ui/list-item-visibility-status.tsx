import { Eye } from "lucide-react";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const ListItemVisibilityStatus = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='outline' className='cursor-pointer rounded-xl '>
          <Eye className='stroke-primary' />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Make Private</TooltipContent>
    </Tooltip>
  );
};

export { ListItemVisibilityStatus };
