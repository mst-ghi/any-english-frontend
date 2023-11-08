import { useQuery } from '@tanstack/react-query';
import useRequest from './useRequest';

const useFetchLightner = (
  args: {
    page?: number | string;
    take?: number | string;
    level?: TLightnerLevel;
    type?: TLightnerType;
  } = {
    page: 0,
    take: 10,
  },
) => {
  const { callRequest } = useRequest();

  const fetchLightners = async (): Promise<{
    lightners: ILightner[];
    meta: IPaginationMeta;
  }> => {
    let url = `/api/v1/lightner?page=${args.page || 0}&take=${args.take || 10}`;

    if (args.level) {
      url += `&level=${args.level}`;
    }

    if (args.type) {
      url += `&type=${args.type}`;
    }

    return await callRequest('GET', url);
  };

  const query = useQuery<{ lightners: ILightner[]; meta: IPaginationMeta }>({
    queryKey: ['lightners', args],
    queryFn: fetchLightners,
  });

  return query;
};

export default useFetchLightner;
