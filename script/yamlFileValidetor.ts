import { runCheckOverChangedFiles, CheckContext } from './utils/changedFilesValidator';
import {ExitCode } from './utils/exitCode';
import yaml from 'js-yaml';
import fs from 'fs';

export async function IsValidYamlFile(filePath:string): Promise<number> {
    try {
        yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
        return ExitCode.SUCCESS;
    }
    catch (e) {
        console.error(`Incorrect yaml file. Tile path: ${filePath}. Error message: ${e.message}`);
        return ExitCode.ERROR;
    }
}

let fileTypeSuffixes = ["yaml","yml"];
let CheckOptions = {
  onCheckFile: (filePath: string, context: CheckContext) => {
      console.log(filePath);
      return context.exec(`cat ${filePath}`);
  },
  onExecError:async(e:any) => {
      console.log(`ERROR: incorrect yaml files  ${e.message}`);
    }, 
  onFinalFailed: async () => {
    console.log('ERROR: incorrect yaml files');
  }
}


runCheckOverChangedFiles(CheckOptions, fileTypeSuffixes);
