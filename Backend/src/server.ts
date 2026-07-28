import app from './app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    // Verify database connection
    await prisma.$connect();
    console.log('✅ Successfully connected to the PostgreSQL database.');

    // Start Express Server
    app.listen(PORT, () => {
      console.log(`🚀 ZentStay Backend is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start the application:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

bootstrap();