// Dependencies
import * as React from 'react';

const Script: React.FC = () => {
  return (
    <>
      <script
        type="text/javascript"
        src="//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js"
        data-dojo-config="usePlainJson: true, isDebug: false"
      ></script>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            window.dojoRequire(["mojo/signup-forms/Loader"], function(L) {
              L.start({
                baseUrl: "mc.us19.list-manage.com",
                uuid: "b728e5f2d5135fefe65d627c9",
                lid: "8303aabf59",
                uniqueMethods: true
              });
            });`,
        }}
      />
    </>
  );
};

export default Script;
