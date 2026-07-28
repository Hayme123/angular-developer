# BFF Implementation Example

This example shows the required Route → Controller → Service separation. Adapt names, response types, validation, and client usage to the current repository.

## Route

```ts
import express, { Request, Response, Router } from 'express';

import { resourceController } from '../controllers/resource.controller.js';

const router: Router = express.Router();

router.get('/', (request: Request, response: Response): Promise<void> =>
  resourceController.getAll(request, response),
);

export default router;
```

## Controller

```ts
import { Request, Response } from 'express';

import { ResourceService } from '../services/resource.service.js';

/** Handles resource HTTP requests. */
export class ResourceController {
  private readonly resourceService = new ResourceService();

  /** Returns the requested resource collection. */
  public async getAll(request: Request, response: Response): Promise<void> {
    try {
      const limit = Number.parseInt(String(request.query.limit ?? '100'), 10);
      const offset = Number.parseInt(String(request.query.offset ?? '0'), 10);
      const resources = await this.resourceService.getAll({ limit, offset });

      response.json({
        data: resources,
        meta: { limit, offset, count: resources.length },
      });
    } catch (error: unknown) {
      console.error('[ResourceController] Failed to fetch resources', error);
      response.status(500).json({
        error: 'fetch_failed',
        errorDescription: 'Failed to fetch resources',
      });
    }
  }
}

export const resourceController = new ResourceController();
```

## Service

```ts
import { httpClient } from './http-client.service.js';

import { Resource } from '../types/api.types.js';

interface GetAllOptions {
  limit?: number;
  offset?: number;
}

interface ResourceCollectionResponse {
  data: Resource[];
}

/** Implements resource business and data operations. */
export class ResourceService {
  /** Fetches a resource collection. */
  public async getAll(options: GetAllOptions): Promise<Resource[]> {
    const params = new URLSearchParams({
      limit: String(options.limit ?? 100),
      offset: String(options.offset ?? 0),
    });
    const response = await httpClient.get<ResourceCollectionResponse>(
      `/api/resources?${params}`,
    );

    return response.data;
  }

  /** Validates mutable resource fields. */
  private validateResourceData(data: Partial<Resource>): Partial<Resource> {
    if (!data.name?.trim()) throw new Error('Resource name is required');
    return { ...data, name: data.name.trim() };
  }
}
```

Register the route in the SSR server before a generic proxy:

```ts
import resourceRoutes from './server/routes/resource.routes.js';

app.use('/api/resources', validateOrigin, resourceRoutes);
```
