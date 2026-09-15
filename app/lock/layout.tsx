import type { ReactNode } from "react";

/**
 * Lock-page shell: warm design base on html/body so top/bottom overscroll
 * matches the page instead of the site-wide black background.
 */
export default function LockLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html, body {
              background-color: #3a1810 !important;
            }
          `,
        }}
      />
      {children}
    </>
  );
}
