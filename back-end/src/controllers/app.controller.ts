import { Get, Controller, Render } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('views')
  @Render('index')
  render() {
    return this.appService.render();
  }
}
