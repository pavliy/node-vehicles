import { CacheModule, Module } from '@nestjs/common';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    CacheModule.register({ isGlobal: true, ttl: +process.env.CACHE_TIMEOUT! }),
  ],
})
export class CachingModule {}
