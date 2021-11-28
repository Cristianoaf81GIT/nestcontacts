import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ContactSeeder } from './modules/contacts/seeder/contact.seeder';
import { SeederModule } from './modules/seeder/seeder.module';

async function bootstrap() {
  const logger = new Logger();
  const appContext = await NestFactory.createApplicationContext(SeederModule, {
    logger: ['debug', 'verbose', 'error', 'warn'],
  });
  try {
    const contactsSeeder = appContext.get(ContactSeeder);
    await contactsSeeder.seed(200);
    logger.verbose('Successfully populate database');
  } catch (error) {
    logger.error(`Seeding failed: ${error}`);
  } finally {
    appContext.close();
  }
}
bootstrap();
