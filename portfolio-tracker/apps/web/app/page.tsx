// apps/web/app/page.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CreateProjectDialog } from "@/components/create-project-dialog";

// 타입 정의
interface Project {
  id: string;
  name: string;
  description: string | null;
  owner: {
    name: string | null;
    email: string;
  };
}

async function getProjects() {
  const res = await fetch('http://localhost:4000/projects', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default async function Page() {
  const projects: Project[] = await getProjects();

  return (
    <main className="container mx-auto py-10">
      {/* 헤더 영역 */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            나의 프로젝트 및 이슈 현황을 관리합니다.
          </p>
        </div>
        <CreateProjectDialog />
      </div>

      <Separator className="my-6" />

      {/* 프로젝트 리스트 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            생성된 프로젝트가 없습니다.
          </div>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2 h-10">
                      {project.description || "설명이 없습니다."}
                    </CardDescription>
                  </div>
                  {/* 상태 뱃지 (임시) */}
                  <Badge variant="secondary">Active</Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center space-x-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      {/* 아바타 이미지가 없으면 이메일 앞글자 표시 */}
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {project.owner.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{project.owner.name || project.owner.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}