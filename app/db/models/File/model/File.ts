import { config } from "@/config";
import { BaseModel } from "@/libraries/BaseModel";
import { getPublicReadUrl } from "@/services/FileManagerService";
import { AfterFind, Column, DataType, Table } from "sequelize-typescript";

@Table({
  tableName: "file",
})
export class File extends BaseModel<File> {
  static handleFindAll() {
    throw new Error("Method not implemented.");
  }
  static map(arg0: (file: any) => any): any {
    throw new Error("Method not implemented.");
  }
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fileName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  path: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isUploaded: boolean;
  static url: any;

  @Column({ type: DataType.VIRTUAL })
  get url() {
    return this._url;
  }
  // Calculated property
  _url: string;

  @Column({ type: DataType.VIRTUAL })
  get downloadUrl() {
    return this._downloadUrl;
  }
  // Calculated property
  _downloadUrl: string;

  async populateUrl(): Promise<string> {
    this._url = await getPublicReadUrl(
      this.path,
      config.auth.azure.Blob.containerName,
    );
    this._downloadUrl = await getPublicReadUrl(
      this.path,
      config.auth.azure.Blob.containerName,
      true,
      this.fileName,
    );
    return this._url;
  }

  @AfterFind
  static populateUrl(files: File | File[]) {
    if (Array.isArray(files)) {
      return Promise.all(files.map(p => p.populateUrl()));
    }
    return files.populateUrl();
  }
}
