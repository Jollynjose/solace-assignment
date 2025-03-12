import { advocatesService } from '@/services';
import { IPagination, TAdvocates } from '@/types';
import { advocatesParamsValidator } from '@/validators';
import { NextRequest } from 'next/server';
import { ZodError } from 'zod';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const limit = searchParams.get('limit') ?? 10;
    const offset = searchParams.get('offset') ?? 0;
    const orderType = searchParams.get('orderType') ?? 'ASC';
    const orderBy = searchParams.get('orderBy') ?? 'id';
    const search = searchParams.get('search');

    const { error } = advocatesParamsValidator.safeParse({
      limit: limit ? Number(limit) : 10,
      offset: offset ? Number(offset) : 10,
      orderType: orderType ? orderType.toString() : 'ASC',
      orderBy: orderBy ? orderBy.toString() : 'id',
      search: search ? search.toString() : undefined,
    });

    if (error) {
      throw error;
    }

    const pagination = {
      limit,
      offset,
      order: {
        field: orderBy,
        type: orderType,
      },
    } as IPagination<TAdvocates>;

    const advocatesWithSpecialities =
      await advocatesService.getAdvocatesWithSpecialities(
        pagination,
        search as string,
      );

    return new Response(
      JSON.stringify({
        data: advocatesWithSpecialities,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(
        JSON.stringify({
          message: error.errors,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        error,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
