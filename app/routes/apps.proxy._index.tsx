import { AppProxy } from "@shopify/shopify-app-remix/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, useActionData, useLoaderData } from "@remix-run/react";
import {
  AppProvider,
  Button,
  Card,
  FormLayout,
  Layout,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";

import { authenticate } from "~/shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.public.appProxy(request);

  return json({ appUrl: process.env.SHOPIFY_APP_URL! });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await authenticate.public.appProxy(request);

  return json({
    message: "Success",
    formData: Object.fromEntries((await request.formData()).entries()),
  });
};

export default function AppProxyPage() {
  const { appUrl } = useLoaderData<typeof loader>();
  const data = useActionData<typeof action>();

  console.log(data);

  return (
    <AppProvider i18n={translations}>
      <AppProxy appUrl={appUrl}>
        <Page>
          <Layout>
            <Layout.Section>
              <Card>
                <Text as={"h2"} variant="headingLg">
                  Hello world
                </Text>

                <FormLayout>
                  <AppProxy.Form method="post" action="/apps/proxy">
                    <TextField autoComplete="" label="Derp" name="derp" />

                    <Button submit>Submit</Button>
                  </AppProxy.Form>

                  <AppProxy.Link to="/apps/proxy/other">
                    Other page
                  </AppProxy.Link>
                </FormLayout>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </AppProxy>
    </AppProvider>
  );
}
