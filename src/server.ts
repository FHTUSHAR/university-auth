import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import {logger,errorlogger} from './shared/logger';
import {Server} from 'http'

process.on('uncaughtException',error=>{
  errorlogger.error(error)
  process.exit(1)
})

let server:Server;

async function main() {

  try {
    await mongoose.connect(config.database_url as string);
    server=app.listen(config.port, () => {
      logger.info(`Application app listening on port ${config.port}`);
    });
    logger.info('database connected');
    
  } catch (e) {
    errorlogger.error('connection failed', e);
  }
  process.on('unhandledRejection',(error)=>{
    if(server){
      server.close(()=>{
        errorlogger.error(error)
        process.exit(1)
      })
    }
    else{
      process.exit(1)
    }
  })
}

main();

process.on('SIGTERM',()=>{
  logger.info('SIGTERM is received')
  if(server){
    server.close()
  }
})