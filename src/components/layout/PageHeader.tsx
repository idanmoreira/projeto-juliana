
interface PageHeaderProps {
  badge?: string;
  title: string;
  description: string;
}

const PageHeader = ({ badge, title, description }: PageHeaderProps) => {
  return (
    <div className="relative gradient-bg star-field overflow-hidden py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {badge && (
            <div className="inline-block bg-purple-100/20 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium mb-2">
              {badge}
            </div>
          )}
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-astral-purple via-white to-astral-gold">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-[700px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
