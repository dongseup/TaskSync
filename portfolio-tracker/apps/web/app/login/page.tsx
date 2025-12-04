// apps/web/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // 방금 만든 것
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Supabase 로그인 요청
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("로그인 실패: " + error.message);
    } else {
      // 2. 로그인 성공 시 메인으로 이동
      router.push("/");
      router.refresh();
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    // 간단 회원가입 (이메일 인증 껐다면 바로 로그인 가능 상태가 됨)
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      alert("가입 실패: " + error.message);
    } else {
      alert("회원가입 성공! 이제 로그인 버튼을 눌러주세요.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>로그인 / 회원가입</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex flex-col gap-2 pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? "처리 중..." : "로그인"}
              </Button>
              <Button type="button" variant="outline" onClick={handleSignUp} disabled={loading}>
                회원가입
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}