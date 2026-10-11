import type { ReactNode } from "react";

export default function Page({
  title,
  lead,
  image,
  children,
}: {
  title: string;
  lead?: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <main className="page container">
      {image ? (
        <div className="page-hero">
          <div>
            <h1>{title}</h1>
            {lead && <p className="lead">{lead}</p>}
          </div>
          <img src={image} alt={title} className="page-hero-img" loading="lazy" />
        </div>
      ) : (
        <>
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
        </>
      )}
      {children}
    </main>
  );
}
