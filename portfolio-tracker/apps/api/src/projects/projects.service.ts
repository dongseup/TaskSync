import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProjectDto: CreateProjectDto) {
    // DTO에 정의되지 않은 타입이 들어올 수 있으니, 여기서 Prisma 타입에 맞게 매핑
    // (실무에선 DTO Class Validator를 쓰지만 지금은 약식으로 진행)
    const { name, description, key, ownerId } = createProjectDto as any;

    return this.prisma.project.create({
      data: {
        name,
        description,
        key, // 프로젝트 키 (예: PROJ-1)
        ownerId, // 프로젝트 만든 사람 ID
      },
    });
  }

  // 프로젝트 목록 전체를 조회하는 메서드
  findAll() {
    // prisma.project는 schema.prisma에 정의한 Project 모델을 의미합니다.
    return this.prisma.project.findMany({
      // 프로젝트 생성자 정보도 함께 가져오도록 설정
      include: {
        owner: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
