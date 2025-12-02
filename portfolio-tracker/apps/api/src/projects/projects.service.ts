import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
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
