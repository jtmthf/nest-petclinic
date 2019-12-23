import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class WelcomeController {
  @Get()
  @Render('welcome')
  welcome() {
    // nothing to do
  }
}
