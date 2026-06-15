type SectionHeaderProps = {
  index: string;
  eyebrow: string;
  title: string;
  titleEm?: string;
  align?: "left" | "center";
  aside?: React.ReactNode;
};

export const SectionHeader = ({
  index,
  eyebrow,
  title,
  titleEm,
  align = "left",
  aside,
}: SectionHeaderProps) => {
  return (
    <header
      className={`section-header section-header--${align}${aside ? " section-header--with-aside" : ""}`}
    >
      <div className="section-header-main">
        <span className="section-index" aria-hidden="true">
          {index}
        </span>
        <div className="section-header-text">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 className="section-title">
            {title}
            {titleEm ? (
              <>
                {" "}
                <em>{titleEm}</em>
              </>
            ) : null}
          </h2>
        </div>
      </div>
      {aside ? <div className="section-header-aside">{aside}</div> : null}
    </header>
  );
};
