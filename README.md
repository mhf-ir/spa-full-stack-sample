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
