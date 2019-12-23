import { Controller, Get } from '@nestjs/common';

@Controller('oups')
export class CrashController {
  @Get()
  triggerException() {
    throw new Error(
      'Expected: controller used to showcase what happens when an exception is thrown',
    );
  }
}
