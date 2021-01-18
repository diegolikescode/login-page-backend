import Redis, { Redis as RedisClient } from 'ioredis'
import cacheConfig from '../config/cacheConfig'

export default class RedisCacheProvider {
  private client: RedisClient

  constructor() {
    this.client = new Redis(cacheConfig.redis)
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key)
    if (!data) {
      return null
    }

    const parsedData = JSON.parse(data) as T
    return parsedData
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value))
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key)
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`)

    const pipeline = this.client.pipeline()

    keys.forEach(key => {
      pipeline.del(key)
    })

    await pipeline.exec()
  }
}
