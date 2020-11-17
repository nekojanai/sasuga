export const environment = {
  production: false,
  // GENERAL CONFIG
  DOMAIN:'localhost',
  PORT:3000,
  JWT_SECRET:'i_eat_dick',
  NGINX_CONTROL_URL:'http://localhost/control',
  NGINX_CONTROL_AUTH_BASE64:'dXNlcjpwb3N0bWFya2V0T1Mh',

  // POSTGRES DB OPTIONS
  DB_HOST:'localhost',
  DB_PORT:5432,
  DB_USERNAME:'sasuga',
  DB_PASSWORD:'postmarketOS!',
  DB_DATABASE:'sasuga',

  // MINIO S3
  // FOR AWS S3 JUST USE s3.amazonaws.com as S3_ENDPOINT
  // AND LEAVE S3_PORT AND S3_USESSL BLANK
  S3_ENDPOINT:'localhost',
  S3_PORT:9000,
  S3_USESSL:false,
  S3_ACCESSKEY:'minioadmin',
  S3_SECRETKEY:'minioadmin'
};
