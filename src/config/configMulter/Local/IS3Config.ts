export interface IS3Service {
  DeleteImage({ key }: { key: string }): Promise<void>;
}
