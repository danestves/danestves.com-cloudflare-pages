// Dependencies
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'remix';

type ViewsProps = {
  slug: string;
  views: number;
};

const Views = ({ slug, views }: ViewsProps): JSX.Element => {
  let { i18n, t } = useTranslation('common');
  let persistViews = useFetcher();

  let persistViewsRef = React.useRef(persistViews);
  React.useEffect(() => {
    persistViewsRef.current = persistViews;
  }, [persistViews]);

  React.useEffect(() => {
    persistViewsRef.current.submit(
      {},
      {
        action: `action/posts/${slug}/set-views`,
        method: 'post',
      }
    );
  }, [slug]);

  return (
    <span className="rounded-full bg-secondary px-3 py-2 text-xs font-bold text-black">
      {views ? views.toLocaleString(i18n.language) : '---'}{' '}
      {views === 1
        ? t('components.views.singular')
        : t('components.views.plural')}
    </span>
  );
};

export { Views };
export type { ViewsProps };
