"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export type User = {
  name: string;
  avatar?: string;
  last_seen: string;
  online_status: string;
  about: string;
  phone: string;
  country: string;
  website: string;
  social_links: { name: string; url: string }[];
};

interface ProfileSheetProps {
  user: User | null;
  onOpenChange: (isOpen: boolean) => void;
}

export function ProfileSheet({ user, onOpenChange }: ProfileSheetProps) {
  if (!user) return null;
  return (
    <Sheet open={!!user} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col gap-4 p-0">
        <SheetHeader className="p-4">
          <SheetTitle className="text-2xl">Profile</SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto px-4">
          <div className="my-4 flex flex-col items-center">
            <Avatar className="mb-4 size-32">
              {user.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : <AvatarFallback>{user.name.split(' ').map(p=>p[0]).slice(0,2).join('')}</AvatarFallback>}
            </Avatar>
            <h4 className="mb-2 text-xl font-semibold">{user.name}</h4>
            <div className="text-xs">
              Last seen: <span className="text-green-500">{user.last_seen}</span>
            </div>
          </div>

          <div className="space-y-2 divide-y">
            <div className="space-y-3 py-4">
              <h5 className="text-xs font-semibold uppercase">About</h5>
              <div className="text-muted-foreground">{user.about}</div>
            </div>
            <div className="space-y-3 py-4">
              <h5 className="text-xs font-semibold uppercase">Phone</h5>
              <div className="text-muted-foreground">{user.phone}</div>
            </div>
            <div className="space-y-3 py-4">
              <h5 className="text-xs font-semibold uppercase">Country</h5>
              <div className="text-muted-foreground">{user.country}</div>
            </div>
            <div className="space-y-3 py-4">
              <h5 className="text-xs font-semibold uppercase">Website</h5>
              <div>
                <a href={user.website} target="_blank" className="text-muted-foreground hover:text-primary hover:underline">
                  {user.website}
                </a>
              </div>
            </div>
            <div className="space-y-3 py-4">
              <h5 className="text-xs font-semibold uppercase">Social Links</h5>
              <div className="flex flex-wrap items-center gap-2">
                {user.social_links.map((link) => (
                  <Button key={link.name} asChild size="icon" variant="outline" className="size-12 rounded-full">
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.name === 'Facebook' && <Facebook className="h-5 w-5" />}
                      {link.name === 'X' && <Twitter className="h-5 w-5" />}
                      {link.name === 'Linkedin' && <Linkedin className="h-5 w-5" />}
                      {link.name === 'Instagram' && <Instagram className="h-5 w-5" />}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
