import { Center, Image, ImageProps, Text, TextProps } from '@mantine/core';

const Images = {
  accessDenied: '/images/access-denied.png',
  announcement: '/images/announcement.png',
  badConnection: '/images/bad-connection.png',
  comeBackLater: '/images/come-back-later.png',
  delayed: '/images/delayed.png',
  deleted: '/images/deleted.png',
  disconnected: '/images/disconnected.png',
  downloadingData: '/images/downloading-data.png',
  emptyBox1: '/images/empty-box-1.png',
  emptyBox: '/images/empty-box.png',
  emptyCart1: '/images/empty-cart-1.png',
  emptyCart: '/images/empty-cart.png',
  errorInCalendar: '/images/error-in-calendar.png',
  location: '/images/location.png',
  messageSent: '/images/message-sent.png',
  noMessages: '/images/no-messages.png',
  noRecords: '/images/no-records.png',
  onABreak: '/images/on-a-break.png',
  oops: '/images/oops.png',
  pageLost1: '/images/page-lost-1.png',
  pageLost: '/images/page-lost.png',
  pageNotFound: '/images/page-not-found.png',
  searchingData: '/images/searching-data.png',
  securityError: '/images/security-error.png',
  stop: '/images/stop.png',
  surprise: '/images/surprise.png',
  unsubscribe: '/images/unsubscribe.png',
  welcomeSign: '/images/welcome-sign.png',
};

export const ImageStatesNameOptions = [
  { value: 'accessDenied', label: 'Access Denied' },
  { value: 'announcement', label: 'Announcement' },
  { value: 'badConnection', label: 'Bad Connection' },
  { value: 'comeBackLater', label: 'Come Back Later' },
  { value: 'delayed', label: 'Delayed' },
  { value: 'deleted', label: 'Deleted' },
  { value: 'disconnected', label: 'Disconnected' },
  { value: 'downloadingData', label: 'Downloading Data' },
  { value: 'emptyBox1', label: 'Empty Box 1' },
  { value: 'emptyBox', label: 'Empty Box' },
  { value: 'emptyCart1', label: 'Empty Cart 1' },
  { value: 'emptyCart', label: 'Empty Cart' },
  { value: 'errorInCalendar', label: 'Error In Calendar' },
  { value: 'location', label: 'Location' },
  { value: 'messageSent', label: 'Message Sent' },
  { value: 'noMessages', label: 'No Messages' },
  { value: 'noRecords', label: 'No Records' },
  { value: 'onABreak', label: 'On A Break' },
  { value: 'oops', label: 'Oops' },
  { value: 'pageLost1', label: 'Page Lost 1' },
  { value: 'pageLost', label: 'Page Lost' },
  { value: 'pageNotFound', label: 'Page Not Found' },
  { value: 'searchingData', label: 'Searching Data' },
  { value: 'securityError', label: 'Security Error' },
  { value: 'stop', label: 'Stop' },
  { value: 'surprise', label: 'Surprise' },
  { value: 'unsubscribe', label: 'Unsubscribe' },
  { value: 'welcomeSign', label: 'Welcome Sign In' },
];

export interface ImageStatesProps extends Omit<ImageProps, 'src' | 'alt'> {
  enable?: boolean;
  name?: keyof typeof Images;
  message?: string;
  messageProps?: TextProps;
  width?: number;
  height?: number;
}

const ImageStates = ({
  enable = true,
  name = 'emptyBox1',
  message,
  width = 560,
  height = 560,
  messageProps,
  ...props
}: ImageStatesProps) => {
  if (!enable) {
    return null;
  }

  return (
    <Center style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Image src={Images[name]} alt={name} w={width} h={height} {...props} />
      {message && (
        <Text size="xl" {...messageProps}>
          {message}
        </Text>
      )}
    </Center>
  );
};

export default ImageStates;
