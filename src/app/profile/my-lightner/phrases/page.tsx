'use client';

import { useMemo, useState } from 'react';
import { ImageStates, LightnerCard, Page } from '@/components';
import { Carousel } from '@mantine/carousel';
import { useFetchLightner } from '@/hooks';
import { lightnersGroup } from '@/utils';
import {
  Card,
  Center,
  Flex,
  Indicator,
  Loader,
  Tabs,
  Text,
  Title,
} from '@mantine/core';

const PhrasesLightnerPage = () => {
  const [tab, setTab] = useState<string>('4');
  const { data, isFetching } = useFetchLightner({
    type: 'phrase',
  });

  const lightners = useMemo(() => {
    return data ? lightnersGroup(data?.lightners) : [];
  }, [data]);

  return (
    <Page title="My Phrases Lightner">
      <Card>
        <Title mb="lg" order={2}>
          My Phrases Lightner
        </Title>

        <Tabs radius="md" value={tab} onChange={setTab} variant="outline">
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
                <Tabs.Panel
                  key={`level-panel-${el.level}`}
                  value={el.level + ''}
                >
                  {el.values[0] && (
                    <Carousel
                      slideSize={{ base: '100%' }}
                      slideGap={{ base: 0 }}
                      align="start"
                    >
                      {el.values.map((lightner) => {
                        return (
                          <Carousel.Slide
                            m="lg"
                            key={`lightner-${lightner.id}`}
                          >
                            <LightnerCard lightner={lightner} />
                          </Carousel.Slide>
                        );
                      })}
                    </Carousel>
                  )}

                  {!el.values[0] && (
                    <Center>
                      <ImageStates name="emptyBox" width={240} />
                    </Center>
                  )}
                </Tabs.Panel>
              );
            })}
        </Tabs>
      </Card>
    </Page>
  );
};

export default PhrasesLightnerPage;
