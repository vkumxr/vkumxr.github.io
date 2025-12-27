import { useState } from 'react';
import { Linkedin, Twitter, Link2, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The post link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the URL manually from your browser.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-background/50">Share:</span>
      <button
        onClick={shareOnLinkedIn}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-background/10 border border-background/20 text-background/60 hover:border-background/40 hover:text-background hover:bg-background/20 transition-all duration-200"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={16} />
      </button>
      <button
        onClick={shareOnTwitter}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-background/10 border border-background/20 text-background/60 hover:border-background/40 hover:text-background hover:bg-background/20 transition-all duration-200"
        aria-label="Share on X (Twitter)"
      >
        <Twitter size={16} />
      </button>
      <button
        onClick={copyLink}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-background/10 border border-background/20 text-background/60 hover:border-background/40 hover:text-background hover:bg-background/20 transition-all duration-200"
        aria-label="Copy link"
      >
        {copied ? <Check size={16} /> : <Link2 size={16} />}
      </button>
    </div>
  );
};

export default ShareButtons;
