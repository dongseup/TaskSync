// apps/web/components/create-project-dialog.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// 폼 데이터 타입 정의
interface ProjectFormData {
  name: string;
  description: string;
  key: string;
  ownerId: string;
}

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false); // 모달 열림/닫힘 상태
  const router = useRouter(); // 데이터 갱신을 위해 사용

  // React Hook Form 설정
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProjectFormData>();

  const onSubmit = async (data: ProjectFormData) => {
    try {
      // 1. 백엔드로 POST 요청
      const res = await fetch("http://localhost:4000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("생성 실패");

      // 2. 성공 시 처리
      alert("프로젝트가 생성되었습니다!");
      setOpen(false); // 모달 닫기
      reset(); // 폼 초기화
      router.refresh(); // ⭐ 핵심: 페이지 데이터를 서버에서 다시 가져옵니다 (새로고침 효과)
      
    } catch (error) {
      alert("에러가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ 새 프로젝트 생성</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>프로젝트 생성</DialogTitle>
          <DialogDescription>
            새로운 프로젝트 정보를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        
        {/* 폼 시작 */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          
          <div className="grid gap-2">
            <Label htmlFor="name">프로젝트 명</Label>
            <Input id="name" {...register("name", { required: true })} placeholder="예: 나의 멋진 앱" />
            {errors.name && <span className="text-red-500 text-xs">필수 항목입니다.</span>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="key">프로젝트 키 (고유값)</Label>
            <Input id="key" {...register("key", { required: true })} placeholder="예: MYAPP" />
            <p className="text-[0.8rem] text-muted-foreground">이슈 ID의 접두사로 사용됩니다.</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">설명</Label>
            <Textarea id="description" {...register("description")} placeholder="설명을 입력하세요" />
          </div>

          {/* ⚠️ 임시: 로그인 기능이 없으므로 Owner ID를 직접 입력받음 */}
          <div className="grid gap-2">
             <Label htmlFor="ownerId" className="text-blue-600">Owner ID (임시)</Label>
             <Input 
                id="ownerId" 
                {...register("ownerId", { required: true })} 
                placeholder="Prisma Studio나 리스트에서 ID 복사해서 넣으세요" 
             />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>취소</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "생성 중..." : "생성하기"}
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}