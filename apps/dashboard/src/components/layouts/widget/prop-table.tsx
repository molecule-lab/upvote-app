import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface PropData {
  name: string;
  attribute: string;
  type: string;
  acceptedValues?: string;
  defaultValue: string;
  status: "done" | "pending" | "not-now";
  description: string;
}

const propData: PropData[] = [
  {
    name: "Default Type",
    attribute: "data-default-type",
    type: "String",
    acceptedValues: "issue | idea | feedback",
    defaultValue: "null",
    status: "pending",
    description: "Set the default feedback type",
  },
  {
    name: "Default Open",
    attribute: "data-default-open",
    type: "Boolean",
    acceptedValues: "true | false",
    defaultValue: "false",
    status: "done",
    description: "Control if widget opens by default",
  },
  {
    name: "CTA Text",
    attribute: "data-cta-text",
    type: "String",
    acceptedValues: "string",
    defaultValue: "Feedback",
    status: "done",
    description: "Customize the call-to-action button text",
  },
  {
    name: "Color",
    attribute: "data-color",
    type: "String",
    acceptedValues: "Valid Color",
    defaultValue: "Aura Primary",
    status: "done",
    description: "Set the primary color theme",
  },
  {
    name: "Position",
    attribute: "data-position",
    type: "String",
    acceptedValues: "left | right",
    defaultValue: "right",
    status: "done",
    description: "Control widget position on screen",
  },
  {
    name: "Theme",
    attribute: "data-theme",
    type: "String",
    acceptedValues: "dark | light | system",
    defaultValue: "system",
    status: "done",
    description: "Set the color theme preference",
  },
];

const getStatusBadge = (status: PropData["status"]) => {
  switch (status) {
    case "done":
      return <Badge variant='default'>Done</Badge>;
    case "pending":
      return <Badge variant='secondary'>Pending</Badge>;
    case "not-now":
      return <Badge variant='outline'>Not Now</Badge>;
    default:
      return <Badge variant='secondary'>Unknown</Badge>;
  }
};

const PropTable: React.FC = () => {
  return (
    <Card className='flex flex-col gap-4 px-6 py-4'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold'>Widget Data Properties</h2>
        <p className='text-sm text-muted-foreground'>
          Supported data attributes for configuring the widget behavior and
          appearance.
        </p>
      </div>

      <div className='flex flex-col gap-0'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Attribute</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Accepted Values</TableHead>
              <TableHead>Default</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {propData.map((prop, index) => (
              <TableRow key={index}>
                <TableCell className='font-medium'>{prop.name}</TableCell>
                <TableCell>
                  <code className='relative rounded bg-muted px-2 py-1 font-mono text-sm'>
                    {prop.attribute}
                  </code>
                </TableCell>
                <TableCell>
                  <Badge variant='outline'>{prop.type}</Badge>
                </TableCell>
                <TableCell>
                  {prop.acceptedValues && (
                    <code className='relative rounded bg-muted px-2 py-1 font-mono text-sm'>
                      {prop.acceptedValues}
                    </code>
                  )}
                </TableCell>
                <TableCell>
                  <code className='relative rounded bg-muted px-2 py-1 font-mono text-sm'>
                    {prop.defaultValue}
                  </code>
                </TableCell>
                <TableCell className='text-sm text-muted-foreground'>
                  {prop.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default PropTable;
