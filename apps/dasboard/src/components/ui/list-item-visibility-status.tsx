import { Eye, EyeOff } from "lucide-react";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Badge } from "./badge";

const ListItemVisibilityStatus = ({ visibility, onClick, viewOnly }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant='outline' className=' rounded-xl h-full '>
          {visibility ? (
            <Eye className='stroke-primary' />
          ) : (
            <EyeOff className='stroke-primary' />
          )}
        </Badge>
      </TooltipTrigger>
      {!viewOnly && (
        <TooltipContent>
          {visibility ? "Make Private" : "Make Public"}
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export { ListItemVisibilityStatus };
