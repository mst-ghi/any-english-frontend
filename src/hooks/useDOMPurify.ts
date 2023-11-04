import * as DOMPurify from 'dompurify';

const useDOMPurify = ({ value }: { value?: string } = { value: '' }) => {
  return {
    cleanedHtml: value ? DOMPurify.sanitize(value) : '<div></div>',
  };
};

export default useDOMPurify;
