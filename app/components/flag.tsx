// Dependencies
import { useTranslation } from 'react-i18next';

// Internals
import {
  es_flags,
  getImageBlur,
  getImageBuilder,
  getImgProps,
  images,
} from '~/images';
import { BlurrableImage } from './blurrable-image';

type FlagProps = {
  countryCode?: string;
  locale?: string;
};

const Flag = ({ countryCode = 'US', ...props }: FlagProps): JSX.Element => {
  let { i18n } = useTranslation('common');
  let locale = props.locale || i18n.language;

  let imageProps = images.US;
  if (locale === 'es') {
    // @ts-ignore TS doesnt like it 😞
    if (es_flags[countryCode]) {
      // @ts-ignore TS doesnt like it 😞
      imageProps = es_flags[countryCode];
    } else {
      imageProps = es_flags.ES;
    }
  }

  return (
    <BlurrableImage
      blurDataUrl={getImageBlur(
        getImageBuilder(imageProps.id, imageProps.alt),
        10
      )}
      className="aspect-w-1 aspect-h-1 flex"
      img={
        <img
          {...getImgProps(getImageBuilder(imageProps.id, imageProps.alt), {
            widths: [24],
            sizes: ['24px'],
          })}
          height={24}
          width={24}
        />
      }
    />
  );
};

export { Flag };
