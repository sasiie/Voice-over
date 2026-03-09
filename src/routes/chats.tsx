import { createFileRoute } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export const Route = createFileRoute('/chats')({
  component: Chats,
})

function Chats() {
  return (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">Översikt</TabsTrigger>
        <TabsTrigger value="analytics">Favoriter</TabsTrigger>
        <TabsTrigger value="reports">Viktiga</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Översikt</CardTitle>
            <CardDescription>
               Här kan du se alla dina chattar vi har transkriberat.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            20 chattar.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Favoriter</CardTitle>
            <CardDescription>
              Här kan du sätta alla dina favoriter.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            12 chattar.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Viktiga</CardTitle>
            <CardDescription>
              Här kan du sätta alla viktiga chattar.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            8 chattar.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
