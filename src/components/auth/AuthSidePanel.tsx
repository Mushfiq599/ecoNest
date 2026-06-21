import { Leaf, Recycle, Sparkles, TreePine } from "lucide-react";

const floatingIcons = [
  { Icon: Leaf, className: "left-[15%] top-[20%]", delay: "0s", size: 48 },
  { Icon: Recycle, className: "left-[70%] top-[15%]", delay: "1.5s", size: 32 },
  { Icon: Sparkles, className: "left-[20%] top-[70%]", delay: "0.8s", size: 32 },
  { Icon: TreePine, className: "left-[75%] top-[65%]", delay: "2.2s", size: 48 },
];

export function AuthSidePanel({ title, description }: { title: string; description: string }) {
  return (
    <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-accent to-[#0D2617] lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
      {floatingIcons.map(({ Icon, className, delay, size }, i) => (
        <div key={i} className={`absolute animate-float text-white/20 ${className}`} style={{ animationDelay: delay }}>
          <Icon size={size} />
        </div>
      ))}

      <div className="relative z-10 max-w-sm animate-fade-in text-center text-white">
        <Leaf className="mx-auto" size={40} />
        <h2 className="mt-6 text-3xl font-bold">{title}</h2>
        <p className="mt-3 text-white/80">{description}</p>
      </div>
    </div>
  );
}