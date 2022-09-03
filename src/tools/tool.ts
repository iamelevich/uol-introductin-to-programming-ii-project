export enum IconType {
  FA = 'font-awesome',
  Image = 'image',
}

export interface ITool {
  name: string;
  icon: string;
  iconType: IconType;
  draw(): void;
}
