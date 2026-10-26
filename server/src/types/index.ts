import {
  Role,
  SaleStatus,
  PaymentMode,
  SaleType,
  CreditStatus,
  SmsStatus,
  CustomerType,
} from '@prisma/client';

export interface JwtPayload {
  userId: number;
  role: Role;
  name: string;
  shopId?: number | null;
}

// Re-export prisma enums for convenience
export { Role, SaleStatus, PaymentMode, SaleType, CreditStatus, SmsStatus, CustomerType };
