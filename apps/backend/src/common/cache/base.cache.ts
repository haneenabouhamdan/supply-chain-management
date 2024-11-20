import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

export abstract class BaseCache {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  protected async setCache(
    redisKey: string,
    redisValue: string | number | Buffer,
  ) {
    return this.redis.set(redisKey, redisValue);
  }

  protected async getCache(
    redisKey: string,
    hashKey?: string,
  ): Promise<string | null> {
    if (hashKey) {
      return this.redis.hget(redisKey, hashKey);
    } else {
      return this.redis.get(redisKey);
    }
  }

  protected async removeCash(redisKey: string) {
    return this.redis.del(redisKey);
  }

  protected async getCacheList(hashKey: string, hashFields: string[]) {
    return this.redis.hmget(hashKey, ...hashFields);
  }

  protected async setHashCache(
    hashName: string,
    hashKey: string,
    hashValue: string,
    expiration?: number,
  ): Promise<number> {
    const cache = await this.redis.hset(hashName, hashKey, hashValue);
    if (expiration) await this.redis.expire(hashName, expiration);
    return cache;
  }

  protected async setListHashCache(
    hashName: string,
    fields: { [key: string]: string },
  ) {
    if (!hashName) return;
    if (!fields || !Object.keys(fields).length) return;
    return this.redis.hmset(hashName, fields);
  }

  protected async addTTL(hashName: string, ttlInSeconds: number) {
    return this.redis.expire(hashName, ttlInSeconds);
  }

  protected async getTTL(hashName: string) {
    return this.redis.ttl(hashName);
  }

  protected async removeHashCache(
    redisKey: string,
    hashKey: string,
  ): Promise<number> {
    return this.redis.hdel(redisKey, hashKey);
  }
  protected async deleteHashKeys(key: string) {
    const hashKeys = await this.redis.hkeys(key);
    return hashKeys.map(async (hashKey) => {
      await this.redis.hdel(key, hashKey);
    });
  }

  async getMatchedKeysByPattern(
    pattern: string,
    cursor: string | number,
    count: string | number,
  ) {
    return await this.redis.scan(cursor, 'MATCH', pattern, 'COUNT', count);
  }

  async acquireLock(key: string, ttl: number): Promise<boolean> {
    const result = await this.redis.set(key, Date.now(), 'PX', ttl, 'NX');
    console.log({ result });
    return result === 'OK';
  }

  async releaseLock(key: string): Promise<boolean> {
    const result = await this.redis.del(key);
    return result > 0;
  }
}
