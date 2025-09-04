const { S3Client, PutBucketCorsCommand } = require('@aws-sdk/client-s3');

const ENDPOINT_URL = 'https://685457b7c4529ea63b6daef6bd6fac0b.r2.cloudflarestorage.com';
const BUCKET_NAME = 'origonlabs';

// Configuración del cliente S3
const s3Client = new S3Client({
  endpoint: ENDPOINT_URL,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function setupCORS() {
  const corsConfiguration = {
    CORSRules: [
      {
        AllowedHeaders: ['*'],
        AllowedMethods: ['GET', 'HEAD'],
        AllowedOrigins: [
          'https://opendex.dev',
          'https://*.opendex.dev',
          'https://cdn.origonlabs.opendex.dev',
          'https://origonlabs.com',
          'https://*.origonlabs.com',
          'http://localhost:3000',
          'http://localhost:3001',
          'http://localhost:8080',
          'http://127.0.0.1:3000',
          'http://127.0.0.1:8080'
        ],
        ExposeHeaders: [
          'Content-Length',
          'Content-Type',
          'Cache-Control',
          'ETag',
          'Last-Modified'
        ],
        MaxAgeSeconds: 3600
      }
    ]
  };

  try {
    const command = new PutBucketCorsCommand({
      Bucket: BUCKET_NAME,
      CORSConfiguration: corsConfiguration
    });

    await s3Client.send(command);
    console.log('✅ CORS configurado exitosamente');
    console.log('🌐 Orígenes permitidos:');
    corsConfiguration.CORSRules[0].AllowedOrigins.forEach(origin => {
      console.log(`   - ${origin}`);
    });
    
  } catch (error) {
    console.error('❌ Error configurando CORS:', error);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  setupCORS().catch(console.error);
}

module.exports = { setupCORS };
