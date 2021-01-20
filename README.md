# aasaam cms

## Configurations

All environment variable must has prefix `ASM_`.

* Start with `ASM_PUBLIC` will expose as public configuration, otherwise consideration as secure/private variable.

| Public Environment Variable | Default       | Description                                            |
| --------------------------- | ------------- | ------------------------------------------------------ |
| `ASM_PUBLIC_APP_NS`         | **undefined** | Namespace for the running application                  |
| `ASM_PUBLIC_APP_PREFIX`     | `/`           | Namespace for the running application                  |
| `ASM_PUBLIC_APP_TITLE`      | **undefined** | Title for the running application                      |
| `ASM_PUBLIC_APP_TEST`       | `false`       | Application running in testing mode                    |
| `ASM_PUBLIC_APP_READ_ONLY`  | `false`       | Application running in readonly mode for maintain mode |

| Secure/Private Environment Variable | Default       | Description                                                                      |
| ----------------------------------- | ------------- | -------------------------------------------------------------------------------- |
| `ASM_APP_PORT`                      | **undefined** | Expose port for application                                                      |
| `ASM_APP_INSTANCE`                  | `2`           | Number of process for running application. It could be number between `1` to `8` |
| `ASM_REDIS_URI`                     | **undefined** | FQDN connection URI for Redis like `redis://redis`                               |

## Development

For development:

1. Import root ca to your browser for valid HTTPS connections `nginx/cert-local/ca.pem`.
2. Run docker-compose `docker-compose -f docker-compose.dev.yml up -d`
3. For frontend development `docker exec -it app-frontend bash`
   1. `npm install`
   2. `npm run dev`
   3. Open your browser [localhost](https://localhost/)
4. For backend development `docker exec -it app-backend bash`
   1. `npm install`
   2. `npm run dev`
   3. Open Swagger UI [localhost](https://localhost/api/docs/index.html)
   4. Open GraphQL UI [localhost](https://localhost/api/graphql)

## Build
