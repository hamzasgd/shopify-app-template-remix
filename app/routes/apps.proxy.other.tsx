import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { AppProxy } from "@shopify/shopify-app-remix/react";
import { authenticate } from "~/shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.public.appProxy(request);

  return json({ appUrl: process.env.SHOPIFY_APP_URL! });
};

export default function OtherPage() {
  const { appUrl } = useLoaderData<typeof loader>();

  return (
    <AppProxy appUrl={appUrl}>
      <div>Hello world</div>
      <AppProxy.Link to="/apps/proxy">Back to the main page</AppProxy.Link>
    </AppProxy>
  );
}
