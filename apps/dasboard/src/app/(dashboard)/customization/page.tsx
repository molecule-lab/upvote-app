"use client";

import { useEffect, useState } from "react";
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
import useTenant from "@/hooks/use-tenant";
import { useMutationUpdateTenant } from "@/api/useMutationUpdateTenant";

export default function CustomizationPage() {
  const { currentTenant } = useTenant();
  const { mutateAsync: updateTenant } = useMutationUpdateTenant();

  const [projectName, setProjectName] = useState("");
  const [domainName, setDomainName] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onUpdateTenant = async () => {
    try {
      const formData = new FormData();

      formData.append("slug", domainName);
      formData.append("name", projectName);

      if (logoFile) {
        formData.append("file", logoFile);
      }

      await updateTenant({
        data: formData,
        currentSlug: currentTenant?.tenant.slug,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLogoPreview(null);
      setLogoFile(null);
    }
  };

  useEffect(() => {
    setProjectName(currentTenant?.tenant?.name || "");
    setDomainName(currentTenant?.tenant?.slug || "");
  }, [currentTenant]);

  // Mock project ID

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Store the actual file object
      setLogoFile(file);

      // Create preview URL for display
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyProjectId = async () => {
    try {
      await navigator.clipboard.writeText(currentTenant.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    console.log(currentTenant);
  }, [currentTenant]);

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
                  {logoPreview || currentTenant?.tenant?.displayLogo ? (
                    <img
                      src={logoPreview || currentTenant?.tenant?.displayLogo}
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
                    value={currentTenant?.id}
                    onChange={() => {}}
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
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
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
        <Button onClick={onUpdateTenant} className='px-6'>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
