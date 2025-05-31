import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div> */}
          <div className="min-h-[100vh] md:min-h-min">
            {/* IFTTT like input boxes with timeline */}
            <div className="mt-12 p-12 max-w-3xl mx-auto bg-muted/50 rounded-xl">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Create a Bounty</h2>
                <p className="text-muted-foreground mb-6">
                  Use the form below to create a new bounty linked to issues in
                  your project.
                </p>
              </div>
              <form>
                <div className="grid w-full items-center gap-3 border border-zinc-800 rounded-lg p-4">
                  <Label htmlFor="issueURL">
                    If the following GitHub issue
                  </Label>
                  <Input type="text" placeholder="GitHub issue URL..." />
                </div>

                {/* <div className="pl-0.5 h-10 w-0 mx-auto bg-zinc-600" /> */}
                <div className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-move-down-icon lucide-move-down text-zinc-600"
                  >
                    <path d="M8 18L12 22L16 18" />
                    <path d="M12 2V22" />
                  </svg>
                </div>

                <div className="grid w-full items-center gap-3 border border-zinc-800 rounded-lg p-4">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        Receives a successful Pull Request
                      </SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-move-down-icon lucide-move-down text-zinc-600"
                  >
                    <path d="M8 18L12 22L16 18" />
                    <path d="M12 2V22" />
                  </svg>
                </div>

                <div className="grid w-full items-center gap-3 border border-zinc-800 rounded-lg p-4">
                  <Label htmlFor="bountyAmount">Then create a bounty of</Label>
                  <Input type="text" placeholder="Bounty amount..." />
                </div>

                <div className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-move-down-icon lucide-move-down text-zinc-600"
                  >
                    <path d="M8 18L12 22L16 18" />
                    <path d="M12 2V22" />
                  </svg>
                </div>

                <Button type="submit" className="w-full cursor-pointer">
                  Create Bounty
                </Button>
              </form>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
