import { Injectable } from '@nestjs/common';
import branches from '../parameters/branches';
import repositories from '../parameters/repositories';
import packages from '../parameters/packages';

@Injectable()
export class AppService {
  root(): string {
    for(let i = 0; i < branches.length; i++) {
      console.log('Branch: ', branches[ i ]);
    }
    for(let i = 0; i < repositories.length; i++) {
      console.log('Repository: ', repositories[ i ]);
    }
    for(let i = 0; i < packages.length; i++) {
      console.log('Package: ', packages[ i ]);
    }
    return 'It works!';
  }

  render(): any {
    return { message: 'Hello World!' }
  }
}
