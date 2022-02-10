import { DataFunctionArgs } from '@remix-run/server-runtime';

export async function loader({ request }: DataFunctionArgs) {
  const url = new URL(request.url);

  const proxyUrl = url.searchParams?.get('url');

  console.log(url.searchParams, proxyUrl);

  if (!proxyUrl) {
    return null;
  }

  const response = await fetch(proxyUrl);

  return new Response(response.body, {
    headers: response.headers,
    status: response.status,
  });
}
