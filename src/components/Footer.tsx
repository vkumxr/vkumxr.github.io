const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Vishwa Kumar. Built with React.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
