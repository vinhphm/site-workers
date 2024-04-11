import { ImageResponse } from 'workers-og';

const handler: ExportedHandler = {
	async fetch(request, env, ctx) {
		const params = new URLSearchParams(new URL(request.url).search);
		const title = params.get('title') || 'Lorem ipsum';

    // @ts-ignore
		const geist500 = await env.WORKER_OG.get('geist500', 'arrayBuffer');
    // @ts-ignore
		const ogIconBase64 = await env.WORKER_OG.get('ogIconBase64', 'text');

		const html = `
      <div style="
        background: #111010;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;"
      >
        <div style="
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          height: 100%;"
        >
          <div style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            width: 100%;
            padding: 5rem;"
          >
            
            <img
              height="92"
              width="92"
              src="data:image/png;base64,${ogIconBase64}"
            />
            <h1 style="
              font-size: 60px;
              letter-spacing: -.05em;
              color: white;
              text-align: left;
              padding: 0 1.5rem;"
            >
              ${title}
            </h1>
          </div>
        </div>
      </div>
    `;

		return new ImageResponse(html, {
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Geist',
					data: geist500,
					style: 'normal',
				},
			],
		});
	},
};

export default handler;
