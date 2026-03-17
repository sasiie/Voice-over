import {
  HeadContent,
  Scripts,
  createRootRoute,
  Link,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import ChatList from "@/components/chatList";
import { ChatsProvider, useChats } from "../hooks/useChats";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Voice-over",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ChatsProvider>
          <SidebarProvider>
            <Appshell>{children}</Appshell>
          </SidebarProvider>
        </ChatsProvider>

        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}

function Appshell({ children }: { children: React.ReactNode }) {
  const { chats, activeChatId, setActiveChatId } = useChats();
  return (
    <div className="flex h-screen w-full">
      <Sidebar>
        <SidebarHeader>
          <Link to="/">
            <div className="px-2 py-2 font-semibold">VOICE-OVER</div>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/about">
                    <span className="font-medium">Om oss</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <div className="px-2 pb-2 text-sm font-medium text-muted-foreground">
              Dina chattar
            </div>
            <ChatList
              chats={chats}
              activeChatId={activeChatId}
              onSelect={setActiveChatId}
            />
            <SidebarMenu className="mt-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/chats">
                    <span className="font-medium">Kolla dina chattar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <button
                        className="text-white bg-cyan-600 px-3 py-2 rounded"
                        onClick={() =>
                          createChat(
                            "Testchat" + new Date().toLocaleTimeString(),
                          )
                        }
                      >
                        Börja ny chatt
                      </button> */}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter />
      </Sidebar>
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </div>
  );
}
