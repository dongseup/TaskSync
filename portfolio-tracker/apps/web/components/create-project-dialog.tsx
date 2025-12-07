// apps/web/components/create-project-dialog.tsx
"use client";

import { useEffect, useState } from "react";
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
import { supabase } from "@/lib/supabase"; 

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
  const [myId, setMyId] = useState<string | null>(null); // 내 ID 저장용

  // React Hook Form 설정
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<ProjectFormData>();

  // ⭐ 컴포넌트가 열릴 때 내 ID 가져오기
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setMyId(user.id);
        setValue("ownerId", user.id); // 폼 필드에 값 강제 주입
      }
    };
    checkUser();
  }, [setValue]);

  const onSubmit = async (data: ProjectFormData) => {
    try {
      // 1. 백엔드로 POST 요청
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res: Response = await fetch(`${apiUrl}/projects`, {
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

          {/* 👇 Owner ID 필드 수정: 이제 숨기거나 읽기 전용으로 변경 */}
          <div className="grid gap-2">
             <Label>작성자 (자동 입력)</Label>
             <Input 
                disabled 
                value={myId ? `내 ID: ${myId}` : "로그인이 필요합니다"} 
                className="bg-gray-100"
             />
             {/* 실제 값은 hidden input으로 전송 */}
             <input type="hidden" {...register("ownerId", { required: true })} />
          </div>

          <div className="flex justify-end gap-3 mt-4">
             {/* 만약 로그인이 안 되어 있다면 버튼 비활성화 */}
             {!myId && <span className="text-xs text-red-500 self-center">로그인 후 이용 가능</span>}
             <Button type="submit" disabled={isSubmitting || !myId}>
               생성하기
             </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}