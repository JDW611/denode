import { ValueTransformer } from 'typeorm';
import { LocalDate } from '@js-joda/core';
import { DateTimeUtil } from '@common/utils/date-time.util';

export class LocalDateTransformer implements ValueTransformer {
    to(entityValue: LocalDate): Date {
        if (!entityValue) {
            return null;
        }

        return DateTimeUtil.toDate(entityValue);
    }

    from(databaseValue: string): LocalDate {
        if (!databaseValue) {
            return null;
        }

        return DateTimeUtil.toLocalDateBy(databaseValue);
    }
}
