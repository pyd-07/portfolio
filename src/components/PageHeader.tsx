interface Props {
  kicker: string;
  title: string;
  intro?: string;
}

const PageHeader = ({ kicker, title, intro }: Props) => (
  <section className="container pt-20 pb-8 md:pt-28 md:pb-10">
    <p className="kicker mb-3">// {kicker}</p>
    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance leading-[1.08]">
      {title}
    </h1>
    {intro && (
      <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
        {intro}
      </p>
    )}
  </section>
);

export default PageHeader;
