import 'dotenv/config';

import { serverHttp } from './app';
import { logger } from './shared/Util/configLogger';
import { env } from './shared/Util/Env/Env';

const {
  ENVIRONMENT: { PORT },
} = env;

serverHttp.listen(PORT, () => logger.info(`Server running on port: ${PORT}`));
