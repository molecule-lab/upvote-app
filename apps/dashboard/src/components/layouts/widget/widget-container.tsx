"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useTenant from "@/hooks/use-tenant";
import { Popover } from "@radix-ui/react-popover";
import { debounce } from "lodash";
import {
  Bold,
  Copy,
  Hash,
  Info,
  Italic,
  Moon,
  Settings,
  Sun,
  Underline,
} from "lucide-react";
import { useMemo, useState } from "react";
import PropTable from "./prop-table";

const STATUS_VALUE_MAP = {
  "in-review": "In Review",
  "in-progress": "In Progress",
  completed: "Completed",
  declined: "Declined",
};

const WidgetContainer = () => {
  const [defaultOpen, setDefaultOpen] = useState(false);
  const [position, setPosition] = useState("right");
  const [widgetTheme, setWidgetTheme] = useState("dark");
  const [color, setColor] = useState("#10b981");
  const [isCollectEmail, setIsCollectEmail] = useState(true);
  const [isCustomButton, setIsCustomButton] = useState(false);
  const [defaultType, setDefaultType] = useState<string | undefined>(undefined);
  const [ctaText, setCtaText] = useState("Feedback");

  const { currentTenant } = useTenant();

  const onThemePress = (value: string) => {
    setWidgetTheme(value);
  };

  const onPositionPress = (value: string) => {
    setPosition(value);
  };

  const onDefaultOpenChange = (value: boolean) => {
    setDefaultOpen(value);
  };

  const onCollectEmailChange = (value: boolean) => {
    setIsCollectEmail(value);
  };

  const onCustomButtonChange = (value: boolean) => {
    setIsCustomButton(value);
  };

  const debouncedSetColor = useMemo(
    () =>
      debounce((value) => {
        setColor(value);
      }, 100),
    []
  );

  const onColorChange = (e: any) => {
    debouncedSetColor(e.target.value);
  };

  const onDefaultTypeChange = (value: string) => {
    setDefaultType(value);
  };

  const onCtaTextChange = (e: any) => {
    setCtaText(e.target.value);
  };

  const codeBuilder = () => {
    const scriptTag = `<script src="https://aura.vote/widget/widget.iife.js?tenantId=${currentTenant.tenant.id}" ${defaultOpen ? "data-default-open='true'" : ""} ${widgetTheme ? `data-theme="${widgetTheme}"` : ""} ${position ? `data-position=${position}` : ""} ${color && color !== "#10b981" ? `data-color="${color}"` : ""} ${defaultType ? `data-default-type="${defaultType}"` : ""} ${ctaText && ctaText !== "Feedback" ? `data-cta-text="${ctaText}"` : ""} />`;
    // Escape HTML characters so they display as text instead of being interpreted as HTML
    return scriptTag.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
  };
  return (
    <div className='w-full'>
      <div className='flex w-full gap-4 px-6 py-4 h-[90%]'>
        <Card className=' w-1/2 p-4'>
          <CardTitle>
            <h3 className='text-xl'>Widget Configuration</h3>
            <div className='text-sm text-muted-foreground'>
              Widget settings and instructions
            </div>
          </CardTitle>
          <CardContent className='p-0 flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <div>Default Open</div>
              <div>
                <Switch
                  id='collect-email'
                  checked={defaultOpen}
                  onCheckedChange={onDefaultOpenChange}
                />
              </div>
            </div>
            <div className='flex  flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <div>Custom Button</div>
                <div>
                  <Switch
                    id='custom-button'
                    checked={isCustomButton}
                    onCheckedChange={onCustomButtonChange}
                  />
                </div>
              </div>
              {isCustomButton && (
                <div>
                  <Alert>
                    <Info />
                    <AlertDescription className='block'>
                      Add the{" "}
                      <span className='text-primary'>data-aura-widget</span>{" "}
                      attribute on any button you want to trigger the widget.
                      Check Widget Installation code for more information.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>

            <div className='flex items-center justify-between'>
              <div>Theme</div>
              <div>
                <ToggleGroup
                  variant='outline'
                  type='single'
                  value={widgetTheme}
                  onValueChange={onThemePress}
                >
                  <ToggleGroupItem value='light' className='p-4'>
                    <Sun className='h-4 w-4' /> Light
                  </ToggleGroupItem>
                  <ToggleGroupItem value='system' className='p-4'>
                    <Settings className='h-4 w-4' /> System
                  </ToggleGroupItem>
                  <ToggleGroupItem value='dark' className='p-4'>
                    <Moon className='h-4 w-4' /> Dark
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div>Position</div>
              <div>
                <ToggleGroup
                  variant='outline'
                  type='single'
                  value={position}
                  onValueChange={onPositionPress}
                >
                  <ToggleGroupItem value='left' className='p-4'>
                    Left
                  </ToggleGroupItem>
                  <ToggleGroupItem value='right' className='p-4'>
                    Right
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div>Color</div>
              <div>
                <Input
                  value={color}
                  onChange={onColorChange}
                  className='w-[50px]'
                  type='color'
                />
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div>Default Type</div>
              <div>
                <ToggleGroup
                  variant='outline'
                  type='single'
                  value={defaultType}
                  onValueChange={onDefaultTypeChange}
                >
                  <ToggleGroupItem value='issue' className='p-4'>
                    <Sun className='h-4 w-4' /> Issue
                  </ToggleGroupItem>
                  <ToggleGroupItem value='idea' className='p-4'>
                    <Settings className='h-4 w-4' /> Idea
                  </ToggleGroupItem>
                  <ToggleGroupItem value='feedback' className='p-4'>
                    <Moon className='h-4 w-4' /> Feedback
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <Label>CTA Text</Label>
              <div>
                <Input
                  type='text'
                  placeholder='Feedback'
                  value={ctaText}
                  onChange={onCtaTextChange}
                />
              </div>
            </div>
            <div className='flex items-start justify-between'>
              <Label
                htmlFor='project-id'
                className='text-sm font-medium flex items-center gap-2'
              >
                Tenant ID
              </Label>
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2'>
                  <Input
                    id='project-id'
                    value={currentTenant?.tenant?.id}
                    onChange={() => {}}
                    readOnly
                    className='h-10 flex-1 bg-muted/50 cursor-not-allowed w-fit'
                  />
                </div>
                <p className='text-xs text-muted-foreground'>
                  This is your unique project identifier. Use it for widget
                  integrations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='w-1/2 p-4  '>
          <iframe
            className='rounded-lg h-full'
            srcDoc={`<html ><head>
             <style>
    pre {
      background: #1e1e1e;
      color: #dcdcdc;
      padding: 1rem;
      border-radius: 8px;
      font-family: monospace;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    code {
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
  </style></head> <body style="font-family:sans-serif; background-color: ${widgetTheme === "dark" ? "oklch(0.2077 0.0398 265.7549)" : "oklch(0.9819 0.0181 155.8263)"}; color: ${widgetTheme === "dark" ? "oklch(0.9819 0.0181 155.8263)" : "oklch(0.2781 0.0296 256.8480)"}"> <h1>Aura Widget Preview</h1> <div>Preview By Clicking the CTA</div> 
          ${isCustomButton ? '<div style="margin-top:10px;"> <button data-aura-widget >Custom Widget Trigger</button> </div>' : "<div/>"}

  <pre><code>
 ${codeBuilder()}
    </code></pre>
          <script src=https://aura.vote/widget/widget.iife.js?tenantId=${currentTenant?.tenant?.id} data-theme="${widgetTheme}" data-position="${position}" data-default-open="${defaultOpen}" data-color="${color}" data-cta-text="${ctaText}" data-collect-email="${isCollectEmail.toString()}" ${defaultType && `data-default-type="${defaultType}"`}></script></body></html>`}
          ></iframe>
        </Card>
      </div>
      <div className='px-6 py-1'>
        <PropTable />
      </div>
    </div>
  );
};

export { WidgetContainer };
