import { createParamDecorator } from '@nestjs/common';

export const Cookies = createParamDecorator((data, req) => {
  return req.cookies;
});
