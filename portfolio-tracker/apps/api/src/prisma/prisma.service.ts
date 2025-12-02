// apps/api/src/prisma/prisma.service.ts

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    // NestJS 앱이 시작되면 DB에 연결합니다.
    await this.$connect();
  }

  async onModuleDestroy() {
    // NestJS 앱이 종료되면 DB 연결을 끊습니다.
    await this.$disconnect();
  }

  // 이 함수는 테스트용 등으로 사용할 수 있지만, 지금은 비워둡니다.
  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('beforeExit', async () => {
  //     await app.close();
  //   });
  // }
}