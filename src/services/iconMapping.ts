import { 
  CssFile, 
  DefaultFile, 
  GitFile,
  ImageFile, 
  JsFile,
  JsonFile,
  ReadmeFile,
  YarnFile,
} from '../assets/icons';

export interface IconMapping {
  [key: string]: any;
}

export class FileIconService {
  private static iconMap: IconMapping = {
    'package.json': JsonFile,
    'yarn.lock': YarnFile,
    'package-lock.json': DefaultFile,
    '.gitignore': GitFile,
    
    'js': JsFile,
    'ts': JsFile,
    'jsx': JsFile,
    'tsx': JsFile,
    'css': CssFile,
    'scss': CssFile,
    'html': DefaultFile,
    'svg': ImageFile,
    'ico': ImageFile,
    'png': ImageFile,
    'jpg': ImageFile,
    'jpeg': ImageFile,
    'gif': ImageFile,
    'webp': ImageFile,
    'bmp': ImageFile,
    'tiff': ImageFile,
  };

  static getFileIcon(filename: string) {
    const ext = filename.split('.').pop()?.toLowerCase();
    const fullName = filename.toLowerCase();
    
    if (fullName === 'package.json' || fullName.endsWith('.json')) {
      return JsonFile;
    }
    if (fullName === 'yarn.lock') {
      return YarnFile;
    }
    if (fullName === 'package-lock.json' || fullName.endsWith('.lock')) {
      return DefaultFile;
    }
    if (fullName.startsWith('readme')) {
      return ReadmeFile;
    }
    if (fullName === '.gitignore' || fullName.startsWith('.git')) {
      return GitFile;
    }
    if (fullName.startsWith('.env') || fullName.endsWith('.env')) {
      return DefaultFile;
    }
    
    return ext ? this.iconMap[ext] || DefaultFile : DefaultFile;
  }

  static addIconMapping(extension: string, icon: any) {
    this.iconMap[extension] = icon;
  }
}
