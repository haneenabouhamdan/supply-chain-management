import {
  DataSource,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { IPaginatedType, PaginationArgs } from '../dtos';
import { FilterArgs } from '../dtos/filter.dto';
import { TypeOrmFilter } from '../types/type';

type PaginationFindManyOptions<T> = Omit<
  FindManyOptions<T>,
  'skip' | 'take' | 'offset' | 'limit'
>;

export abstract class BaseRepository<
  T extends ObjectLiteral,
  F extends FilterArgs = Record<string, never>,
> extends Repository<T> {
  protected filter?: TypeOrmFilter<T, F>;

  protected constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    super(entity, dataSource.createEntityManager());
  }

  setFilter(filter: TypeOrmFilter<T, F>): void {
    this.filter = filter;
  }

  async findOne(options?: FindOneOptions<T>): Promise<Nullable<T>> {
    if (!options) {
      throw new Error('You are calling findOne without arguments');
    }

    return super.findOne(options);
  }

  async paginate(
    pagination?: PaginationArgs,
    filtersOrQuery?: SelectQueryBuilder<T> | PaginationFindManyOptions<T>,
  ): Promise<IPaginatedType<T>> {
    let { page, perPage } = pagination || {};
    page = page ?? 1;
    perPage = perPage ?? 10;

    const offset = (page - 1) * perPage;

    filtersOrQuery = filtersOrQuery || {};

    if (!(filtersOrQuery instanceof SelectQueryBuilder)) {
      const data = await this.find({
        ...filtersOrQuery,
        skip: offset,
        take: perPage,
      });

      const totalCount = await this.count(filtersOrQuery);

      return {
        data: data ?? [],
        total: totalCount,
        pageCount: Math.ceil(totalCount / perPage),
        currentPage: page,
        perPage,
        prevPage: page === 1 ? null : page - 1,
        nextPage: page * perPage < totalCount ? page + 1 : null,
      };
    }

    const totalCountQuery = filtersOrQuery.clone();
    const data = await filtersOrQuery.skip(offset).take(perPage).getMany();
    const totalCount = await totalCountQuery.getCount();
    const hasNextPage = page * perPage < totalCount;

    return {
      data,
      pageCount: Math.ceil(totalCount / perPage),
      currentPage: page,
      total: totalCount,
      perPage,
      prevPage: page === 1 ? null : page - 1,
      nextPage: hasNextPage ? page + 1 : null,
    };
  }

  async getList(filters: F): Promise<T[] | IPaginatedType<T>> {
    const { page, perPage } = filters;
    let query = this.createQueryBuilder(this.metadata.tableName);

    if (this.filter) {
      query = this.filter.setQuery(query).apply(filters);
    }

    if (!!page) {
      return this.paginate({ page, perPage }, query);
    }

    return query.getMany();
  }
}
