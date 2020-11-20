export interface IUpload {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  filename: string;
  originalfilename: string;
  mimetype: string;
  size: number;
}