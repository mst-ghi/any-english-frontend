'use client';

import { useMemo, useState } from 'react';
import { ImageStates, LightnerCard } from '@/components';
import { Carousel } from '@mantine/carousel';
import { useFetchLightner, useThemeStyle } from '@/hooks';
import { lightnersGroup } from '@/utils';
import { Center, Indicator, Loader, Tabs, Text } from '@mantine/core';

const MyLightner = ({ type = 'word' }: { type?: 'word' | 'phrase' }) => {
  const { isDesktop } = useThemeStyle();
  const [tab, setTab] = useState<string>('4');
  const { data, isFetching } = useFetchLightner({
    type,
  });

  const lightners = useMemo(() => {
    return data ? lightnersGroup(data?.lightners) : [];
  }, [data]);

  return (
    <Tabs radius="xl" value={tab} onChange={setTab} variant="outline">
      <Tabs.List grow>
        {lightners.map((el) => {
          return (
            <Tabs.Tab key={`level-tab-${el.level}`} value={el.level + ''}>
              <Indicator
                label={el.count}
                size={22}
                position="middle-end"
                color={el.color}
              >
                <Text fw={600} size="lg" miw={30}>
                  {el.level}
                </Text>
              </Indicator>
            </Tabs.Tab>
          );
        })}
      </Tabs.List>

      {isFetching && (
        <Center mih={200}>
          <Loader />
        </Center>
      )}

      {!isFetching &&
        data &&
        lightners.map((el) => {
          return (
            <Tabs.Panel key={`level-panel-${el.level}`} value={el.level + ''}>
              {el.values[0] && (
                <Carousel
                  loop
                  key={`carousel-${type}-${tab}`}
                  slideGap={{ base: 0 }}
                  align="center"
                  controlSize={52}
                  w={isDesktop ? undefined : '85vw'}
                  draggable={false}
                  styles={{
                    controls: {
                      bottom: -22,
                    },
                  }}
                >
                  {el.values.map((lightner, idx) => {
                    return (
                      <Carousel.Slide key={`lightner-${lightner.id}`}>
                        <LightnerCard lightner={lightner} idx={idx + 1} />
                      </Carousel.Slide>
                    );
                  })}
                </Carousel>
              )}

              {!el.values[0] && (
                <Center>
                  <ImageStates name="emptyBox" width={457} />
                </Center>
              )}
            </Tabs.Panel>
          );
        })}
    </Tabs>
  );
};

export default MyLightner;
