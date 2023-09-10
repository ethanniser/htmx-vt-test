import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { type PropsWithChildren } from "@kitajs/html";

const BaseHtml = ({ children }: PropsWithChildren) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>THE BETH STACK</title>
  <script src="https://unpkg.com/htmx.org@1.9.3"></script>
  <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
  <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
  <script src="https://unpkg.com/htmx.org/dist/ext/preload.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css">
  <script>
    htmx.config.globalViewTransitions = true;
  </script>
  <script>
    window.__unocss = {
      rules: [
        [/^transition-name\\[([^\\]]+)\\]$/, ([, name]) => ({ 'view-transition-name': name })]
      ]
    };
  </script>
  <style>
    [un-cloak] {
      display: none;
    }
  </style>
</head>

${children}
`;

const BasePage = ({
  pageTitle,
  imageColor,
  imagePosition,
}: {
  pageTitle: string;
  imageColor: string;
  imagePosition: "left" | "center" | "right";
}) => {
  const imageclass = {
    left: "mr-72",
    right: "ml-72",
    center: "",
  };

  const imagePositionClass = imageclass[imagePosition];

  return (
    <body
      class="flex w-full h-screen justify-center items-center flex-col"
      hx-boost="true"
      un-cloak
      hx-ext="preload"
    >
      <h1 class="text-3xl test">{pageTitle}</h1>
      <div
        class={`w-20 h-20 mt-10 ${imagePositionClass} bg-${imageColor}`}
        style={"view-transition-name: box"}
      ></div>
      <div class="mt-10 m-4">
        <a
          href="/foo"
          class="mr-10 text-blue-500 hover:underline text-xl"
          preload="mouseover"
        >
          Go to Foo
        </a>
        <a
          href="/bar"
          class="mr-10 text-blue-500 hover:underline text-xl"
          preload="mouseover"
        >
          Go to Bar
        </a>
        <a
          href="/baz"
          class="text-blue-500 hover:underline text-xl"
          preload="mouseover"
        >
          Go to Baz
        </a>
      </div>
    </body>
  );
};

const app = new Elysia()
  .use(html())
  .get("/", () => (
    <BaseHtml>
      <body class="flex w-full h-screen justify-center items-center">
        <a href="/foo">foo</a>
      </body>
    </BaseHtml>
  ))
  .get("/foo", () => (
    <BaseHtml>
      <BasePage
        pageTitle="This is the Foo Page"
        imageColor="red-500"
        imagePosition="center"
      />
    </BaseHtml>
  ))
  .get("/bar", () => (
    <BaseHtml>
      <BasePage
        pageTitle="This is the Bar Page"
        imageColor="green-500"
        imagePosition="right"
      />
    </BaseHtml>
  ))
  .get("/baz", () => (
    <BaseHtml>
      <BasePage
        pageTitle="This is the Baz Page"
        imageColor="yellow-500"
        imagePosition="left"
      />
    </BaseHtml>
  ))
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
