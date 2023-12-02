import { useQuery } from '@tanstack/react-query';
import useRequest from './useRequest';

const useFetchLightner = (
  args: {
    type?: TLightnerType;
  } = {},
) => {
  const { callRequest } = useRequest();

  const fetchLightners = async (): Promise<{
    lightners: ILightner[];
  }> => {
    let url = `/api/v1/lightner`;

    if (args.type) {
      url += `?type=${args.type}`;
    }

    return await callRequest('GET', url);
  };

  const query = useQuery<{ lightners: ILightner[] }>({
    queryKey: ['lightners', args],
    queryFn: fetchLightners,
  });

  return query;
};

export default useFetchLightner;
