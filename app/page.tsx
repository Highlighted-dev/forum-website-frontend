/**
 * v0 by Vercel.
 * @see https://v0.dev/t/g6BODlhME4P
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 ">
        <div className="container mx-auto grid grid-cols-1 gap-6 py-8 px-4 md:grid-cols-[1fr_300px] md:px-6">
          <div className="rounded-lg  p-6 shadow ">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Latest Discussions</h2>
              <Link
                href="#"
                className="text-sm font-mediumhover:underline"
                prefetch={false}
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 shrink-0 border">
                  <img src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Link
                        href="#"
                        className="font-medium text-blue-500 hover:underline"
                        prefetch={false}
                      >
                        John Doe
                      </Link>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        2 hours ago
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-50"
                    >
                      Moderator
                    </Badge>
                  </div>
                  <Link
                    href="#"
                    className="mt-2 block text-lg font-medium hover:underline"
                    prefetch={false}
                  >
                    How to set up a React project with Tailwind CSS?
                  </Link>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    I'm new to React and Tailwind CSS, and I'm trying to set up
                    a new project. Can someone guide me through the process?
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 shrink-0 border">
                  <img src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Link
                        href="#"
                        className="font-medium text-blue-500 hover:underline"
                        prefetch={false}
                      >
                        Sarah Anderson
                      </Link>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        1 day ago
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-50"
                    >
                      Regular User
                    </Badge>
                  </div>
                  <Link
                    href="#"
                    className="mt-2 block text-lg font-medium hover:underline"
                    prefetch={false}
                  >
                    Best practices for writing clean and maintainable CSS
                  </Link>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    I'm working on a large-scale project and I'm looking for
                    tips on how to write clean and maintainable CSS. Any advice
                    would be appreciated.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 shrink-0 border">
                  <img src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Link
                        href="#"
                        className="font-medium text-blue-500 hover:underline"
                        prefetch={false}
                      >
                        Michael Johnson
                      </Link>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        3 days ago
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-50"
                    >
                      Admin
                    </Badge>
                  </div>
                  <Link
                    href="#"
                    className="mt-2 block text-lg font-medium hover:underline"
                    prefetch={false}
                  >
                    Migrating from JavaScript to TypeScript: Tips and Tricks
                  </Link>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    I'm currently working on a project that uses JavaScript, and
                    I'm considering migrating to TypeScript. What are some best
                    practices and things I should keep in mind?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Chat</h2>
              <Button variant="ghost" size="icon">
                <SettingsIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="h-[400px] overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 shrink-0 border">
                    <img src="/placeholder.svg" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <Link
                          href="#"
                          className="font-medium text-blue-500 hover:underline"
                          prefetch={false}
                        >
                          John Doe
                        </Link>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          2 minutes ago
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-50"
                      >
                        Moderator
                      </Badge>
                    </div>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Hey everyone, just wanted to let you know that the latest
                      update to the forum software is now live. Let me know if
                      you have any issues.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 shrink-0 border">
                    <img src="/placeholder.svg" alt="Avatar" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <Link
                          href="#"
                          className="font-medium text-blue-500 hover:underline"
                          prefetch={false}
                        >
                          Sarah Anderson
                        </Link>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          5 minutes ago
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-50"
                      >
                        Regular User
                      </Badge>
                    </div>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Thanks for the update, John. I'm excited to try out the
                      new features!
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 shrink-0 border">
                    <img src="/placeholder.svg" alt="Avatar" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <Link
                          href="#"
                          className="font-medium text-blue-500 hover:underline"
                          prefetch={false}
                        >
                          Michael Johnson
                        </Link>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          10 minutes ago
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-50"
                      >
                        Admin
                      </Badge>
                    </div>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Great to hear, Sarah. Let me know if you have any
                      questions or issues.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Textarea
                placeholder="Type your message..."
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <div className="mt-2 flex justify-end">
                <Button>Send</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
          <p className="text-sm">&copy; 2023 Forum. All rights reserved.</p>
          <nav className="hidden space-x-4 md:flex">
            <Link
              href="#"
              className="text-sm transition-colors hover:text-gray-400"
              prefetch={false}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm transition-colors hover:text-gray-400"
              prefetch={false}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm transition-colors hover:text-gray-400"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function FlagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function LogOutIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
