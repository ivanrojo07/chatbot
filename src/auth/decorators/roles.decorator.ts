import { SetMetadata } from '@nestjs/common';

export const Roles = (role) => {
  return SetMetadata('roles', role);
};
