"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Upload,
  Copy,
  Check,
  Image as ImageIcon,
  Settings,
  Globe,
  Building,
  Hash,
} from "lucide-react";

export default function CustomizationPage() {
  const [projectName, setProjectName] = useState("My Awesome Project");
  const [domainName, setDomainName] = useState("my-awesome-project");
  const [logo, setLogo] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Mock project ID
  const projectId = "proj_1a2b3c4d5e6f7g8h9i0j";

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyProjectId = async () => {
    try {
      await navigator.clipboard.writeText(projectId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving customization:", {
      projectName,
      domainName,
      logo,
    });
  };

  return (
    <div className='px-6 py-4 flex flex-col gap-4 w-full'>
      {/* Project Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Building className='h-5 w-5' />
            Project Settings
          </CardTitle>
          <CardDescription>
            Customize your project's appearance and basic information
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Two Column Layout */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Left Column - Logo Upload */}
            <div className='space-y-3'>
              <div className='flex flex-col items-center gap-4'>
                <div className='flex items-center justify-center w-32 h-32 border-2 border-dashed border-border rounded-lg bg-muted/50'>
                  {logo ? (
                    <img
                      src={logo}
                      alt='Project Logo'
                      className='w-full h-full object-cover rounded-lg'
                    />
                  ) : (
                    <ImageIcon className='h-12 w-12 text-muted-foreground' />
                  )}
                </div>
                <div className='flex flex-col gap-2 items-center'>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleLogoUpload}
                    className='hidden'
                    id='logo-upload'
                  />
                  <Label htmlFor='logo-upload'>
                    <Button
                      variant='outline'
                      className='cursor-pointer'
                      asChild
                    >
                      <span>
                        <Upload className='h-4 w-4 mr-2' />
                        Upload Logo
                      </span>
                    </Button>
                  </Label>
                  <p className='text-xs text-muted-foreground text-center'>
                    Recommended: 200x200px, PNG or JPG
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Input Fields */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Project ID (Read-only) */}
              <div className='space-y-2'>
                <Label
                  htmlFor='project-id'
                  className='text-sm font-medium flex items-center gap-2'
                >
                  <Hash className='h-4 w-4' />
                  Project ID
                </Label>
                <div className='flex w-full gap-2'>
                  <Input
                    id='project-id'
                    value={projectId}
                    readOnly
                    className='h-10 flex-1 bg-muted/50 cursor-not-allowed'
                  />
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={copyProjectId}
                    className='h-10 w-10'
                  >
                    {copied ? (
                      <Check className='h-4 w-4 text-green-600' />
                    ) : (
                      <Copy className='h-4 w-4' />
                    )}
                  </Button>
                </div>
                <p className='text-xs text-muted-foreground'>
                  This is your unique project identifier. Use it for API
                  integrations.
                </p>
              </div>

              {/* Project Name */}
              <div className='space-y-2'>
                <Label
                  htmlFor='project-name'
                  className='text-sm font-medium flex items-center gap-2'
                >
                  <Building className='h-4 w-4' />
                  Project Name
                </Label>
                <Input
                  id='project-name'
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder='Enter your project name'
                  className='h-10'
                />
                <p className='text-xs text-muted-foreground'>
                  This will be displayed as your project's title
                </p>
              </div>

              {/* Domain Name */}
              <div className='space-y-2'>
                <Label
                  htmlFor='domain-name'
                  className='text-sm font-medium flex items-center gap-2'
                >
                  <Globe className='h-4 w-4' />
                  Domain Name
                </Label>
                <div className='flex w-full -space-x-px'>
                  <Input
                    type='text'
                    id='project-url'
                    className='rounded-r-none h-10 flex-1'
                    placeholder='my-project'
                  />
                  <span className='inline-flex items-center rounded-e-lg  border px-3 text-sm text-muted-foreground min-w-fit'>
                    .aura.vote
                  </span>
                </div>
                <p className='text-xs text-muted-foreground'>
                  Your project will be accessible at {domainName}.upvote.app
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className='flex justify-end'>
        <Button onClick={handleSave} className='px-6'>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
