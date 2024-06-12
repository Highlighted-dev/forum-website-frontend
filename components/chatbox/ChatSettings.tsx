"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { SettingsIcon } from "lucide-react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
export default function ChatSettings() {
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Chat Settings</h4>
            <p className="text-sm text-muted-foreground">
              Adjust your chat settings here
            </p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <Switch
              id="airplane-mode"
              checked={getCookie("displayTip") === "true"}
              onCheckedChange={(checked) => {
                setCookie("displayTip", `${checked}`, {
                  expires: new Date("2038-01-19T03:14:07"),
                });
                router.refresh();
              }}
            />
            <Label htmlFor="airplane-mode">Display Tip</Label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
