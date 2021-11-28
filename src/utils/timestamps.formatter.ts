import { TransformFnParams } from 'class-transformer';
import { format } from 'date-fns-tz';
import ptBR from 'date-fns/locale/pt-BR';

export const date2TzStringDate = (data: TransformFnParams) =>
  format(data.value, 'yyyy-MM-dd HH:mm:ss.SS', {
    timeZone: process.env.TIMEZONE,
    locale: ptBR,
  });
