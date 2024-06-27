import { useSection } from "deco/hooks/useSection.ts";
import { Head } from "$fresh/runtime.ts";

interface Props {
  page: number;
}

export default function Tabbed({
  page = 0,
}: Props) {
  const pages = [1, 2, 3, 4];

  return (
    <div hx-boost="true">
      <Head>
        <style>
          {`
@keyframes slide-in-from-left {
	from {
		translate: -100vw 0;
	}
}
@keyframes slide-in-from-right {
	from {
		translate: 100vw 0;
	}
}
@keyframes slide-out-to-left {
	to {
		translate: -100vw 0;
	}
}
@keyframes slide-out-to-right {
	to {
		translate: 100vw 0;
	}
}
`}
        </style>
      </Head>
      <div class="content" style="view-transition-name: content;">
        {pages[page]}
      </div>
      {pages.map((p) => {
        const pUrl = useSection<Props>({
          props: { page: p },
        });

        return (
          <a hx-get={pUrl} hx-swap="closest section transition:true">
            {p}
          </a>
        );
      })}
    </div>
  );
}
