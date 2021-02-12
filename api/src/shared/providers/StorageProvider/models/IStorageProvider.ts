export default interface IStorageProvider {
  createFile(file: string): Promise<void>;
  deleteFile(file: string): Promise<void>;
}
