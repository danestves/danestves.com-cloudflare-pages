// Dependencies
import { setConfig, buildImageUrl } from 'cloudinary-build-url';
import type { StorageType, TransformerOption } from '@cld-apis/types';

setConfig({
  cloudName: 'danestves',
});

type ImageBuilder = {
  (transformations?: TransformerOption): string;
  alt: string;
  id: string;
};
const createImages = <
  ImageType extends Record<string, { id: string; alt: string }>
>(
  images: ImageType
) => {
  const imageBuilders: Record<string, ImageBuilder> = {};
  for (const [name, { id, alt }] of Object.entries(images)) {
    imageBuilders[name] = getImageBuilder(id, alt);
  }
  return imageBuilders as { [Name in keyof ImageType]: ImageBuilder };
};

function getImageBlur(imageBuilder: ImageBuilder, width = 100) {
  const transformations: TransformerOption = {
    effect: {
      name: 'blur',
      value: '1000',
    },
  };

  return imageBuilder({
    ...transformations,
    format: 'auto',
    quality: 'auto',
    resize: {
      width,
    },
  });
}

function getImageBuilder(
  id: string,
  alt: string = '',
  type: StorageType = 'upload'
): ImageBuilder {
  function imageBuilder(transformations?: TransformerOption) {
    return buildImageUrl(id, {
      transformations,
      cloud: {
        storageType: type,
      },
    });
  }
  imageBuilder.alt = alt;
  imageBuilder.id = id;
  return imageBuilder;
}

function getImgProps(
  imageBuilder: ImageBuilder,
  {
    widths,
    sizes,
    transformations,
  }: {
    widths: Array<number>;
    sizes: Array<string>;
    transformations?: TransformerOption;
  }
) {
  const averageSize = Math.ceil(widths.reduce((a, s) => a + s) / widths.length);

  return {
    alt: imageBuilder.alt,
    src: imageBuilder({
      quality: 'auto',
      format: 'auto',
      ...transformations,
      resize: { width: averageSize, ...transformations?.resize },
    }),
    srcSet: widths
      .map((width) =>
        [
          imageBuilder({
            quality: 'auto',
            format: 'auto',
            ...transformations,
            resize: { width, ...transformations?.resize },
          }),
          `${width}w`,
        ].join(' ')
      )
      .join(', '),
    sizes: sizes.join(', '),
  };
}

function getFlagImage(code: string) {
  return {
    id: `flags/${code}`,
    alt: `${code} flag`,
  };
}

const images = createImages({
  US: getFlagImage('US'),
  heroMask: {
    id: 'hero-mask',
    alt: 'Daniel Esteves',
  },
  me: {
    id: 'danestves.com/me',
    alt: 'Daniel Esteves',
  },
  og: {
    id: 'danestves.com/og',
    alt: 'Daniel Esteves',
  },
  aboutOg: {
    id: 'danestves.com/about-og',
    alt: 'A little about me',
  },

  // Maria
  ogMaria: {
    id: 'danestves.com/maria/og',
    alt: 'Maria',
  },
  firstChat: {
    id: 'danestves.com/maria/first-chat',
    alt: 'First chat',
  },
  firstWhatsappChat: {
    id: 'danestves.com/maria/first-whatsapp-chat',
    alt: 'First whatsapp chat',
  },
  firstDate1: {
    id: 'danestves.com/maria/first-date-1',
    alt: 'First date',
  },
  firstDate2: {
    id: 'danestves.com/maria/first-date-2',
    alt: 'First date',
  },
  firstDate3: {
    id: 'danestves.com/maria/first-date-3',
    alt: 'First date',
  },
  secondDate1: {
    id: 'danestves.com/maria/second-date-1',
    alt: 'Second date',
  },
  secondDate2: {
    id: 'danestves.com/maria/second-date-2',
    alt: 'Second date',
  },
  secondDate3: {
    id: 'danestves.com/maria/second-date-3',
    alt: 'Second date',
  },
  secondDate4: {
    id: 'danestves.com/maria/second-date-4',
    alt: 'Second date',
  },
  secondDate5: {
    id: 'danestves.com/maria/second-date-5',
    alt: 'Second date',
  },
  thirdDate1: {
    id: 'danestves.com/maria/third-date-1',
    alt: 'Third date',
  },
  thirdDate2: {
    id: 'danestves.com/maria/third-date-2',
    alt: 'Third date',
  },
  thirdDate3: {
    id: 'danestves.com/maria/third-date-3',
    alt: 'Third date',
  },
  thirdDate4: {
    id: 'danestves.com/maria/third-date-4',
    alt: 'Third date',
  },
  thirdDate5: {
    id: 'danestves.com/maria/third-date-5',
    alt: 'Third date',
  },
  thirdDate6: {
    id: 'danestves.com/maria/third-date-6',
    alt: 'Third date',
  },
  fourthDate1: {
    id: 'danestves.com/maria/fourth-date-1',
    alt: 'Fourth date',
  },
  fourthDate2: {
    id: 'danestves.com/maria/fourth-date-2',
    alt: 'Fourth date',
  },
  fourthDate3: {
    id: 'danestves.com/maria/fourth-date-3',
    alt: 'Fourth date',
  },
  fourthDate4: {
    id: 'danestves.com/maria/fourth-date-4',
    alt: 'Fourth date',
  },
  fourthDate5: {
    id: 'danestves.com/maria/fourth-date-5',
    alt: 'Fourth date',
  },
  fourthDate6: {
    id: 'danestves.com/maria/fourth-date-6',
    alt: 'Fourth date',
  },
});
const es_flags = createImages({
  AR: getFlagImage('AR'),
  BO: getFlagImage('BO'),
  CL: getFlagImage('CL'),
  CO: getFlagImage('CO'),
  CR: getFlagImage('CR'),
  DO: getFlagImage('DO'),
  EC: getFlagImage('EC'),
  ES: getFlagImage('ES'),
  GT: getFlagImage('GT'),
  MX: getFlagImage('MX'),
  NI: getFlagImage('NI'),
  PA: getFlagImage('PA'),
  PE: getFlagImage('PE'),
  PR: getFlagImage('PR'),
  SV: getFlagImage('SV'),
  UY: getFlagImage('UY'),
  VE: getFlagImage('VE'),
});

export { es_flags, getImageBlur, getImageBuilder, getImgProps, images };
export type { ImageBuilder };
