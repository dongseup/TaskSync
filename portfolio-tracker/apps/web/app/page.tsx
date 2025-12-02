// apps/web/app/page.tsx

// 1. 타입 정의 (나중엔 공유 패키지로 뺄 예정)
interface Project {
  id: string;
  name: string;
  description: string | null;
  owner: {
    name: string | null;
    email: string;
  };
}

// 2. 데이터 가져오는 함수 (Server Side)
async function getProjects() {
  // 백엔드(4000번)로 요청
  const res = await fetch('http://localhost:4000/projects', {
    cache: 'no-store', // SSR: 매 요청마다 최신 데이터 가져오기 (캐시 안 함)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

// 3. 메인 페이지 컴포넌트 (async 필수)
export default async function Page() {
  const projects: Project[] = await getProjects();

  return (
    <main style={{ padding: '2rem' }}>
      <h1>🚀 내 프로젝트 목록</h1>
      <p>백엔드(NestJS)에서 가져온 데이터입니다.</p>
      
      <div style={{ marginTop: '20px', display: 'grid', gap: '10px' }}>
        {projects.length === 0 ? (
          <p>프로젝트가 없습니다. DB에 데이터를 추가해보세요.</p>
        ) : (
          projects.map((project) => (
            <div 
              key={project.id} 
              style={{ 
                border: '1px solid #ccc', 
                padding: '16px', 
                borderRadius: '8px' 
              }}
            >
              <h3>{project.name}</h3>
              <p>{project.description || '설명 없음'}</p>
              <small>Manager: {project.owner?.name || project.owner?.email}</small>
            </div>
          ))
        )}
      </div>
    </main>
  );
}