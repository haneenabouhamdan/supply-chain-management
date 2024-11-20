import {
  Brackets,
  LessThanOrEqual,
  MoreThanOrEqual,
  ObjectLiteral,
  SelectQueryBuilder,
} from 'typeorm';
import { FilterArgs } from '../dtos/filter.dto';
import { OrderSort } from '../types/enums';
import { TypeOrmFilter } from '../types/type';

export abstract class BaseFilter<T extends ObjectLiteral, F extends FilterArgs>
  implements TypeOrmFilter<T, F>
{
  protected query: SelectQueryBuilder<T>;

  // TODO: prevent write access from children
  protected alias: string;

  protected simpleFilters: Array<keyof T> = ['id'];

  protected sortable: Array<keyof T> = ['createdAt'];

  protected searchable: Array<keyof T> = ['id'];

  protected defaultOrderSort = OrderSort.DESC;

  abstract applyCustomSort(filters: F): BaseFilter<T, F>;
  abstract applyCustomFilters(filters: F): SelectQueryBuilder<T>;

  setQuery(query: SelectQueryBuilder<T>): BaseFilter<T, F> {
    this.query = query;
    this.alias = this.query.alias;
    return this;
  }

  apply(filters: F): SelectQueryBuilder<T> {
    return this.applySimpleFilters(filters)
      .applyDateFilters(filters)
      .applyOrderBy(filters)
      .applySearch(filters)
      .applyCustomSort(filters)
      .applyCustomFilters(filters);
  }

  applySimpleFilters(filters: F): BaseFilter<T, F> {
    for (const [key, value] of Object.entries(filters)) {
      if ((!value && value !== false) || !this.simpleFilters.includes(key)) {
        continue;
      }

      if (value.constructor === Array) {
        this.query.andWhere(`${this.alias}.${key} IN(:...${key})`, {
          [key]: value,
        });
      } else {
        this.query.andWhere(`${this.alias}.${key} = :${key}`, { [key]: value });
      }
    }

    if (filters.limit && !filters.page) {
      this.query.take(filters.limit);
    }

    return this;
  }

  applyOrderBy(filters: F): BaseFilter<T, F> {
    if (!filters.orderBy || !this.sortable.includes(filters.orderBy)) {
      return this;
    }

    this.query.orderBy(
      `${this.alias}.${filters.orderBy}`,
      filters.order || this.defaultOrderSort,
    );
    return this;
  }

  applyDateFilters(filters: F): BaseFilter<T, F> {
    const { startDate, endDate } = filters;
    // Apply specific date later
    if (startDate) {
      this.query.andWhere({ createdAt: MoreThanOrEqual(startDate) });
    }
    if (endDate) {
      this.query.andWhere({ createdAt: LessThanOrEqual(endDate) });
    }
    return this;
  }

  applySearch(filters: F): BaseFilter<T, F> {
    if (!filters.keyword || this.searchable.length === 0) {
      return this;
    }

    // TODO: enhance later to use full text search or search engine.
    this.query.andWhere(
      new Brackets((qb) => {
        this.searchable.forEach((column) => {
          qb.orWhere(`${this.alias}.${String(column)} ILIKE :keyword`, {
            keyword: `%${filters.keyword}%`,
          });
        });
      }),
    );

    return this;
  }
}
